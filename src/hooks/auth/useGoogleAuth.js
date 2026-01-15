import { useState } from "react";
import { googleAuthAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async (authCode) => {
    setLoading(true);
    try {
      // 1. Send the code to your Django backend
      const response = await googleAuthAPI({ 
        code: authCode,
        callback_url: "postmessage" 
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

  return { handleGoogleLogin, loading };
};