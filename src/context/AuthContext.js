import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { commonAPI } from "../services/commonAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchCurrentUser = async () => {
    try {
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
      await LogoutAPI();
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
