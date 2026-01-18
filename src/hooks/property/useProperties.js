import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAllPropertiesAPI } from "../../services/allAPI";

export const useProperties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  const initialFilters = {
    city: "",
    date: "",
    type: "",
    budget: "",
    rooms: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. THE CORE FILTER LOGIC
  const applyFilters = useCallback(() => {
    let data = [...properties];

    if (filters.city) {
      data = data.filter((p) =>
        p.city?.toLowerCase().includes(filters.city.toLowerCase()) ||
        p.title?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.date) {
      const selectedDate = new Date(filters.date);
      data = data.filter((p) => new Date(p.available_from) >= selectedDate);
    }

    if (filters.type) {
      data = data.filter((p) => p.property_type === filters.type);
    }

    if (filters.budget) {
      data = data.filter((p) => Number(p.rent_per_month) <= Number(filters.budget));
    }

    if (filters.rooms) {
      const roomCount = parseInt(filters.rooms);
      // Handles strict equality or "4+" logic
      data = data.filter((p) => 
        filters.rooms.includes("+") ? p.rooms >= roomCount : p.rooms === roomCount
      );
    }

    setFilteredProperties(data);
  }, [filters, properties]);

  // 2. FETCH DATA ON MOUNT
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllPropertiesAPI();
        setProperties(res.data);
        
        // Handle initial URL params (e.g., ?city=Paris)
        const params = new URLSearchParams(location.search);
        const cityParam = params.get("city");
        if (cityParam) {
          setFilters(prev => ({ ...prev, city: cityParam }));
        } else {
          setFilteredProperties(res.data);
        }
      } catch (err) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [location.search]);

  // 3. AUTO-APPLY FILTERS (Debounced for Typing)
  useEffect(() => {
    // Wait 300ms after last keystroke before filtering
    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  return {
    loading,
    error,
    filters,
    filteredProperties,
    handleFilterChange,
    applyFilters, // Can still be called manually if needed
    resetFilters,
  };
};