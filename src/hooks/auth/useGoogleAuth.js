import { useState, useCallback } from "react";
import { googleAuthAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const googleLogin = useCallback(async (authCode) => {
    setLoading(true);
    setError(null);
    try {
      // Your Django backend needs the code and the explicit callback_url string
      const response = await googleAuthAPI({ 
        code: authCode,
        callback_url: "postmessage" 
      });
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Welcome to Alive Paris!");
        navigate("/dashboard");
      }
    } catch (err) {
      // Django allauth usually returns errors under the 'detail' key
      const msg = err.response?.data?.detail || "Google authentication failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { googleLogin, loading, error };
};