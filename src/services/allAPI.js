import { commonAPI } from "./commonAPI";



// 2. Login
export const signinAPI = async (data) => {
  return await commonAPI("post", "/api/v1/login/", data);
};

// 3. Get all properties
export const getAllPropertiesAPI = async () => {
  return await commonAPI("get", "/api/v1/properties");
};

export const getPropertyByIdAPI = (propertyId) => {
  return commonAPI("get",`/api/v1/properties/${propertyId}/`);
};

export const forgotPasswordApi = (payload) =>
  commonAPI("post", "/api/v1/auth/forgot-password/", payload);

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
export const AuthAPI = () => commonAPI("get", "/api/v1/auth/me");

export const LogoutAPI = () => commonAPI("post", "/api/v1/logout/");

export const getUsersAPI = ()=>commonAPI('post','/api/v1/') 
export const getPropertiesAPI = ()=>commonAPI('post','/api/v1/') 
export const approveLandownerAPI = ()=>commonAPI('post','/api/v1/') 
export const addLocationAPI = ()=>commonAPI('post','/api/v1/') 
export const getBookingsAPI= ()=>commonAPI('post','/api/v1/') 
export const toggleBlockUserAPI= ()=>commonAPI('post','/api/v1/') 
export const approvePropertyAPI= ()=>commonAPI('post','/api/v1/') 


// /auth/reset-password/

// /locations/ <- post , add location
export const addLocationsApi= (data)=>commonAPI('post','/api/v1/locations/',data) 
export const listAllLocationsApi= ()=>commonAPI('get','/api/v1/locations') 
export const deleteLocationsApi = (locationId) => commonAPI("delete", `/api/v1/locations/${locationId}`);

// /locations/:id/
// /admin/bookings
// /verification/:id/update/
// /admin/users-list/
export const getUsersAuditApi= ()=>commonAPI('get','/api/v1/admin/users/audit-logs/') 
export const getPropertiesAuditApi= ()=>commonAPI('get','/api/v1/admin/properties/audit-logs/') 
export const getLogsAuditApi= ()=>commonAPI('get','/api/v1/audit-logs/')
// /admin/users/audit-logs/

export const viewMyPropertyApi= ()=>commonAPI('get','/api/v1/properties/my/') 
export const deletePropertyApi = (propertyId) => commonAPI("delete", `/api/v1/properties/${propertyId}/delete/`);
export const updatePropertyApi = (propertyId, data) => commonAPI("patch", `/api/v1/properties/${propertyId}/update/`, data);

export const listAmenitiesApi= ()=>commonAPI('get','/api/v1/amenities') 
export const createAmenities= (data)=>commonAPI('post','/api/v1/amenities/',data) 
export const deleteAmenityApi = (amenityId) => commonAPI("delete", `/api/v1/amenities/${amenityId}`);

export const createPropertyApi= ()=>commonAPI('post','/api/v1/properties/create/') 
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/status/ <- check status of selected bookings
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/complete/ <-complete selected booking
// /properties/{{propertyId}}/ <- view selected property
// /properties/7cead067-50bc-4527-bbc3-3984dd627b4b/update/ <- update selected property
// /token/ <- list bookings (view if the property is booked or not)

// /payments/history
// /bookings/my
// /payments/razorpay/webhook
// /bookings/d9ebc43d-0693-4bef-8529-a9d47127e480/cancel/
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b
// /bookings/create/
// /payments/invoice/{{payment_id}}
// /payments/create