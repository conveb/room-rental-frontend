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
export const resendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/resend-otp/", payload);

// current user
export const AuthAPI = () => commonAPI("get", "/api/v1/me/profile");

export const LogoutAPI = () => commonAPI("post", "/api/v1/logout/");

export const getUsersAPI = ()=>commonAPI('post','/api/v1/') 
export const getPropertiesAPI = ()=>commonAPI('post','/api/v1/') 
export const approveLandownerAPI = ()=>commonAPI('post','/api/v1/') 
export const addLocationAPI = ()=>commonAPI('post','/api/v1/') 
export const deleteLocationAPI = ()=>commonAPI('post','/api/v1/') 
export const getBookingsAPI= ()=>commonAPI('post','/api/v1/') 
export const toggleBlockUserAPI= ()=>commonAPI('post','/api/v1/') 
export const approvePropertyAPI= ()=>commonAPI('post','/api/v1/') 


// /auth/reset-password/

// /locations <- get , get location
// /locations/:id/
// /admin/bookings
// /verification/:id/update/
// /locations/ <- post , add location
// /admin/users-list/

// /properties/{{propertyId}}/delete/ <- delete property
// /properties/my/ <- view my property
// /verification/submit/ <- send request for verifying landowner account
// /amenities/ <- view amenities
// /properties/ <- list props | get
// /properties/create/ <- create property | post
// /amenities/0e2d93b9-8444-40e3-bfa9-eb426256f25c/delete/ <- delete selected amenities
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/status/ <- check status of selected bookings
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/complete/ <-complete selected booking
// /properties/{{propertyId}}/ <- view selected property
// /properties/7cead067-50bc-4527-bbc3-3984dd627b4b/update/ <- update selected property
// /amenities/ <- add amenities | post
// /token/ <- list bookings (view if the property is booked or not)

// /payments/history
// /bookings/my
// /payments/razorpay/webhook
// /bookings/d9ebc43d-0693-4bef-8529-a9d47127e480/cancel/
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b
// /bookings/create/
// /payments/invoice/{{payment_id}}
// /payments/create