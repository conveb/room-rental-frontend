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
      setUser(res?.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // const login = (response) => {
  //   setUser(response?.user ?? null);
  // };
  const login = async () => {
    setLoading(true);
    await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      await LogoutAPI();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  // AUTO REFRESH: call fetchCurrentUser every 14 minutes only if user is logged in
  useEffect(() => {
    if (!user) return; // skip if not logged in

    const interval = setInterval(async () => {
      try {
        await fetchCurrentUser();
        console.log("Token refreshed");
      } catch (err) {
        console.error("Token refresh failed", err);
        setUser(null);
        navigate("/");
      }
    }, 14 * 60 * 1000); 

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
        role: user?.role_name ?? null,
      }}
    >
      {children}
    </AuthContext.Provider> 
  );
};

export const useAuth = () => useContext(AuthContext);
