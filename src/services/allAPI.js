import { commonAPI } from "./commonAPI";



// 2. Login
export const signinAPI = async (data) => {
  return await commonAPI("post", "/api/v1/token/", data);
};

// 3. Get all properties
export const getAllPropertiesAPI = async () => {
  return await commonAPI("get", "/api/v1/properties");
};

export const getPropertyByIdAPI = (propertyId) => {
  return commonAPI("get",`/api/v1/properties/${propertyId}/`);
};


// SEND OTP
export const sendOtpAPI = (payload) =>
  commonAPI("post", "/api/v1/auth/email/", payload);

//  VERIFY OTP
export const verifyOtpAPI = (payload) =>
  commonAPI("post", "/api/v1/auth/verify/", payload);

// REGISTER USER
export const signupAPI = (payload) =>
  commonAPI("post", "/api/v1/auth/register/", payload);

// RESEND OTP
export const resendOtpAPI = (payload) =>
  commonAPI("post", "/api/v1/auth/resend-otp/", payload);

// RESEND OTP
export const AuthAPI = () =>
  commonAPI("GET", "/api/v1/auth/me/");


