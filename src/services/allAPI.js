import { commonAPI } from "./commonAPI";


//public
export const signinAPI = async (data) => { return await commonAPI("post", "/api/v1/login/", data);};
export const getAllPropertiesAPI = async () => { return await commonAPI("get", "/api/v1/properties");};
export const getPropertyByIdAPI = (propertyId) => { return commonAPI("get",`/api/v1/properties/${propertyId}/`);};
export const forgotPasswordApi = (payload) =>commonAPI("post", "/api/v1/auth/forgot-password/", payload);
export const sendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/email/", payload);
export const verifyOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/verify/", payload);
export const signupAPI = (payload) => commonAPI("post", "/api/v1/auth/register/", payload);
export const resendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/resend-otp/", payload);
export const AuthAPI = () => commonAPI("get", "/api/v1/auth/me");
export const LogoutAPI = () => commonAPI("post", "/api/v1/logout/");
export const googleAuthAPI= (data)=>commonAPI('post','/api/v1/auth/google/',data)
//student
export const createComplaint= (data)=> commonAPI('post','/api/v1/complaints/create/',data)
export const getMyComplaints= ()=> commonAPI('get','/api/v1/complaints/my/') 
export const getComplaintDetailsApi= (id) => commonAPI('get', `/api/v1/complaints/${id}/`);
export const updateUserProfileAPI = (payload) => commonAPI("patch", "/api/v1/me/profile/update/",payload);
export const changeUserPasswordAPI = (payload) => commonAPI("post", "/api/v1/me/reset-password/",payload);
export const deleteUserProfileAPI = () => commonAPI("delete", "/api/v1/me/delete-account/");
export const getMyBookingsApi= ()=>commonAPI('get','/api/v1/bookings/my') 
export const createSupportApi= (data)=>commonAPI('post','/api/v1/support/create/',data) 
//landowner
export const viewMyPropertyApi= ()=>commonAPI('get','/api/v1/properties/my/') 
export const updatePropertyApi = (propertyId, data) => commonAPI("patch", `/api/v1/properties/${propertyId}/update/`, data);
export const createPropertyApi= (data)=>commonAPI('post','/api/v1/properties/create/',data) 
export const deletePropertyApi = (propertyId) => commonAPI("delete", `/api/v1/properties/${propertyId}/delete/`);
//admin
export const getAllUsersAPI = ()=>commonAPI('get','/api/v1/admin/users') 
export const getUserProfileAPI = () => commonAPI("get", "/api/v1/me/profile");
export const getUserCompleteDetailsAPI = (id) => commonAPI("get", `/api/v1/admin/users/students/${id}/detail`);
export const blockUserAPI = (userId, payload) => commonAPI("patch", `/api/v1/admin/users/${userId}/status/`, payload);
export const approvePropertyAPI= ()=>commonAPI('post','/api/v1/') 
export const addLocationsApi= (data)=>commonAPI('post','/api/v1/locations/',data) 
export const listAllLocationsApi= ()=>commonAPI('get','/api/v1/locations') 
export const deleteLocationsApi = (locationId) => commonAPI("delete", `/api/v1/locations/${locationId}`);
export const getPropertiesAuditApi= ()=>commonAPI('get','/api/v1/admin/properties/audit-logs/') 
export const getUsersAuditApi= ()=>commonAPI('get','/api/v1/admin/users/audit-logs/') 
export const getLogsAuditApi= ()=>commonAPI('get','/api/v1/audit-logs/')
export const getReportedLandownersApi= ()=>commonAPI('get','/api/v1/admin/reported-landowners/') 
export const listAmenitiesApi= ()=>commonAPI('get','/api/v1/amenities') 
export const createAmenities= (data)=>commonAPI('post','/api/v1/amenities/',data) 
export const deleteAmenityApi = (amenityId) => commonAPI("delete", `/api/v1/amenities/${amenityId}`);
export const getAllSupportApi= ()=>commonAPI('get','/api/v1/admin/support/') 
export const updateStatusApi = (id, data) => commonAPI("patch", `/api/v1/admin/support/${id}/update/`, data);
export const getAllFeedbackApi= ()=>commonAPI('get','/api/v1/feedback') 
export const sendFeedbackApi= (data)=>commonAPI('post','/api/v1/feedback/create/',data) 
export const getAllBookings= ()=> commonAPI('get','/api/v1/admin/bookings') 

// verify_passport
// Admin_complaint_detail_view
///admin/complaints/
export const getAllComplaintsApi= ()=> commonAPI('get','/api/v1/admin/complaints/') 
///admin/complaints/{{complaint_id}}/
export const getComplaintDetailAdminApi= (id) => commonAPI('get', `/api/v1/admin/complaints/${id}/`);
export const updateComplaintStatusApi = (id, data) => commonAPI("patch", `/api/v1/admin/complaints/${id}/update/`, data);

// create_property_amenity <-----------------------------------
// create_property_instruction
// delete_property_amenity
// list_property_instruction
// update_property_instruction
// delete_property_instruction
// create_property_images
// List_property_images
// delete_property_images
// Add_to_favourites
// List_favourites
// Admin_update_status

// Admin_view_reported_land_owners /admin/reported-landowners/
export const getReportedRoomownersApi= ()=> commonAPI('get','/api/v1/admin/reported-landowners/') 
export const getReportedPropertiesApi= ()=> commonAPI('get','/api/v1/admin/reported-properties/') 
// Admin_view_reported_properties /admin/reported-properties/

// Admin_users_status_update
// Land_owner_details_view
// student_detail_view

// list_permissions
// list_groups
// Add_groups
// Group_detail_view
// Group_update
// Group_delete

// Payment History (user payments)
// create payment
// razorpay webhook
// download invoice
// create country payout provider
// add payout account
// payment create
// paypal order

// Add_payout_provider <--------------------------------------- Admin
// delete_payout_provider <------------------------------------ Admin
// update_payout_provider <------------------------------------ Admin
// detail_view_payout_provider <------------------------------- Admin
// List_payout_provider <-------------------------------------- Admin
// Country_detail_view <--------------------------------------- Admin