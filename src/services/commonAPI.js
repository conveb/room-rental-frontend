import axios from "axios";

const api = axios.create({
  baseURL: "https://rental-homes-france.onrender.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 Refresh token itself failed = real session expired
    if (originalRequest.url.includes("/api/v1/login/refresh")) {
      // Only dispatch if it was triggered by a real user action, not initial auth check
      if (!originalRequest._isAuthCheck) {
        console.log("❌ Real session expired - logging out");
        window.dispatchEvent(new Event('real-session-expired'));
      }
      return Promise.reject(error);
    }

    // ✅ Handle 401 for ALL endpoints including /auth/me — attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Pass the _isAuthCheck flag so if THIS refresh fails,
        // we know it was from initial load
        await api.post("/api/v1/login/refresh/", null, {
          _isAuthCheck: originalRequest._isAuthCheck
        });
        console.log(`✅ Token refreshed silently`);
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        // Refresh failed — only redirect if it's not just an initial auth probe
        if (!originalRequest._isAuthCheck) {
          window.dispatchEvent(new Event('real-session-expired'));
        }
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