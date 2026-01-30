import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import {
  setRefreshToken,
  clearRefreshToken
} from "../services/commonAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await AuthAPI();
      const userData = res?.data ?? null;
      setUser(userData);
      
      // Debug log to see what AuthAPI returns
      console.log('AuthAPI response:', userData);
      
      return userData;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      clearRefreshToken();
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (loginResponseData) => {
    setLoading(true);
    
    // Extract and store refresh token if present in login response
    // Check different possible field names
    const refreshToken = 
      loginResponseData?.refresh ||
      loginResponseData?.refresh_token ||
      loginResponseData?.refreshToken ||
      loginResponseData?.tokens?.refresh;
    
    if (refreshToken) {
      setRefreshToken(refreshToken);
      console.log("Refresh token stored from login response");
    } else {
      console.warn("No refresh token found in login response");
    }
    
    // Set user data directly from login response (don't call fetchCurrentUser again)
    // The user data might be at loginResponseData.user or loginResponseData itself
    const userData = loginResponseData?.user || loginResponseData;
    if (userData) {
      setUser(userData);
      console.log("User set from login response:", userData);
    }
    
    setLoading(false);
  };

  const logout = async () => {
    try {
      await LogoutAPI();
    } catch (e) {
      console.error("Logout API failed", e);
    } finally {
      setUser(null);
      clearRefreshToken();
      navigate("/");
    }
  };

  // Auto refresh user data every 14 minutes (or 7 if you prefer)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        console.log("Auto-refreshing user data...");
        await fetchCurrentUser();
      } catch (err) {
        console.error("Auto-refresh failed", err);
        setUser(null);
        clearRefreshToken();
        navigate("/");
      }
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
  }, [user, fetchCurrentUser, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user),
        role: user?.role || user?.role_name || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
