import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/user-auth/Signin";
import SignUp from "./pages/Auth/user-auth/SIgnUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/Auth/user-auth/Forgot-password";
import Accommodation from "./pages/user/Accommodation";
import Layouts from "./components/btns/Layouts/Layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accommodation" element={<Accommodation />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
