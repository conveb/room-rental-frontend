import { useEffect, useState } from "react";
import { listAmenitiesApi } from "../services/allAPI";

export const useAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAmenities = async () => {
    try {
      setLoading(true);
      const res = await listAmenitiesApi();
      setAmenities(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load amenities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  return {
    amenities,
    loading,
    error,
    refetch: fetchAmenities,
  };
};
