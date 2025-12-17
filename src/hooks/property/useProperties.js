import { useEffect, useState } from "react";
import { getAllPropertiesAPI } from "../../services/allAPI";

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    city: "",
    date: "",
    type: "",
    budget: "",
    rooms: "",
  });

  // 🔥 FETCH ALL PROPERTIES ON PAGE LOAD
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllPropertiesAPI();

        // IMPORTANT: set both
        setProperties(res.data);
        setFilteredProperties(res.data); // 👈 default listing
      } catch {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // HANDLE FILTER INPUT
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // APPLY FILTERS ONLY WHEN SEARCH CLICKED
  const applyFilters = () => {
    let data = [...properties];

    if (filters.city) {
      data = data.filter((r) =>
        r.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.date) {
      data = data.filter((r) => r.availableFrom >= filters.date);
    }

    if (filters.type) {
      data = data.filter((r) => r.type === filters.type);
    }

    if (filters.budget) {
      data = data.filter((r) => r.price <= Number(filters.budget));
    }

    if (filters.rooms) {
      data = data.filter((r) => r.rooms === Number(filters.rooms));
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
