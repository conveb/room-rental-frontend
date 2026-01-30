import axios from "axios";

// PURE IN-MEMORY storage (no localStorage)
let refreshToken = null;

export const setRefreshToken = (token) => {
  refreshToken = token;
  console.log("Refresh token set in memory");
};

export const clearRefreshToken = () => {
  refreshToken = null;
  console.log("Refresh token cleared from memory");
};

export const getRefreshToken = () => {
  return refreshToken;
};


const api = axios.create({
  baseURL: "https://rental-homes-france.onrender.com",
  withCredentials: true,
});

/* AUTO REFRESH LOGIC */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/api/v1/login/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken !== null
    ) {
        console.log("Attempting token refresh...");
      originalRequest._retry = true;

      try {
          await api.post("/api/v1/login/refresh/");
        console.log("Token refresh successful");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed, clearing token");
        clearRefreshToken();
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
      // If it's NOT FormData, default to JSON. 
      // If it IS FormData, don't set Content-Type at all (let the browser do it)
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...reqHeaders,
    },
  };

  return api(reqConfig);
};
