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
    const timer = setTimeout(() => setCounter(counter - 1), 5000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = async () => {
    await resendOtp({ email, purpose: "RESET" });
    setCounter(60);
    setDisableResend(true);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-6 md:px-20">
  {/* Back Button - Positioned more carefully for mobile */}
  <div className="absolute top-4 right-4 z-10">
    <BacktoHome />
  </div>

  {/* Card - Max width adjusts for a better feel on tablet vs mobile */}
  <div className="w-full max-w-[440px] p-3 sm:p-8 md:p-10 bg-white rounded-2xl shadow-sm border border-gray-100 ">
    <Stepper ref={stepperRef} linear>

      {/* STEP 1 - EMAIL */}
      <StepperPanel header="Email" >
        <div className="pt-2">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-tight text-gray-900">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Enter your email to receive a verification code.
          </p>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />

          {error && (
            <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>
          )}

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full mt-6 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </div>
      </StepperPanel>

      {/* STEP 2 - OTP */}
      <StepperPanel header="Verify">
        <div className="pt-2">
          <p className="text-sm text-gray-600 mb-6">
            Enter the 6-digit code sent to your email.
          </p>

          {/* OTP Grid - Adjusted gap and sizing for small screens */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-8">
            {otp.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={v}
                maxLength={1}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                className="w-full aspect-square text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-black focus:border-black outline-none bg-gray-50 transition-all"
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              disabled={disableResend}
              onClick={handleResend}
              className="text-sm font-medium text-gray-600 hover:text-black disabled:text-gray-400 transition-colors order-2 sm:order-1"
            >
              Resend {disableResend && `(${counter}s)`}
            </button>

            <button
              onClick={handleVerifyOtp}
              disabled={otp.join("").length !== 6}
              className="w-full sm:w-auto bg-black text-white px-8 py-2.5 rounded-lg text-sm font-medium disabled:bg-gray-400 order-1 sm:order-2"
            >
              Verify
            </button>
          </div>
        </div>
      </StepperPanel>

      {/* STEP 3 - RESET PASSWORD */}
      <StepperPanel header="Reset">
        <div className="space-y-4 mt-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          </div>

          {resetError && (
            <p className="text-xs text-red-600 font-medium">{resetError}</p>
          )}

          <button
            onClick={handleResetPassword}
            disabled={resetLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm transition-colors hover:bg-gray-800 disabled:bg-gray-400 mt-2"
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
