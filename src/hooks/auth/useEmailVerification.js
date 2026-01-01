import { useState } from "react";
import {
  sendOtpAPI,
  verifyOtpAPI,
  resendOtpAPI,
} from "../../services/allAPI";

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // SEND OTP
  const sendOtp = async ({ email, purpose }) => {
    setError("");
    try {
      setLoading(true);
      const res = await sendOtpAPI({ email, purpose });
      console.log(res.data.message);
      return res;
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to send OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyOtp = async (payload) => {
    setError("");
    try {
      setLoading(true);
      const res = await verifyOtpAPI(payload);
      console.log("OTP VERIFIED:", res.data);
      return res;
    } catch (err) {
      setError("Invalid OTP");
      console.error(err?.response?.data || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const resendOtp = async ({ email, purpose }) => {
    try {
      const res = await resendOtpAPI({ email, purpose });
      console.log(res.data.message);
      return res;
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to resend OTP");
      throw err;
    }
  };


  return {
    sendOtp,
    verifyOtp,
    resendOtp,
    loading,
    error,
  };
};
