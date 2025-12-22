import { useEffect, useState } from "react";
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

  // FETCH PROPERTIES
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllPropertiesAPI();

        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // HANDLE INPUT CHANGE
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
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
      const selectedDate = new Date(filters.date);
      data = data.filter(
        (p) => new Date(p.available_from) >= selectedDate
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
    loading,
    error,
    filteredProperties,
    handleFilterChange,
    applyFilters,
  };
};
