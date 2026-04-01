import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { AuthAPI, LogoutAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";  // ✅ add

const SessionHintContext = createContext(false);
const AuthContext = createContext(null);

const SESSION_HINT_KEY = "aliveparis_session_hint";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sessionHintRef = useRef(
    localStorage.getItem(SESSION_HINT_KEY) === "true"
  );

  const setSessionFlag = useCallback((value) => {
    try {
      if (value) {
        localStorage.setItem(SESSION_HINT_KEY, "true");
        sessionHintRef.current = true;
      } else {
        localStorage.removeItem(SESSION_HINT_KEY);
        sessionHintRef.current = false;
      }
    } catch { }
  }, []);

  // ✅ REPLACES: useState(user), useState(loading), useState(isInitialized)
  // ✅ REPLACES: fetchCurrentUser, visibilitychange listener, initial useEffect
  const {
    data: user = null,
    isLoading,       // true only on very first load (no cache)
    isFetching,      // true during silent background re-verify
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const res = await AuthAPI();
        if (res?.data) {
          setSessionFlag(true);
          return res.data;
        }
        setSessionFlag(false);
        return null;
      } catch (err) {
        setSessionFlag(false);
        return null;   // return null instead of throwing — avoids error state
      }
    },

    staleTime: 14 * 60 * 1000,   // 14 min — just under your 15 min access token
    gcTime: 30 * 60 * 1000,      // keep in memory 30 min after unmount

    // ✅ REPLACES your visibilitychange listener entirely
    refetchOnWindowFocus: true,

    // ✅ show old user data while silently re-verifying — no blank screen
    placeholderData: (prev) => prev,
  });

  // ✅ KEPT — real session expiry still works the same way
  useEffect(() => {
    const handleRealSessionExpired = () => {
      if (user) {
        queryClient.setQueryData(["auth", "me"], null);
        setSessionFlag(false);
        navigate("/signin");
      }
    };
    window.addEventListener("real-session-expired", handleRealSessionExpired);
    return () =>
      window.removeEventListener("real-session-expired", handleRealSessionExpired);
  }, [navigate, user, queryClient, setSessionFlag]);

  // ✅ REPLACES: login() that called fetchCurrentUser
  const login = useCallback(async () => {
    // invalidate forces TQ to refetch AuthAPI immediately
    await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  }, [queryClient]);

  // ✅ KEPT — logout logic unchanged, just clears TQ cache too
  const logout = useCallback(async () => {
    try {
      await LogoutAPI();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      setSessionFlag(false);
      navigate("/signin", { replace: true });
    }
  }, [navigate, queryClient, setSessionFlag]);

  const contextValue = useMemo(
    () => ({
      user,
      // ✅ isInitialized = true as soon as we have ANY data (cached or fresh)
      // no longer waits for network — unblocks routes immediately
      isInitialized: !isLoading,
      isFetching,       // silent background re-verify indicator
      hasSessionHint: sessionHintRef.current,
      isAuthenticated: Boolean(user),
      role: user?.role_name ?? null,
      login,
      logout,
    }),
    [user, isLoading, isFetching, login, logout]
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