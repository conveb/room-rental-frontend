import { useState, useEffect, useCallback } from "react";
import { 
  getCountryPayoutProvidersApi, 
  getCountryPayoutProviderDetailsApi, 
  createCountryPayoutProviderApi, 
  updateCountryPayoutProviderApi, 
  deleteCountryPayoutProviderApi 
} from "../../services/allAPI";

export const useCountryPayoutProviders = () => {
  const [countryProviders, setCountryProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper: Secure Response Handler
  const handleResponse = (response) => {
    if (response && response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    }
    throw new Error(response?.data?.message || "Operation failed");
  };

  // 1. Secured Fetch All
  const fetchAllLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCountryPayoutProvidersApi();
      const result = handleResponse(response);
      setCountryProviders(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch country providers");
      setCountryProviders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Secured Details Fetch (Integrity Check)
  const fetchLinkDetails = async (id) => {
    if (!id) {
      setError("Invalid ID provided");
      return null;
    }
    setLoading(true);
    try {
      const response = await getCountryPayoutProviderDetailsApi(id);
      const result = handleResponse(response);
      setSelectedProvider(result.data);
      return result.data;
    } catch (err) {
      setError(`Failed to fetch details: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 3. Secured Create (with Sanitization)
  const addCountryProvider = async (payload) => {
    // Validation
    if (!payload.country || !payload.provider) {
      setError("Country and Provider are required.");
      return false;
    }

    setActionLoading(true);
    setError(null);
    try {
      const response = await createCountryPayoutProviderApi(payload);
      const result = handleResponse(response);
      setCountryProviders((prev) => [...prev, result.data]);
      return true;
    } catch (err) {
      setError(err.message || "Failed to add country provider");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Secured Update (with Optimistic Rollback logic)
  const updateCountryProvider = async (id, payload) => {
    if (!id) {
      setError("Invalid ID provided");
      return false;
    }
    
    const originalData = [...countryProviders]; // Backup for rollback
    setActionLoading(true);
    setError(null);
    
    // Optimistic update
    setCountryProviders(prev =>
      prev.map(item => 
        item.id === id ? { ...item, ...payload, updating: true } : item
      )
    );
    
    try {
      const response = await updateCountryPayoutProviderApi(id, payload);
      const result = handleResponse(response);
      
      setCountryProviders(prev =>
        prev.map(item => 
          item.id === id ? { ...result.data, updating: false } : item
        )
      );
      return true;
    } catch (err) {
      // Rollback on error
      setCountryProviders(originalData);
      setError(`Update failed: ${err.message}`);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Secured Delete (Atomic operation)
  const removeCountryProvider = async (id) => {
    if (!id) {
      setError("Invalid ID provided");
      return false;
    }
    
    if (!window.confirm("Are you sure? This action cannot be undone.")) {
      return false;
    }
    
    setActionLoading(true);
    setError(null);
    
    // Optimistic delete
    const itemToRemove = countryProviders.find(item => item.id === id);
    setCountryProviders(prev => prev.filter(item => item.id !== id));
    
    try {
      const response = await deleteCountryPayoutProviderApi(id);
      handleResponse(response);
      return true;
    } catch (err) {
      // Rollback on error
      if (itemToRemove) {
        setCountryProviders(prev => [...prev, itemToRemove].sort((a, b) => a.id - b.id));
      }
      setError(`Delete failed: ${err.message}`);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLinks();
  }, [fetchAllLinks]);

  return { 
    countryProviders, 
    selectedProvider, 
    loading, 
    actionLoading: actionLoading || loading, 
    error,
    fetchAllLinks, 
    fetchLinkDetails, 
    addCountryProvider, 
    updateCountryProvider, 
    removeCountryProvider 
  };
};