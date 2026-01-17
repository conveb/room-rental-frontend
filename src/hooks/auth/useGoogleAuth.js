import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { googleAuthAPI } from "../../services/allAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const REDIRECT_URI = "https://www.aliveparis.com/signin"; 

  // Wrap this in useCallback to stabilize the reference
  const handleGoogleLogin = useCallback(async (authCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await googleAuthAPI({ 
        code: authCode,
        redirect_uri: REDIRECT_URI 
      });
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.detail || "Google login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [navigate, REDIRECT_URI]); // Dependencies for the function itself

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Clean the URL so the code doesn't stay there
      window.history.replaceState({}, document.title, window.location.pathname);
      handleGoogleLogin(code);
    }
  }, [searchParams, handleGoogleLogin]); // handleGoogleLogin is now a stable dependency

  return { handleGoogleLogin, loading, error };
};