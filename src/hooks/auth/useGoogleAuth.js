import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { createGooglePasswordApi, googleAuthAPI } from "../../services/allAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login , fetchCurrentUser  } = useAuth();

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
         // Refresh user data in auth context
        await fetchCurrentUser();
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.detail || "Google login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [navigate,login]); // Dependencies for the function itself ,REDIRECT_URI<-removed because its stable


  const handleSetPassword = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createGooglePasswordApi(payload);
      
      if (response.status === 200 || response.status === 201) {
        await login();
        toast.success("Password set successfully!");
        navigate("/dashboard"); // Or wherever you need them to go
        return response.data;
      }
    } catch (err) {
      const msg = err.response?.data?.detail || "Failed to set password";
      setError(msg);
      toast.error(msg);
      throw err; // Throwing so the component can handle local UI logic if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Clean the URL so the code doesn't stay there
      window.history.replaceState({}, document.title, window.location.pathname);
      handleGoogleLogin(code);
    }
  }, [searchParams, handleGoogleLogin]); // handleGoogleLogin is now a stable dependency

  return { handleGoogleLogin,handleSetPassword, loading, error };
};