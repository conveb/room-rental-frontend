import axios from "axios";

const api = axios.create({
  baseURL: "https://rental-homes-france.onrender.com",
  withCredentials: true,
});

/* AUTO REFRESH LOGIC */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 If refresh token endpoint itself fails
    if (originalRequest.url.includes("/api/v1/login/refresh")) {
      // Check if this was from initial auth check - FIX: check the original request's marker
      if (originalRequest._isAuthCheck || originalRequest._retry?._isAuthCheck) {
        console.log("ℹ️ No active session found - ignoring");
        return Promise.reject(error);
      }
      
      // This is a real session expiry during active use
      console.log("❌ Real session expired - logging out");
      window.dispatchEvent(new Event('real-session-expired'));
      return Promise.reject(error);
    }

    // Handle 401 for other endpoints - attempt refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/v1/auth/me") // FIX: Don't try to refresh for auth/me
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/v1/login/refresh/");
        console.log(`✅ Access token refreshed at ${new Date().toLocaleTimeString()}`);
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const commonAPI = async (
  httpRequest,
  url,
  reqBody = null,
  reqHeaders = {}
) => {
  const isFormData = reqBody instanceof FormData;
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...reqHeaders,
    },
  };

  // Mark auth check requests
  if (url.includes("/api/v1/auth/me")) {
    reqConfig._isAuthCheck = true;
  }

  return api(reqConfig);
};

export default api;