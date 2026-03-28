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
  (response) => {
    console.log('[API] ✅ Response OK:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log('[API] ❌ Error:', {
      url: originalRequest?.url,
      status: error.response?.status,
      isAuthCheck: originalRequest?._isAuthCheck,
      _retry: originalRequest?._retry,
      isRefreshing,
    });

    // If the refresh endpoint itself failed → real session expired
    if (originalRequest.url?.includes("/api/v1/login/refresh")) {
      console.log('[API] 🔴 Refresh endpoint failed — real session expired?', {
        isAuthCheck: originalRequest._isAuthCheck
      });
      if (!originalRequest._isAuthCheck) {
        console.log('[API] 🔴 Dispatching real-session-expired event');
        window.dispatchEvent(new Event('real-session-expired'));
      } else {
        console.log('[API] ⚠️ Refresh failed but _isAuthCheck=true, NOT dispatching event');
      }
      return Promise.reject(error);
    }

    // Only handle 401s, only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        console.log('[API] ⏳ Already refreshing, queuing request:', originalRequest.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log('[API] 🔄 Retrying queued request after refresh:', originalRequest.url);
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.log('[API] 🔄 401 detected, attempting token refresh for:', originalRequest.url);

      try {
        const refreshResponse = await api.post("/api/v1/login/refresh/", null, {
          _isAuthCheck: originalRequest._isAuthCheck,
        });
        console.log('[API] ✅ Token refresh SUCCESS:', refreshResponse?.status);

        // Token refreshed — retry all queued requests
        processQueue(null);
        console.log('[API] 🔄 Retrying original request after refresh:', originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — reject all queued requests
        console.log('[API] 🔴 Token refresh FAILED:', refreshError?.response?.status, refreshError?.message);
        processQueue(refreshError);

        if (!originalRequest._isAuthCheck) {
          console.log('[API] 🔴 Dispatching real-session-expired event');
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