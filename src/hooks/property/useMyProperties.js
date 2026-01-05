import { useEffect, useState } from "react";
import {
  viewMyPropertyApi,
  deletePropertyApi,
  updatePropertyApi,
} from "../../services/allAPI";

export default function useMyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      const res = await viewMyPropertyApi();
    //   if(res.data) return console.log('success')
      setProperties(res.data || []);
      setError(null);
    } catch {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      setActionLoading(true);
      await deletePropertyApi(propertyId);

      // remove locally (no refetch needed)
      setProperties((prev) =>
        prev.filter((p) => p.id !== propertyId)
      );
    } catch {
      alert("Failed to delete property");
    } finally {
      setActionLoading(false);
    }
  };

  const updateProperty = async (propertyId, data) => {
    try {
      setActionLoading(true);
      const res = await updatePropertyApi(propertyId, data);

      setProperties((prev) =>
        prev.map((p) =>
          p.id === propertyId ? res.data : p
        )
      );
    } catch {
      alert("Failed to update property");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    actionLoading,
    deleteProperty,
    updateProperty,
    refetch: fetchMyProperties,
  };
}
