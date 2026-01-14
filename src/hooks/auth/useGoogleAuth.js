import { useState, useCallback } from "react";
import { googleAuthAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const googleLogin = useCallback(async (authCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await googleAuthAPI({ code: authCode });
      
      if (response.status === 200 || response.status === 201) {
        navigate("/auth/user/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { googleLogin, loading, error };
};