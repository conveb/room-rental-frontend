import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../services/allAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Check session using cookie
  const fetchCurrentUser = async () => {
    try {
      // call any protected endpoint that returns user
      // ask backend team if /auth/me exists
      const res = await AuthAPI();
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = async () => {
    try {
      await commonAPI("POST", "/api/v1/auth/logout/");
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
