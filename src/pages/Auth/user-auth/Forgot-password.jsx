import React, { useEffect, useRef, useState } from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
import { useForgotPassword } from "../../../hooks/auth/useForgotPassword";

const OTP_LENGTH = 6;

const ForgotPassword = () => {
  const stepperRef = useRef(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { sendOtp, verifyOtp, resendOtp, loading, error } =
    useEmailVerification();

  const {
    forgotPassword,
    loading: resetLoading,
    error: resetError,
  } = useForgotPassword();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [counter, setCounter] = useState(60);
  const [disableResend, setDisableResend] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendOtp({
        email,
        purpose: "RESET",
      });
      stepperRef.current.nextCallback();
    } catch {}
  };

  /* ---------------- OTP INPUT ---------------- */
  const handleOtpChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({
        email,
        otp: otp.join(""),
        purpose: "RESET",
      });
      stepperRef.current.nextCallback();
    } catch {}
  };

  /* ---------------- RESET PASSWORD ---------------- */
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email,
      password,
      confirm_password: confirmPassword,
    };

    try {
      await forgotPassword(payload);
      navigate("/signin");
    } catch {}
  };

  /* ---------------- RESEND TIMER ---------------- */
  useEffect(() => {
    if (counter === 0) {
      setDisableResend(false);
      return;
    }
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = async () => {
    await resendOtp({ email, purpose: "RESET" });
    setCounter(60);
    setDisableResend(true);
  };

  return (
    <div className="relative min-h-dvh bg-gray-50 flex items-center justify-center px-4 md:px-20">
      {/* Back Button */}
      <div className="absolute top-5 right-5">
        <BacktoHome />
      </div>

      {/* Card */}
      <div className="w-full max-w-md p-8 md:p-12 bg-white rounded-xl">
        <Stepper ref={stepperRef}>

          {/* STEP 1 - EMAIL */}
          <StepperPanel header="Email">
            <h1 className="text-3xl font-semibold mb-4">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Enter your email to receive a verification code.
            </p>

            <input
              type="email"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />

            {error && (
              <p className="text-xs text-red-600 mt-2">{error}</p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full mt-6 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </StepperPanel>

          {/* STEP 2 - OTP */}
          <StepperPanel header="Verify">
            <p className="text-sm mb-6">
              Enter the 6-digit code sent to your email.
            </p>

            <div className="flex justify-between gap-2 mb-6">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={v}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-12 h-12 text-center border rounded-md text-lg focus:ring-1 focus:ring-black"
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                disabled={disableResend}
                onClick={handleResend}
                className="text-sm text-gray-600 disabled:text-gray-400"
              >
                Resend {disableResend && `(${counter}s)`}
              </button>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.join("").length !== 6}
                className="bg-black text-white px-6 py-2 rounded-lg text-sm disabled:bg-gray-400"
              >
                Verify
              </button>
            </div>
          </StepperPanel>

          {/* STEP 3 - RESET PASSWORD */}
          <StepperPanel header="Reset">
            <div className="space-y-4 mt-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              {resetError && (
                <p className="text-xs text-red-600">{resetError}</p>
              )}

              <button
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="w-full bg-black text-white py-2.5 rounded-lg disabled:bg-gray-400"
              >
                {resetLoading ? "Updating..." : "Reset Password"}
              </button>
            </div>
          </StepperPanel>

        </Stepper>
      </div>
    </div>
  );
};

export default ForgotPassword;
