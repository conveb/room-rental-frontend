import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/user-auth/Signin";
import SignUp from "./pages/Auth/user-auth/SIgnUp";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/Auth/user-auth/Forgot-password";
import Layouts from "./components/Layouts/Layouts";
import Home from "./pages/public/Home";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import Accommodation from "./pages/public/accommodation/Accommodation";
import AccommodationDetails from "./pages/public/accommodation/AccommodationDetails";
import SplashScreen from "./components/SplashScreen";
import { useSplash } from "./hooks/useSplash";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";

import PaymentPage from "./pages/public/accommodation/PaymentPage";
import ConfirmationPage from "./pages/public/accommodation/ConfirmationPage";
import UserProfilePage from "./pages/users/account/UserAccount";
import Layout from "./pages/landlord/account/Layout";
import Stats from "./pages/landlord/account/stats";

import UserAccount from "./pages/users/account/UserAccount";
import UserLayout from "./pages/users/account/UserLayout";
import UserBookings from "./pages/users/account/UserBookings";
import UserSupport from "./pages/users/account/UserSupport";
import UserSaved from "./pages/users/account/UserSaved";
import WorkingOnIt from "./pages/public/WorkingOnIt";
import NotificationPage from "./pages/public/NotificationPage";
import CreateProperty from "./pages/landlord/account/CreateProperty";
import { AdminRoute } from "./components/routes/AdminRoute";
import PageNotFound from "./pages/public/PageNotFound";
import AdminAddProperty from "./pages/admin/AdminAddProperty";
import UserPayments from "./pages/users/account/UserPayments";
import UserFeedback from "./pages/users/account/UserFeedback";
import UserComplaints from "./pages/users/account/UserComplaints";
import UserReportLandowner from "./pages/users/account/UserReportLandowner";
import UserReportProperty from "./pages/users/account/UserReportProperty";
import { AddCountries } from "./pages/admin/containers/AddCountry";
import { AddLocations } from "./pages/admin/containers/AddLocations";
import { AddAmenities } from "./pages/admin/containers/AddAmenities";
import AdminAudits from "./pages/admin/AdminAudits";
import AdminMyProperty from "./pages/admin/containers/AdminMyProperty";
import AdminReportsAndComplaints from "./pages/admin/AdminReportsAndComplaints";
import AdminSupportAndFeedback from "./pages/admin/AdminSupportAndFeedback";
import AdminManageConstants from "./pages/admin/AdminManageConstants";
import ViewBookings from "./pages/admin/containers/ViewBookings";
import LandownerDashboard from "./pages/landlord/account/RoomownerDashboard";
import RoomOwnerAccount from "./pages/landlord/account/RoomOwnerAccount";
import RoomOwnerSupport from "./pages/landlord/account/RoomOwnerSupport";
import { useState } from "react";
import AboutPage from "./pages/public/About";
import ListYourRoom from "./pages/public/ListYourRoom";
import Contact from "./pages/public/Contact";
import BlockedPage from "./pages/public/BlockedPage";
import StudentFullDetails from "./pages/admin/containers/StudentFullDetails";
import RoomownerFullDetails from "./pages/admin/containers/RoomownerFullDetails";
import EditPropertyPage from "./pages/admin/containers/EditPropertyPage";
import { PayoutSettings } from "./pages/constants/PayoutSettings";
import PayoutPage from "./pages/landlord/PayoutSettings";
import OwnerBookings from "./pages/landlord/OwnerBookings";
import BookingDetails from "./pages/admin/containers/BookingDetails";
import AdminGroupsAndPermissions from "./pages/admin/AdminGroupsAndPermissions";
import PrivateRoute from "./components/routes/PrivateRoute";
import { LandOwnerRoute } from "./components/routes/LandOwnerRoute";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}

      <Toaster position="top-center" />
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/list-room" element={<ListYourRoom />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="/workingonit" element={<WorkingOnIt />} />
          <Route path="/student/1" element={<UserProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accommodation" element={<Accommodation baseRoute="/" />} />
          <Route path="/accommodation-details/:id" element={<AccommodationDetails />} />
          <Route path="/account-suspended" element={<BlockedPage />} />
        </Route>

        <Route element={<AdminRoute />}> 
          <Route path="/auth/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminStudents />} />
            <Route path="audits" element={<AdminAudits />} />
            <Route path="view_bookings" element={<ViewBookings />} />
            <Route path="manage_constants" element={<AdminManageConstants />} />
            <Route path="notifications" element={<NotificationPage />} />
            {/* <Route path="requests" element={<AdminRequests />} /> */}
            {/* <Route path="admin_properties" element={<AdminMyProperty />} /> */}
            <Route path="property/add_property" element={<AdminAddProperty roleUrl='admin' />} />
            <Route path="property/my-property/edit-property/:id" element={<EditPropertyPage />} />
            <Route path="property/add_country" element={<AddCountries />} />
            <Route path="property/add_location" element={<AddLocations />} />
            <Route path="property/add_amenities" element={<AddAmenities />} />
            <Route path="groups&permissions" element={<AdminGroupsAndPermissions />} />
            <Route path="bookings/booking-details/:id" element={<BookingDetails />} />
            <Route path="reports&complaints" element={<AdminReportsAndComplaints />} />
            <Route path="support&feedback" element={<AdminSupportAndFeedback />} />
            <Route path="payment-providers" element={<PayoutSettings />} />
            <Route path="student/:id" element={<StudentFullDetails />} />
            <Route path="roomowner/:id" element={<RoomownerFullDetails />} />
          </Route>
        </Route>

        <Route element={<LandOwnerRoute />}>
          <Route path="/auth/landowner" element={<Layout />}>
            <Route index element={<LandownerDashboard />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="support" element={<RoomOwnerSupport />} />
            {/* <Route path="properties" element={<PropertiesList />} /> */}
            <Route path="stats" element={<Stats />} />
            <Route path="account" element={<RoomOwnerAccount />} />
            <Route path="create_property" element={<CreateProperty roleUrl='admin' />} />
            <Route path="property/my-property/edit-property" element={<EditPropertyPage />} />
            <Route path="payout-account" element={<PayoutPage />} />
            <Route path="bookings" element={<OwnerBookings />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/auth/user" element={<UserLayout />}>
            <Route index path="accommodation" element={<Accommodation baseRoute="/auth/user/" />} />
            <Route path="/auth/user/accommodation-details/:id" element={<AccommodationDetails />} />
            <Route path="account" element={<UserAccount />} />
            <Route path="feedbacks" element={<UserFeedback />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="payments" element={<UserPayments />} />
            <Route path="saved" element={<UserSaved />} />
            <Route path="support" element={<UserSupport />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="complaints" element={<UserComplaints />} />
            <Route path="send_feedback" element={<UserFeedback />} />
            <Route path="report_landowner" element={<UserReportLandowner />} />
            <Route path="report_property" element={<UserReportProperty />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
            <Route path="notifications" element={<NotificationPage />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}



export default App;
