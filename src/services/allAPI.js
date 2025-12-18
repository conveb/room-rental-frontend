import { commonAPI } from "./commonAPI";

// 1. Register
export const signupAPI = async (data) => {
  return await commonAPI("post", "/api/v1/register/", data);
};

// 2. Login
export const signinAPI = async (data) => {
  return await commonAPI("post", "/api/v1/token/", data);
};

// 3. Get all properties
export const getAllPropertiesAPI = async () => {
  return await commonAPI("get", "/api/v1/properties");
};

export const getPropertyByIdAPI = (propertyId) => {
  return commonAPI(
    "get",
    `/api/v1/properties/${propertyId}/`
  );
};

// VERIFY OTP
export const verifyOtpAPI = async (data) => {
  return await commonAPI("post", "/api/v1/verify-otp/", data);
};

// RESEND OTP
export const resendOtpAPI = async (data) => {
  return await commonAPI("post", "/api/v1/resend-otp/", data);
};