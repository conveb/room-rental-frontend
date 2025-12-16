import axios from "axios";

const api = axios.create({
  baseURL: "https://rental-homes-france.onrender.com",
  withCredentials: true, // 🔐 REQUIRED for HttpOnly cookies
});

/* AUTO REFRESH LOGIC */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh/");
        return api(originalRequest); // retry original request
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
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: {
      "Content-Type": "application/json",
      ...reqHeaders,
    },
  };

  return api(reqConfig);
};
