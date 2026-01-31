import axios from "axios";

// REMOVE ALL REFRESH TOKEN MEMORY LOGIC!
// HTTP-only cookies handle this automatically

// Create axios instance
const api = axios.create({
  baseURL: "https://rental-homes-france.onrender.com",
  withCredentials: true, // THIS SENDS COOKIES AUTOMATICALLY
});

/* SIMPLIFIED SILENT TOKEN REFRESH INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh endpoint to avoid infinite loops
    if (originalRequest.url.includes("/api/v1/login/refresh")) {
      return Promise.reject(error);
    }

    // If we get 401, try to refresh (refresh token is in cookies)
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 Access token expired. Attempting refresh...");
      originalRequest._retry = true;

      try {
        // This will automatically send the refresh token cookie
        await api.post("/api/v1/login/refresh/");
        console.log("✅ Token refreshed successfully");
        
        // Retry the original request
        return api(originalRequest);
        
      } catch (refreshError) {
        console.log("❌ Token refresh failed:", refreshError.response?.status);
        
        // Redirect to login on refresh failure
        if (!window.location.pathname.includes("/signin")) {
          console.log("Redirecting to login...");
          window.location.href = "/signin";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* MAIN API FUNCTION */
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

  return api(reqConfig);
};

// Export the axios instance
export { api };

// Remove these - not needed for HTTP-only cookies
// export const setRefreshToken = () => {};
// export const clearRefreshToken = () => {};