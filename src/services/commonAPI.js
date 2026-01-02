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

    // ⛔ Don't retry refresh endpoint itself
    if (originalRequest.url.includes("/api/v1/login/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/v1/login/refresh/");
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
