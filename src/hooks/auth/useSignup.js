import { useState } from "react";
import {
  sendOtpAPI,
  verifyOtpAPI,
  signupAPI,
  resendOtpAPI,
} from "../../services/allAPI";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP 1 — SEND OTP
  const sendOtp = async (email) => {
    setError("");
    try {
      setLoading(true);
      const res = await sendOtpAPI({
        email,
        purpose: "ONBOARDING",
      });
      return res;
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to send OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP
  const verifyOtp = async ({ email, otp }) => {
    setError("");
    try {
      setLoading(true);
      const res = await verifyOtpAPI({
        email,
        otp,
        purpose: "ONBOARDING",
      });
      console.log("OTP VERIFIED:", res.data);
      return res;
    } catch (err) {
      setError("Invalid OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 — REGISTER USER
  const register = async (payload) => {
    setError("");
    try {
      setLoading(true);
      const res = await signupAPI(payload);
      return res;
    } catch (err) {
      const data = err?.response?.data;

      let message = "Registration failed";
      if (Array.isArray(data?.email)) message = data.email[0];
      else if (data?.detail) message = data.detail;

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const resendOtp = async (email) => {
    return await resendOtpAPI({
      email,
      purpose: "ONBOARDING",
    });
  };

  return {
    sendOtp,
    verifyOtp,
    register,
    resendOtp,
    loading,
    error,
  };
};
