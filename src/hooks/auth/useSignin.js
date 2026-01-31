import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signin = async (payload) => {
    setError("");

    if (!payload.email || !payload.password) {
      setError("Email and password are required");
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      console.log("🔐 Attempting login...");

      const res = await signinAPI(payload);

      if (!res?.data) {
        throw new Error("Login failed - no response data");
      }
      
      console.log("✅ Login successful");
      
      // NO NEED TO STORE REFRESH TOKEN - it's in HTTP-only cookie
      
      // Update auth context
      await login(res.data);

      // Navigate based on role
      const userRole = res.data.user?.role || res.data.role;
      let redirectPath = "/";
      
      if (userRole === "STUDENT") {
        redirectPath = "/auth/user/accommodation";
      } else if (userRole === "LAND_OWNER") {
        redirectPath = "/auth/landowner";
      } else if (userRole === "ADMIN") {
        redirectPath = "/auth/admin";
      }
      
      console.log(`📍 Navigating to: ${redirectPath}`);
      navigate(redirectPath);
      toast.success("Login successful!");

    } catch (err) {
      console.error("❌ Login error:", err);
      
      let errorMessage = "Invalid email or password";
      
      if (err.response) {
        const errorData = err.response.data;
        errorMessage = 
          errorData?.detail ||
          errorData?.message ||
          errorData?.non_field_errors?.[0] ||
          `Login failed (${err.response.status})`;
        
        if (err.response.status === 401) {
          toast.error("Invalid credentials");
        }
      } else if (err.request) {
        errorMessage = "No response from server";
        toast.error("Network error");
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signin, loading, error };
};