import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/user-auth/Signin";
import SignUp from "./pages/Auth/user-auth/SIgnUp";

import ForgotPassword from "./pages/Auth/user-auth/Forgot-password";
import Layouts from "./components/btns/Layouts/Layouts";
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
import UserDashboard from "./pages/users/account/UserDashboard";
import UserBookings from "./pages/users/account/UserBookings";
import UserSupport from "./pages/users/account/UserSupport";
import UserSaved from "./pages/users/account/UserSaved";
import WorkingOnIt from "./pages/public/WorkingOnIt";
import NotificationPage from "./pages/public/NotificationPage";

function App() {
  const showSplash = useSplash(1800);

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen />}

      <Routes>
        <Route element={<Layouts />}>
        {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/workingonit" element={<WorkingOnIt />} />
          <Route path="/student/1" element={<UserProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminStudents />} />
        </Route>

        {/* Landowner */}
        <Route path="/landowner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertiesList />} />
          <Route path="stats" element={<Stats />} />
          <Route path="account" element={<Account />} />
        </Route>

         <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="saved" element={<UserSaved />} />
          <Route path="support" element={<UserSupport />} />
 
        </Route>

      </Routes>
    </BrowserRouter>
  );
}



export default App;
