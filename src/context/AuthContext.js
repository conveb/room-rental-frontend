import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const SessionHintContext = createContext(false);
const AuthContext = createContext(null);

// Key for localStorage
const SESSION_HINT_KEY = 'aliveparis_session_hint';

export const AuthProvider = ({ children }) => {
  const sessionHintRef = useRef(
    localStorage.getItem(SESSION_HINT_KEY) === 'true'
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const setSessionFlag = (value) => {
    try {
      if (value) {
        localStorage.setItem(SESSION_HINT_KEY, 'true');
      } else {
        localStorage.removeItem(SESSION_HINT_KEY);
      }
    } catch {
      // localStorage blocked (private mode, storage full, etc.)
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await AuthAPI();
      if (res?.data) {
        setUser(res.data);
        // User is authenticated - set session hint
        setSessionFlag(true);
        return res.data;
      } else {
        setUser(null);
        setSessionFlag(false);
        return null;
      }
    } catch {
      console.error("Auth check failed, but waiting for interceptor...");
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
        setSessionFlag(false);
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
      setSessionFlag(false);
      navigate("/signin", { replace: true });
    }
  };

  return (
    <SessionHintContext.Provider value={sessionHintRef.current}>

      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          logout,
          fetchCurrentUser,
          isAuthenticated: Boolean(user),
          role: user?.role_name ?? null,

        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionHintContext.Provider>
  );
};

export const useSessionHint = () => useContext(SessionHintContext);
export const useAuth = () => useContext(AuthContext);