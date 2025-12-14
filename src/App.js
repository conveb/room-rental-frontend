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
import StudentProfile from "./pages/student/account/studentProfile";

function App() {
  const showSplash = useSplash(1800);

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen />}

      <Routes>
        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminStudents />} />
        <Route path="student/:id" element={<StudentProfile />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
