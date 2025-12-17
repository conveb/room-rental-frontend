import { useEffect, useState, useMemo } from "react";
import { getAllPropertiesAPI } from "../../services/allAPI";

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [filters, setFilters] = useState({
    city: "",
    date: "",
    type: "",
    budget: "",
    rooms: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH ALL PROPERTIES (DEFAULT LIST)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllPropertiesAPI();
        setProperties(res.data);
        setFilteredProperties(res.data); // 👈 list all by default
      } catch (err) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // FILTER CHANGE
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // APPLY FILTERS
  const applyFilters = () => {
    let data = [...properties];

    if (filters.city) {
      data = data.filter((p) =>
        p.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.date) {
      data = data.filter(
        (p) => p.available_from && p.available_from >= filters.date
      );
    }

    if (filters.type) {
      data = data.filter(
        (p) => p.property_type === filters.type
      );
    }

    if (filters.budget) {
      data = data.filter(
        (p) => Number(p.rent_per_month) <= Number(filters.budget)
      );
    }

    if (filters.rooms) {
      data = data.filter(
        (p) => p.rooms === Number(filters.rooms)
      );
    }

    setFilteredProperties(data);
  };

  return {
    filters,
    loading,
    error,
    filteredProperties,
    handleFilterChange,
    applyFilters,
  };
};
