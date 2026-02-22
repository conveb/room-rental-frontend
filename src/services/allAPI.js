import { commonAPI } from "./commonAPI";


export const signinAPI = async (data) => { return await commonAPI("post", "/api/v1/login/", data);};
export const signupAPI = (payload) => commonAPI("post", "/api/v1/auth/register/", payload);
export const verifyOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/verify/", payload);
export const sendOtpAPI = (payload) => commonAPI("post", "/api/v1/auth/email/", payload);
export const AuthAPI = () => commonAPI("get", "/api/v1/auth/me");
export const forgotPasswordApi = (payload) =>commonAPI("post", "/api/v1/auth/forgot-password/", payload);
export const createGooglePasswordApi = (payload) =>commonAPI("post", "/api/v1/auth/google/setpassword/", payload);
export const LogoutAPI = () => commonAPI("post", "/api/v1/logout/");

export const getAllPropertiesAPI = async () => { return await commonAPI("get", "/api/v1/properties");};
export const getPropertyByIdAPI = (propertyId) => { return commonAPI("get",`/api/v1/properties/${propertyId}/`);};
export const googleAuthAPI= (data)=>commonAPI('post','/api/v1/auth/google/',data)

export const createComplaint= (data)=> commonAPI('post','/api/v1/complaints/create/',data)
export const getMyComplaints= ()=> commonAPI('get','/api/v1/complaints/my/') 
export const getComplaintDetailsApi= (id) => commonAPI('get', `/api/v1/complaints/${id}/`);

export const updateUserProfileAPI = (payload) => commonAPI("patch", "/api/v1/me/profile/update/",payload);
export const changeUserPasswordAPI = (payload) => commonAPI("post", "/api/v1/me/reset-password/",payload);
export const deleteUserProfileAPI = () => commonAPI("delete", "/api/v1/me/delete-account/");

export const ListNotificationsApi= ()=>commonAPI('get','/api/v1/notifications/') 

export const getMyBookingsApi= ()=>commonAPI('get','/api/v1/bookings/my') 

export const createSupportApi= (data)=>commonAPI('post','/api/v1/support/create/',data) 

export const ReportPropertyApi = (id, data) => {return commonAPI('post', `/api/v1/report-property/${id}/`, data);};
export const ReportRoomOwnerApi = (id, data) => {return commonAPI('post', `/api/v1/report-landowner/${id}/`, data);};

export const AddFavouritesApi= (data)=>commonAPI('post','/api/v1/favourites/add/',data) 
export const GetFavouritesApi= ()=>commonAPI('get','/api/v1/favourites/') 
export const RemoveFavouritesApi= (id)=>commonAPI('delete',`/api/v1/favourites/${id}/remove/`) 

export const viewMyPropertyApi= ()=>commonAPI('get','/api/v1/properties/my/') 
export const updatePropertyApi = (propertyId, data) => commonAPI("patch", `/api/v1/properties/${propertyId}/update/`, data);
export const createPropertyApi= (data)=>commonAPI('post','/api/v1/properties/create/',data) 
export const deletePropertyApi = (propertyId) => commonAPI("delete", `/api/v1/properties/${propertyId}/delete/`);

export const getAllUsersAPI = ()=>commonAPI('get','/api/v1/admin/users') 
// =============================================================================
export const getOverviewAPI = ()=>commonAPI('get','/api/v1/overview-counts/');
// =============================================================================
export const getUserProfileAPI = () => commonAPI("get", "/api/v1/me/profile");
export const getUserCompleteDetailsAPI = (id) => commonAPI("get", `/api/v1/admin/users/students/${id}/detail`);
export const blockUserAPI = (userId, payload) => commonAPI("patch", `/api/v1/admin/users/${userId}/status/`, payload);

export const getAllSupportApi= ()=>commonAPI('get','/api/v1/admin/support/') 

export const getAllFeedbackApi= ()=>commonAPI('get','/api/v1/feedback') 
export const sendFeedbackApi= (data)=>commonAPI('post','/api/v1/feedback/create/',data) 
export const DeleteFeedbackApi= (id)=>commonAPI('delete',`/api/v1/feedback/${id}/delete/`)

export const approvePropertyAPI= ()=>commonAPI('post','/api/v1/') 

export const listAllLocationsApi= ()=>commonAPI('get','/api/v1/locations') 
export const addLocationsApi= (data)=>commonAPI('post','/api/v1/locations/',data) 
export const deleteLocationsApi = (locationId) => commonAPI("delete", `/api/v1/locations/${locationId}`);

export const getPropertiesAuditApi= ()=>commonAPI('get','/api/v1/admin/properties/audit-logs/') 
export const getUsersAuditApi= ()=>commonAPI('get','/api/v1/admin/users/audit-logs/') 
export const getLogsAuditApi= ()=>commonAPI('get','/api/v1/audit-logs/')

export const getReportedLandownersApi= ()=>commonAPI('get','/api/v1/admin/reported-landowners/') 

export const listAmenitiesApi= ()=>commonAPI('get','/api/v1/amenities') 
export const createAmenities= (data)=>commonAPI('post','/api/v1/amenities/',data) 
export const deleteAmenityApi = (amenityId) => commonAPI("delete", `/api/v1/amenities/${amenityId}/`);
export const updateStatusApi = (id, data) => commonAPI("patch", `/api/v1/admin/support/${id}/update/`, data);

export const getAllBookings= ()=> commonAPI('get','/api/v1/admin/bookings') 

