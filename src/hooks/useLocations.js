import { useEffect, useState } from "react";
import { addLocationsApi, deleteLocationsApi, listAllLocationsApi } from "../services/allAPI";

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await listAllLocationsApi();
      setLocations(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

    const addLocation = async (location_name) => {
    if (!location_name?.trim()) throw new Error("Location name is required");

    try {
      setAdding(true);
      await addLocationsApi({ location_name });
      await fetchLocations(); // refresh after adding
    } catch (err) {
      throw err;
    } finally {
      setAdding(false);
    }
  };

  const deleteLocation = async (id) => {
    await deleteLocationsApi(id); 
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locations,
    loading,
    error,
    adding,
    addLocation,
    deleteLocation,
    refetch: fetchLocations,
  };
};
