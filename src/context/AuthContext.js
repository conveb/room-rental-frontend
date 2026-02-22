import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Key for localStorage
const SESSION_HINT_KEY = 'aliveparis_session_hint';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionHint, setSessionHint] = useState(() => {
    // Check localStorage on initial load
    return localStorage.getItem(SESSION_HINT_KEY) === 'true';
  });
  
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const res = await AuthAPI();
      if (res?.data) {
        setUser(res.data);
        // User is authenticated - set session hint
        localStorage.setItem(SESSION_HINT_KEY, 'true');
        setSessionHint(true);
        return res.data;
      } else {
        setUser(null);
        localStorage.removeItem(SESSION_HINT_KEY);
        setSessionHint(false);
        return null;
      }
    } catch {
      setUser(null);
      localStorage.removeItem(SESSION_HINT_KEY);
      setSessionHint(false);
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Handle real session expiry
  useEffect(() => {
    const handleRealSessionExpired = () => {
      if (user && isInitialized) {
        console.log("🔴 Session expired - logging out");
        setUser(null);
        localStorage.removeItem(SESSION_HINT_KEY);
        setSessionHint(false);
        navigate("/login");
      }
    };

    window.addEventListener('real-session-expired', handleRealSessionExpired);
    return () => window.removeEventListener('real-session-expired', handleRealSessionExpired);
  }, [navigate, user, isInitialized]);

  const login = async () => {
    console.log("🔵 Starting login process...");
    setLoading(true);
    return await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      await LogoutAPI();
      console.log("✅ Logout successful");
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setUser(null);
      localStorage.removeItem(SESSION_HINT_KEY);
      setSessionHint(false);
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
        fetchCurrentUser,
        isAuthenticated: Boolean(user),
        role: user?.role_name ?? null,
        sessionHint, // Add this to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);