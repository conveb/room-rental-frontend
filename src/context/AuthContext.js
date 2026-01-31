import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

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
      
      if (userData) {
        console.log("✅ User authenticated:", userData.email || userData.username);
      }
      
      return userData;
    } catch (error) {
      console.error("❌ Failed to fetch user:", error.message);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on app load
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (loginResponseData) => {
    setLoading(true);
    
    // NO NEED TO STORE REFRESH TOKEN - it's in HTTP-only cookie
    
    // Set user state
    const userData = loginResponseData?.user || loginResponseData;
    if (userData) {
      setUser(userData);
      console.log("✅ User logged in:", userData.email || userData.username);
    }
    
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await LogoutAPI();
      console.log("✅ Logout successful");
    } catch (e) {
      console.error("Logout API error:", e);
    } finally {
      setUser(null);
      setLoading(false);
      navigate("/signin");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user),
        role: user?.role || user?.role_name || null,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);