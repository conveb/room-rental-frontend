import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAllPropertiesAPI } from "../../services/allAPI";

const initialFilters = {
  city: "",
  date: "",
  type: "",
  budget: "",
  rooms: "",
  maxPeople: "",       // max_people on property
  minStay: "",         // minimum_stay_months on property
  furnished: false,
  is_caf_eligible: false,
  is_domicile_allowed: false,
  contract: false,
};
export const useProperties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);


  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. THE CORE FILTER LOGIC — unchanged
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
      data = data.filter((p) =>
        roomCount === 3 ? p.rooms >= 3 : p.rooms === roomCount
      );
    }

    if (filters.maxPeople) {
      const n = parseInt(filters.maxPeople);
      data = data.filter((p) =>
        filters.maxPeople === "4" ? p.max_people >= 4 : p.max_people === n
      );
    }

    if (filters.minStay) {
      data = data.filter((p) =>
        Number(p.minimum_stay_months) <= Number(filters.minStay)
      );
    }

    if (filters.furnished) {
      data = data.filter((p) => p.furnished === true);
    }

    if (filters.is_caf_eligible) {
      data = data.filter((p) => p.is_caf_eligible === true);
    }

    if (filters.is_domicile_allowed) {
      data = data.filter((p) => p.is_domicile_allowed === true);
    }

    if (filters.contract) {
      data = data.filter((p) => p.contract === true);
    }

    setFilteredProperties(data);
  }, [filters, properties]);

  // 2. FETCH DATA ON MOUNT — now reads all URL params
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllPropertiesAPI();
        setProperties(res.data);

        const params = new URLSearchParams(location.search);
        const cityParam = params.get("city");
        const budgetParam = params.get("budget");
        const dateParam = params.get("date");
        const typeParam = params.get("type");
        const roomsParam = params.get("rooms");
        const maxPeopleParam = params.get("maxPeople");
        const minStayParam = params.get("minStay");
        const furnishedParam = params.get("furnished");

        const hasParams = cityParam || budgetParam || dateParam || typeParam || roomsParam
          || maxPeopleParam || minStayParam || furnishedParam;

        if (hasParams) {
          // Merge only the params that exist — don't overwrite with nulls
          setFilters((prev) => ({
            ...prev,
            ...(maxPeopleParam && { maxPeople: maxPeopleParam }),
            ...(minStayParam && { minStay: minStayParam }),
            ...(furnishedParam && { furnished: furnishedParam === "true" }),
            ...(cityParam && { city: cityParam }),
            ...(budgetParam && { budget: budgetParam }),
            ...(dateParam && { date: dateParam }),
            ...(typeParam && { type: typeParam }),
            ...(roomsParam && { rooms: roomsParam }),
          }));
          // Don't call setFilteredProperties here —
          // the debounce useEffect below will fire once filters state updates
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

  // 3. AUTO-APPLY FILTERS (Debounced) — unchanged
  useEffect(() => {
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
    applyFilters,
    resetFilters,
  };
};