export const getAllComplaintsApi= ()=> commonAPI('get','/api/v1/admin/complaints/') 
export const getComplaintDetailAdminApi= (id) => commonAPI('get', `/api/v1/admin/complaints/${id}/`);
export const updateComplaintStatusApi = (id, data) => commonAPI("patch", `/api/v1/admin/complaints/${id}/update/`, data);

export const getReportedRoomownersApi= ()=> commonAPI('get','/api/v1/admin/reported-landowners/') 
export const getReportedPropertiesApi= ()=> commonAPI('get','/api/v1/admin/reported-properties/') 

export const createAmenitiesByRoomOwnerApi= (id,data)=>commonAPI('post',`/api/v1/properties/${id}/amenities/add/`,data) 
export const DeleteAmenitiesByRoomOwnerApi= (propId,propAmenityId)=>commonAPI('delete',`/api/v1/properties/${propId}/amenities/${propAmenityId}/delete/`) 

export const getPropInstructionApi= (propId)=> commonAPI('get',`/api/v1/properties/${propId}/instructions/`)
export const createPropInstructionApi= (propId,data)=>commonAPI('post',`/api/v1/properties/${propId}/instructions/add/`,data) 
export const updatePropInstructionApi = (propId, instId, data) => commonAPI("patch", `/api/v1/properties/${propId}/instructions/${instId}/update/`, data);
export const DeletePropInstructionApi= (propId,instId)=>commonAPI('delete',`/api/v1/properties/${propId}/instructions/${instId}/delete/`) 

export const createPropImageApi= (propId,data)=>commonAPI('post',`/api/v1/property-images/${propId}/create/`,data) 
export const getPropImageApi= (propId)=> commonAPI('get',`/api/v1/properties/${propId}/images/`)
export const DeletePropImageApi= (propId,propImageId)=>commonAPI('delete',`/api/v1/properties/${propId}/images/${propImageId}/delete/`) 

export const getAllCountriesApi= ()=>commonAPI('get','/api/v1/countries/') 
export const createCountryApi= (data)=>commonAPI('post',`/api/v1/countries/create/`,data) 
export const updateCountryApi = (countryId, data) => commonAPI("patch", `/api/v1/countries/${countryId}/update/`, data);
export const deleteCountryApi = (countryId) => commonAPI("delete", `/api/v1/countries/${countryId}/delete/`);

export const createPayoutProviderApi= (data)=>commonAPI('post',`/api/v1/payout-providers/`,data) 
export const updatePayoutProviderApi = (id, data) => commonAPI("patch", `/api/v1/payout-providers/${id}/`, data);
export const getPayoutProvidersApi= ()=>commonAPI('get',`/api/v1/payout-providers/`) 
export const deletePayoutProviderApi = (id) => commonAPI("delete", `/api/v1/payout-providers/${id}/`);

export const getCountryPayoutProvidersApi= ()=>commonAPI('get',`/api/v1/country-payout-providers`) 
export const getCountryPayoutProviderDetailsApi= (id) => commonAPI('get', `/api/v1/country-payout-providers/${id}/`);
export const createCountryPayoutProviderApi= (data)=>commonAPI('post',`/api/v1/country-payout-providers/`,data) 
export const updateCountryPayoutProviderApi = (id, data) => commonAPI("patch", `/api/v1/country-payout-providers/${id}/`, data);
export const deleteCountryPayoutProviderApi = (id) => commonAPI("delete", `/api/v1/country-payout-providers/${id}/`);


export const getBookingDetailsApi= (id) => commonAPI('get', `/api/v1/bookings/${id}/`);
export const createBookingApi= (id,data)=>commonAPI('post',`/api/v1/bookings/${id}/create/`,data) 
export const ConfirmOrRejectBookingApi = (id,data) => commonAPI("put", `/api/v1/bookings/${id}/status/`,data);

export const CompleteBookingApi = (id) => commonAPI("patch", `/api/v1/bookings/${id}/complete/`);
export const CancelBookingApi = (id, data) => commonAPI("patch", `/api/v1/bookings/${id}/cancel/`, data);
// /api/v1/owner/bookings/ 
export const getOwnerBookingsApi= () => commonAPI('get', `/api/v1/owner/bookings/`);


export const getPayoutAccountApi= () => commonAPI('get', `/api/v1/payout-accounts/`);
export const addPayoutAccountApi= (data) => commonAPI('post', `/api/v1/payout-accounts/`, data);

// /api/v1/payments/create/
export const createPaymentApi= (data)=>commonAPI('post',`/api/v1/payments/create/`, data);
export const getPropertyBasedBookingApi= (propId)=> commonAPI('get',`/api/v1/bookings/my/property/${propId}`)

// verify_passport


// Admin_update_status

// list_permissions

// list_groups
// https://rental-homes-france.onrender.com/api/v1/admin/auth/groups/
export const getAllGroupsApi= () => commonAPI('get', `/api/v1/admin/auth/groups/`);
export const createGroupsApi= (data)=>commonAPI('post',`/api/v1/admin/auth/groups/create/`, data);
export const getGroupDetailsApi= (id) => commonAPI('get', `/api/v1/admin/auth/groups/${id}/`);
export const updateGroupApi = (id, data) => commonAPI("patch", `/api/v1/admin/auth/groups/${id}/update/`, data);
export const deleteGroupApi = (id) => commonAPI("delete", `/api/v1/admin/auth/groups/${id}/delete/`);



// ===========================================

// Complete Bookings
// My bookings
// create bookings
// booking detail
// cancel bookings
// confirm/reject booking
// all booking
// list bookings by owner

// Payment history
// create payment
// razorpay webhook
// download invoice
// create country payout provider
// add payout account
// payment create
// paypal order
