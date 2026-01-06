import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/user-auth/Signin";
import SignUp from "./pages/Auth/user-auth/SIgnUp";

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
import Dashboard from "./pages/landlord/account/Dashboard";
import Layout from "./pages/landlord/account/Layout";
import PropertiesList from "./pages/landlord/account/Properties";
import Stats from "./pages/landlord/account/stats";
import Account from "./pages/landlord/account/Account";

import UserAccount from "./pages/users/account/UserAccount";
import UserLayout from "./pages/users/account/UserLayout";
import UserBookings from "./pages/users/account/UserBookings";
import UserSupport from "./pages/users/account/UserSupport";
import UserSaved from "./pages/users/account/UserSaved";
import WorkingOnIt from "./pages/public/WorkingOnIt";
import NotificationPage from "./pages/public/NotificationPage";
import CreateProperty from "./pages/landlord/account/CreateProperty";
// import { AdminRoute } from "./components/routes/AdminRoute";
import PageNotFound from "./pages/public/PageNotFound";
import { LandOwnerRoute } from "./components/routes/LandOwnerRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminAddProperty from "./pages/admin/AdminAddProperty";
import AdminReports from "./pages/admin/AdminReports";
import AdminRequests from "./pages/admin/requests/AdminRequests";
import UserPayments from "./pages/users/account/UserPayments";
import UserFeedback from "./pages/users/account/UserFeedback";
import UserComplaints from "./pages/users/account/UserComplaints";
import UserReportLandowner from "./pages/users/account/UserReportLandowner";
import UserReportProperty from "./pages/users/account/UserReportProperty";
import { AddCountries } from "./pages/admin/containers/AddCountry";
import { AddLocations } from "./pages/admin/containers/AddLocations";
import { AddAmenities } from "./pages/admin/containers/AddAmenities";
import AddProperty from "./pages/admin/AdminAddProperty";
import AdminAudits from "./pages/admin/AdminAudits";
import AdminMyProperty from "./pages/admin/containers/AdminMyProperty";

function App() {
  const showSplash = useSplash(1800);

  return (
    <>
      {showSplash && <SplashScreen />}

      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="/workingonit" element={<WorkingOnIt />} />
          <Route path="/student/1" element={<UserProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        </Route>

        {/* <Route element={<AdminRoute />}> */}
        {/* </Route> */}
        <Route path="/auth/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminStudents />} />
          <Route path="audits" element={<AdminAudits />} />
          {/* <Route path="requests" element={<AdminRequests />} /> */}
          <Route path="admin_properties" element={<AdminMyProperty />} />
          <Route path="property/add_property" element={<AdminAddProperty />} />
          <Route path="property/add_country" element={<AddCountries />} />
          <Route path="property/add_location" element={<AddLocations />} />
          <Route path="property/add_amenities" element={<AddAmenities />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route element={<LandOwnerRoute />}>
          <Route path="/auth/landowner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertiesList />} />
            <Route path="stats" element={<Stats />} />
            <Route path="account" element={<Account />} />
            <Route path="create" element={<CreateProperty />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/auth/user" element={<UserLayout />}>
            <Route index path="home" element={<Accommodation />} />
            <Route path="account" element={<UserAccount />} />
            <Route path="feedbacks" element={<UserFeedback />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="payments" element={<UserPayments />} />
            <Route path="saved" element={<UserSaved />} />
            <Route path="support" element={<UserSupport />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="complaints" element={<UserComplaints />} />
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
