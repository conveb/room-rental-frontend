import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch logged-in user from server (cookie/session based)
   */
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await AuthAPI();

      // 🔒 Normalize user object here (important)
      setUser(res?.data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = (response) => {
    setUser(response?.user ?? null);
  };


  const logout = async () => {
    try {
      await LogoutAPI();
    } finally {
      setUser(null);
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
        role: user?.role ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
