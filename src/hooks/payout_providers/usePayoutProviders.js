import { useState, useEffect } from "react";
import { createPayoutProviderApi, deletePayoutProviderApi, getPayoutProvidersApi, updatePayoutProviderApi } from "../../services/allAPI";
 // Adjust path as needed

export const usePayoutProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await getPayoutProvidersApi();
      if (response.status >= 200 && response.status < 300) {
        setProviders(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch providers", err);
    } finally {
      setLoading(false);
    }
  };

  const addProvider = async (data) => {
    try {
      const response = await createPayoutProviderApi(data);
      if (response.status >= 200 && response.status < 300) {
        setProviders((prev) => [...prev, response.data]);
        return true;
      }
    } catch (err) {
      alert("Error adding provider");
      return false;
    }
  };

  const updateProvider = async (id, data) => {
  try {
    const response = await updatePayoutProviderApi(id, data);
    if (response.status >= 200 && response.status < 300) {
      setProviders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...response.data } : p))
      );
      return true;
    }
  } catch (err) {
    console.error("Update failed", err);
    return false;
  }
};

  const removeProvider = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deletePayoutProviderApi(id);
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return { providers, addProvider,updateProvider, removeProvider, loading, refresh: fetchProviders };
};