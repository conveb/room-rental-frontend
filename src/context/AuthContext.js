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
const USER_CACHE_KEY = "aliveparis_user_cache";
const ROLE_CACHE_KEY = "aliveparis_role_cache";

export const AuthProvider = ({ children }) => {
  const sessionHintRef = useRef(
    localStorage.getItem(SESSION_HINT_KEY) === "true"
  );

  // ✅ Read from cache instantly — no waiting for API
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // ✅ If cache exists → already initialized, skip spinner
  const [isInitialized, setIsInitialized] = useState(() => {
    return localStorage.getItem(SESSION_HINT_KEY) === "true";
  });

  const navigate = useNavigate();

  const setSessionFlag = useCallback((value, userData = null) => {
    try {
      if (value && userData) {
        localStorage.setItem(SESSION_HINT_KEY, "true");
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));
        localStorage.setItem(ROLE_CACHE_KEY, userData?.role_name ?? "");
        sessionHintRef.current = true;
      } else {
        localStorage.removeItem(SESSION_HINT_KEY);
        localStorage.removeItem(USER_CACHE_KEY);
        localStorage.removeItem(ROLE_CACHE_KEY);
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
        setUser(res.data);
        setSessionFlag(true, res.data);
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

  // Initial auth check on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ✅ Mobile tab resume — re-verify silently in background
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        console.log("[AuthContext] 👁️ Tab visible again — re-verifying silently");
        try {
          const res = await AuthAPI();
          if (res?.data) {
            setUser(res.data);
            setSessionFlag(true, res.data);
          } else {
            setUser(null);
            setSessionFlag(false);
          }
        } catch {
          setUser(null);
          setSessionFlag(false);
        }
        // ✅ No setLoading/setIsInitialized — runs silently, no flicker
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [setSessionFlag]);

  // Handle real session expiry (both access + refresh token dead)
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

  // ✅ Memoized context value — prevents unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isInitialized,
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