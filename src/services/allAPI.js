import { commonAPI } from "./commonAPI";



export const signinAPI = async (data) => { return await commonAPI("post", "/api/v1/login/", data);};
export const getAllPropertiesAPI = async () => { return await commonAPI("get", "/api/v1/properties");};
export const getPropertyByIdAPI = (propertyId) => { return commonAPI("get",`/api/v1/properties/${propertyId}/`);};
export const forgotPasswordApi = (payload) =>commonAPI("post", "/api/v1/auth/forgot-password/", payload);
export const sendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/email/", payload);
export const verifyOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/verify/", payload);
export const signupAPI = (payload) => commonAPI("post", "/api/v1/auth/register/", payload);
export const resendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/resend-otp/", payload);
export const getAllUsersAPI = ()=>commonAPI('get','/api/v1/admin/users') 
export const AuthAPI = () => commonAPI("get", "/api/v1/auth/me");
export const getUserProfileAPI = () => commonAPI("get", "/api/v1/me/profile");
export const getUserCompleteDetailsAPI = (id) => commonAPI("get", `/api/v1/admin/users/students/${id}/detail`);
export const updateUserProfileAPI = (payload) => commonAPI("patch", "/api/v1/me/profile/update/",payload);
export const changeUserPasswordAPI = (payload) => commonAPI("post", "/api/v1/me/reset-password/",payload);
export const deleteUserProfileAPI = () => commonAPI("delete", "/api/v1/me/delete-account/");
export const blockUserAPI = (userId, payload) => commonAPI("patch", `/api/v1/admin/users/${userId}/status/`, payload);

export const LogoutAPI = () => commonAPI("post", "/api/v1/logout/");

export const approvePropertyAPI= ()=>commonAPI('post','/api/v1/') 
export const googleAuthAPI= (data)=>commonAPI('post','/api/v1/auth/google/web',data)

export const addLocationsApi= (data)=>commonAPI('post','/api/v1/locations/',data) 
export const listAllLocationsApi= ()=>commonAPI('get','/api/v1/locations') 
export const deleteLocationsApi = (locationId) => commonAPI("delete", `/api/v1/locations/${locationId}`);


export const getUsersAuditApi= ()=>commonAPI('get','/api/v1/admin/users/audit-logs/') 
export const getPropertiesAuditApi= ()=>commonAPI('get','/api/v1/admin/properties/audit-logs/') 
export const getLogsAuditApi= ()=>commonAPI('get','/api/v1/audit-logs/')

export const getReportedLandownersApi= ()=>commonAPI('get','/api/v1/admin/reported-landowners/') 
//landowner
export const viewMyPropertyApi= ()=>commonAPI('get','/api/v1/properties/my/') 
export const deletePropertyApi = (propertyId) => commonAPI("delete", `/api/v1/properties/${propertyId}/delete/`);
export const updatePropertyApi = (propertyId, data) => commonAPI("patch", `/api/v1/properties/${propertyId}/update/`, data);

export const listAmenitiesApi= ()=>commonAPI('get','/api/v1/amenities') 
export const createAmenities= (data)=>commonAPI('post','/api/v1/amenities/',data) 
export const deleteAmenityApi = (amenityId) => commonAPI("delete", `/api/v1/amenities/${amenityId}`);

export const createPropertyApi= (data)=>commonAPI('post','/api/v1/properties/create/',data) 

export const getAllSupportApi= ()=>commonAPI('get','/api/v1/admin/support/') 
export const updateStatusApi = (id, data) => commonAPI("patch", `/api/v1/admin/support/${id}/update/`, data);

export const getAllFeedbackApi= ()=>commonAPI('get','/api/v1/feedback') 
export const sendFeedbackApi= (data)=>commonAPI('post','/api/v1/feedback/create/',data) 
// /feedback/create/
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/status/ <- check status of selected bookings
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b/complete/ <-complete selected booking
// /properties/{{propertyId}}/ <- view selected property
// /properties/7cead067-50bc-4527-bbc3-3984dd627b4b/update/ <- update selected property
// /token/ <- list bookings (view if the property is booked or not)

// /payments/history
// export const getMyBookingsApi= ()=> commonAPI('get','/api/v1/bookings/my') 
export const getAllBookings= ()=> commonAPI('get','/api/v1/admin/bookings') 
// 
// /payments/razorpay/webhook
// /bookings/d9ebc43d-0693-4bef-8529-a9d47127e480/cancel/
// /bookings/90edd763-eb24-47a7-ab80-02289c6c9c3b
// /bookings/create/
// /payments/invoice/{{payment_id}}
// /payments/create