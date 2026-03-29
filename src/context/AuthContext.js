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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();

  const setSessionFlag = useCallback((value) => {
    try {
      if (value) {
        localStorage.setItem(SESSION_HINT_KEY, "true");
        sessionHintRef.current = true;
      } else {
        localStorage.removeItem(SESSION_HINT_KEY);
        sessionHintRef.current = false;
      }
    } catch {}
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    console.log("[AuthContext] 🔍 fetchCurrentUser called");
    try {
      const res = await AuthAPI();
      console.log("[AuthContext] ✅ AuthAPI success:", res?.data);
      if (res?.data) {
        setUser(res.data);
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
        "[AuthContext] ❌ AuthAPI failed:",
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

  // ✅ THE KEY FIX — fires when user returns to mobile tab
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        console.log("[AuthContext] 👁️ Tab visible — re-verifying");

        // ✅ Reset loading so routes wait for fresh auth check
        setLoading(true);
        setIsInitialized(false);

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
        } finally {
          // ✅ Always re-initialize so routes unblock
          setLoading(false);
          setIsInitialized(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [setSessionFlag]);

  // Real session expiry handler
  useEffect(() => {
    const handleRealSessionExpired = () => {
      if (isInitialized && user) {
        console.log("[AuthContext] 🔴 Real session expired");
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

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isInitialized,
      hasSessionHint: sessionHintRef.current,
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