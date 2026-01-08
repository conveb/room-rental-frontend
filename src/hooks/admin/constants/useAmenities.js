import { useEffect, useState } from "react";
import { listAmenitiesApi, createAmenities, deleteAmenityApi } from "../../../services/allAPI";

export const useAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

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

  const addAmenity = async (name) => {
    if (!name?.trim()) {
      throw new Error("Amenity name is required");
    }

    try {
      setAdding(true);
      await createAmenities({ name });
      await fetchAmenities(); // refresh list
    } catch (err) {
      throw err;
    } finally {
      setAdding(false);
    }
  };

  const deleteAmenity = async (id) => {
    await deleteAmenityApi(id);
    setAmenities((prev) => prev.filter((a) => a.id !== id));
  };
  useEffect(() => {
    fetchAmenities();
  }, []);

  return {
    amenities,
    loading,
    error,
    adding,
    addAmenity,
    deleteAmenity,
    refetch: fetchAmenities,
  };
};
