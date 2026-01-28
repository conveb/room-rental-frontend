import { useState, useEffect } from 'react';
import { addPayoutAccountApi, getPayoutAccountApi } from '../../services/allAPI';

export const usePayoutAccount = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAccount = async () => {
    try {
      setLoading(true);
      const response = await getPayoutAccountApi();
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      setAccount(data || null);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (identifier) => {
    const payload = {
      account_identifier: identifier,
      is_primary: true 
    };
    const response = await addPayoutAccountApi(payload);
    setAccount(response.data);
    return response.data;
  };

  useEffect(() => { fetchAccount(); }, []);

  return { account, loading, addAccount, refresh: fetchAccount };
};