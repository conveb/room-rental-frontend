import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false); // FIX: track initialization
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const res = await AuthAPI();
      setUser(res?.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
      setIsInitialized(true); // FIX: mark as initialized
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ✅ HANDLE REAL SESSION EXPIRY - only when refresh token fails during active session
  useEffect(() => {
    const handleRealSessionExpired = () => {
      // FIX: Only logout if user was actually logged in AND we've finished initializing
      if (user && isInitialized) {
        console.log("🔴 Session expired - logging out");
        setUser(null);
        navigate("/login");
      } else {
        console.log("ℹ️ Session expired event ignored - no active session or still initializing");
      }
    };

    window.addEventListener('real-session-expired', handleRealSessionExpired);
    return () => window.removeEventListener('real-session-expired', handleRealSessionExpired);
  }, [navigate, user, isInitialized]); // FIX: add isInitialized

  const login = async () => {
    setLoading(true);
    await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      await LogoutAPI();
      console.log("✅ Logout successful");
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setUser(null);
      navigate("/signin", { replace: true });
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
        role: user?.role_name ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);