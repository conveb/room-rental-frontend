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

const SESSION_HINT_KEY = 'aliveparis_session_hint';

export const AuthProvider = ({ children }) => {
  const sessionHintRef = useRef(
    localStorage.getItem(SESSION_HINT_KEY) === 'true'
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start true so app waits
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
      // localStorage blocked
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await AuthAPI();
      if (res?.data) {
        setUser(res.data);
        setSessionFlag(true);
        return res.data;
      } else {
        setUser(null);
        setSessionFlag(false);
        return null;
      }
    } catch {
      // Auth check failed — could be expired token, interceptor will handle refresh
      // Do NOT navigate here — just set user null and let the app decide
      setUser(null);
      setSessionFlag(false);
      return null;
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Only handle REAL session expiry (refresh token also dead)
  useEffect(() => {
    const handleRealSessionExpired = () => {
      // Only redirect if user was actually logged in
      if (isInitialized && user) {
        setUser(null);
        setSessionFlag(false);
        navigate("/signin");
      }
    };

    window.addEventListener('real-session-expired', handleRealSessionExpired);
    return () => window.removeEventListener('real-session-expired', handleRealSessionExpired);
  }, [navigate, isInitialized]);

  const login = async () => {
    setLoading(true);
    return await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      await LogoutAPI();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setUser(null);
      setSessionFlag(false);
      navigate("/signin", { replace: true });
    }
  };

  // Don't render children until we know auth state
  if (!isInitialized) return null; // or a full-screen spinner

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