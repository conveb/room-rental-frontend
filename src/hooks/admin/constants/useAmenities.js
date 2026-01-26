import { useEffect, useState } from "react";
import { listAmenitiesApi, createAmenities, createAmenitiesByRoomOwnerApi, deleteAmenityApi, DeleteAmenitiesByRoomOwnerApi } from "../../../services/allAPI";

export const useAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [linking, setLinking] = useState(false);

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

  // New function to link amenities to a specific property
  const linkAmenityToProperty = async (propertyId, amenityIds) => {
  setLinking(true);
  try {
    const promises = amenityIds.map(uuid => 
      createAmenitiesByRoomOwnerApi(propertyId, { amenity: uuid })
    );
    
    const responses = await Promise.all(promises);
    
    // Check where your data lives. 
    // If commonAPI returns the whole axios response, it's res.data
    return responses.map(res => res.data); 
  } catch (err) {
    console.error("API Error Details:", err.response?.data);
    throw err;
  } finally {
    setLinking(false);
  }
};

const unlinkAmenity = async (propertyId, propAmenityId) => {
    try {
      await DeleteAmenitiesByRoomOwnerApi(propertyId, propAmenityId);
      return true;
    } catch (err) {
      console.error("Unlink Error:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

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
    linking,
    linkAmenityToProperty,
    deleteAmenity,
    unlinkAmenity,
    refetch: fetchAmenities,
  };
};
