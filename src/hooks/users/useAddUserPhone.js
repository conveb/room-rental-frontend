import { useState } from "react";
import { addUserPhone } from "../../services/allAPI";

export const useAddUserPhone = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUserPhoneNumber = async (userId, payload) => {
    try {
      setLoading(true);
      setError(null);
      await addUserPhone(userId, payload);
      return true;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addUserPhoneNumber, loading, error };
};