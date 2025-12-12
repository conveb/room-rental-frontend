import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/user-auth/Signin";
import SignUp from "./pages/Auth/user-auth/SIgnUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/Auth/user-auth/Forgot-password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
