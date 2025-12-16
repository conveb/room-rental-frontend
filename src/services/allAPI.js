import { commonAPI } from "./commonAPI";

// 1. Register
export const signupAPI = async (user) => {
  return await commonAPI("post", "/api/v1/register", user);
};

// 2. Login
export const signinAPI = async (data) => {
  return await commonAPI("post", "/api/v1/token", data);
};

// 3. Get all properties
export const getAllPropertiesAPI = async () => {
  return await commonAPI("get", "api/v1/properties/");
};
