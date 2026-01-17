import { useState, useEffect } from "react";
import { googleAuthAPI } from "../../services/allAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const REDIRECT_URI = "https://www.aliveparis.com/signin"; 

  const handleGoogleLogin = async (authCode) => {
    setLoading(true);
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
      toast.error(err.response?.data?.detail || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // AUTOMATIC CHECK: This runs whenever the hook is used (like on the SignIn page)
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Clean the URL so the code doesn't stay there
      window.history.replaceState({}, document.title, window.location.pathname);
      handleGoogleLogin(code);
    }
  }, [searchParams]);

  return { handleGoogleLogin, loading };
};