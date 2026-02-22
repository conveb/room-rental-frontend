import { useState } from "react";
import { blockUserAPI } from "../../services/allAPI";

export const useBlockUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserStatus = async (userId, payload) => {
    try {
      setLoading(true);
      setError(null);
      await blockUserAPI(userId, payload);
      return true;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserStatus, loading, error };
};