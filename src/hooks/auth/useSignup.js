import { useState } from "react";
import { signupAPI, verifyOtpAPI, resendOtpAPI } from "../../services/allAPI";
import {useNavigate} from "react-router-dom";
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // STEP 1 — CREATE ACCOUNT
  const createAccount = async (payload) => {
    setError("");
    try {
      setLoading(true);
      const res = await signupAPI(payload);
      return res;
    } catch (err) {
      setError(
        err?.response?.data?.email ||
        err?.response?.data?.detail ||
        "Signup failed"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP
  const verifyOtp = async (payload) => {
    setError("");
    try {
      setLoading(true);
      const res = await verifyOtpAPI(payload);
      navigate("/signin");
      return res;
    } catch {
      setError("Invalid OTP");
      throw new Error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 — RESEND OTP
  const resendOtp = async (email) => {
    await resendOtpAPI({ email });
  };

  return {
    createAccount,
    verifyOtp,
    resendOtp,
    loading,
    error,
  };
};
