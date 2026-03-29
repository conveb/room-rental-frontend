import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const SessionHintContext = createContext(false);
const AuthContext = createContext(null);

const SESSION_HINT_KEY = "aliveparis_session_hint";

export const AuthProvider = ({ children }) => {
  const sessionHintRef = useRef(
    localStorage.getItem(SESSION_HINT_KEY) === "true"
  );

  // ✅ Zero user data in localStorage — memory only
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();

  // ✅ Only a boolean stored — completely safe
  const setSessionFlag = useCallback((value) => {
    try {
      if (value) {
        localStorage.setItem(SESSION_HINT_KEY, "true");
        sessionHintRef.current = true;
      } else {
        localStorage.removeItem(SESSION_HINT_KEY);
        sessionHintRef.current = false;
      }
    } catch {
      // localStorage blocked
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    console.log("[AuthContext] 🔍 fetchCurrentUser called");
    try {
      const res = await AuthAPI();
      console.log("[AuthContext] ✅ AuthAPI success:", res?.data);
      if (res?.data) {
        setUser(res.data); // ✅ Full data lives in memory only
        setSessionFlag(true);
        return res.data;
      } else {
        console.log("[AuthContext] ⚠️ AuthAPI returned no data");
        setUser(null);
        setSessionFlag(false);
        return null;
      }
    } catch (err) {
      console.log(
        "[AuthContext] ❌ AuthAPI failed (after interceptor):",
        err?.response?.status,
        err?.message
      );
      setUser(null);
      setSessionFlag(false);
      return null;
    } finally {
      console.log("[AuthContext] 🏁 setLoading(false) + setIsInitialized(true)");
      setLoading(false);
      setIsInitialized(true);
    }
  }, [setSessionFlag]);

  // Initial auth check
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ✅ Mobile tab resume — re-verify silently, no flicker
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        console.log("[AuthContext] 👁️ Tab visible — re-verifying silently");
        try {
          const res = await AuthAPI();
          if (res?.data) {
            setUser(res.data);
            setSessionFlag(true);
          } else {
            setUser(null);
            setSessionFlag(false);
          }
        } catch {
          setUser(null);
          setSessionFlag(false);
        }
        // ✅ No setLoading/setIsInitialized — completely silent
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [setSessionFlag]);

  // Handle real session expiry (both tokens dead)
  useEffect(() => {
    const handleRealSessionExpired = () => {
      if (isInitialized && user) {
        console.log("[AuthContext] 🔴 Real session expired — logging out");
        setUser(null);
        setSessionFlag(false);
        navigate("/signin");
      }
    };

    window.addEventListener("real-session-expired", handleRealSessionExpired);
    return () =>
      window.removeEventListener("real-session-expired", handleRealSessionExpired);
  }, [navigate, isInitialized, user, setSessionFlag]);

  const login = useCallback(async () => {
    setLoading(true);
    return await fetchCurrentUser();
  }, [fetchCurrentUser]);

  const logout = useCallback(async () => {
    try {
      await LogoutAPI();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setUser(null);
      setSessionFlag(false);
      navigate("/signin", { replace: true });
    }
  }, [navigate, setSessionFlag]);

  // ✅ Memoized — prevents unnecessary re-renders across entire app
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isInitialized,
      hasSessionHint: sessionHintRef.current, // ✅ for skeleton UI
      login,
      logout,
      fetchCurrentUser,
      isAuthenticated: Boolean(user),
      role: user?.role_name ?? null,
    }),
    [user, loading, isInitialized, login, logout, fetchCurrentUser]
  );

  return (
    <SessionHintContext.Provider value={sessionHintRef.current}>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </SessionHintContext.Provider>
  );
};

export const useSessionHint = () => useContext(SessionHintContext);
export const useAuth = () => useContext(AuthContext);