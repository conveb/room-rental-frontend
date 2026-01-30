import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { setRefreshToken } from "../../services/commonAPI";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signin = async (payload) => {
    setError("");

    if (!payload.email || !payload.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting login with:", payload.email);

      const res = await signinAPI(payload);

      if (!res?.data) {
        throw new Error("Login failed - no data in response");
      }
      
      console.log("Full login response:", res);
      console.log("Login response data:", res.data);
      
      // Check if response has the expected structure
      if (!res.data.user && !res.data.access && !res.data.access_token) {
        console.warn("Login response doesn't contain expected user/token fields");
      }

      // ✅ STORE REFRESH TOKEN IN MEMORY
      // Look for refresh token in different possible locations
      const refreshToken = 
        res.data.refresh ||
        res.data.refresh_token ||
        res.data.tokens?.refresh ||
        res.data.refreshToken ||
        res.headers?.['x-refresh-token'] || // Sometimes in headers
        null;
      
      if (refreshToken) {
        setRefreshToken(refreshToken);
        console.log("Refresh token stored:", refreshToken.substring(0, 20) + "...");
      } else {
        console.warn("No refresh token found in login response");
        // Check if using HTTP-only cookies instead
        console.log("If using HTTP-only cookies, refresh token might be in cookies");
      }

      // ✅ PASS THE DATA TO AUTH CONTEXT
      // Pass the entire response data to login function
      await login(res.data);

      // ✅ NAVIGATE BASED ON ROLE
      // The role might be in res.data.user.role or res.data.role
      const userRole = res.data.user?.role || res.data.role;
      
      if (userRole === "STUDENT") {
        navigate("/auth/user/accommodation");
      } else if (userRole === "LAND_OWNER") {
        navigate("/auth/landowner");
      } else if (userRole === "ADMIN") {
        navigate("/auth/admin");
      } else {
        console.warn("Unknown role, navigating to home");
        navigate("/");
      }

      toast.success("Login successful!");

    } catch (err) {
      console.error("Login error:", err);
      
      let backendError = "Invalid email or password";
      
      if (err.response) {
        // Server responded with error status
        const errorData = err.response.data;
        backendError = 
          errorData?.user ||
          errorData?.email ||
          errorData?.detail ||
          errorData?.message ||
          errorData?.non_field_errors?.[0] ||
          `Server error: ${err.response.status}`;
        
        if(err.response.status === 401) {
          toast.error("Unauthorized access. Please check your credentials.");
        } else if (err.response.status === 400) {
          toast.error("Bad request. Please check your input.");
        } else if (err.response.status >= 500) {
          toast.error("Server error. Please try again later.");
        }
      } else if (err.request) {
        // Request made but no response
        backendError = "No response from server. Check your connection.";
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        backendError = err.message || "Login failed";
      }

      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return { signin, loading, error };
};