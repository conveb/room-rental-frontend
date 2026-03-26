import axios from "axios";

const api = axios.create({
  baseURL: "https://api.aliveparis.com",
  withCredentials: true,
});

// Queue to hold requests while token is being refreshed
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the refresh endpoint itself failed → real session expired
    if (originalRequest.url?.includes("/api/v1/login/refresh")) {
      if (!originalRequest._isAuthCheck) {
        window.dispatchEvent(new Event('real-session-expired'));
      }
      return Promise.reject(error);
    }

    // Only handle 401s, only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/api/v1/login/refresh/", null, {
          _isAuthCheck: originalRequest._isAuthCheck,
        });

        // Token refreshed — retry all queued requests
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — reject all queued requests
        processQueue(refreshError);

        if (!originalRequest._isAuthCheck) {
          window.dispatchEvent(new Event('real-session-expired'));
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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

  if (url.includes("/api/v1/auth/me")) {
    reqConfig._isAuthCheck = true;
  }

  return api(reqConfig);
};

export default api;