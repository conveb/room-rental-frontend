import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../../hooks/auth/useSignup";
import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
import BacktoHome from "../../../components/btns/BacktoHome";

const OTP_LENGTH = 6;

const SignUp = () => {
  const stepperRef = useRef(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { sendOtp, verifyOtp, resendOtp, loading, error } =
    useEmailVerification();

  const {
    register,
    loading: registerLoading,
    error: registerError,
  } = useSignup();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [counter, setCounter] = useState(60);
  const [disableResend, setDisableResend] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    privacy_policy: false,
    account_type: "STUDENT",
  });

  /* ---------------- FORM CHANGE ---------------- */
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* ---------------- SEND OTP ---------------- */
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await sendOtp({
        email: form.email,
        purpose: "ONBOARDING",
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

  /* ---------------- VERIFY + REGISTER ---------------- */
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({
        email: form.email,
        otp: otp.join(""),
        purpose: "ONBOARDING",
      });

      if (!form.privacy_policy)
        throw new Error("Privacy policy required");

      if (form.password !== form.confirm_password)
        throw new Error("Passwords do not match");

      const payload = {
        email: form.email,
        full_name: form.full_name,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirm_password,
        privacy_policy: form.privacy_policy,
        role: form.account_type,
      };

      await register(payload);
      navigate("/signin");
    } catch (err) {
      console.error(err?.message);
    }
  };

  /* ---------------- RESEND OTP TIMER ---------------- */
  useEffect(() => {
    if (counter === 0) {
      setDisableResend(false);
      return;
    }
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = async () => {
    await resendOtp({ email: form.email, purpose: "ONBOARDING" });
    setCounter(60);
    setDisableResend(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 py-10">
       <div className="absolute top-4 right-5">
              <BacktoHome />
            </div>
      {/* Header */}
      <div className="w-full max-w-md text-center ">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Use your information to get started
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md p-2 sm:p-8">
        <Stepper ref={stepperRef}>
          {/* STEP 1 */}
          <StepperPanel header="Details">
            <div className="space-y-4 mt-4">
              {/* Account Type */}
              <div className="flex border-b border-gray-200">
                {["STUDENT", "LANDOWNER"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                      form.account_type === type
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                    onClick={() =>
                      setForm({ ...form, account_type: type })
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                name="full_name"
                placeholder="Full name"
                value={form.full_name}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm password"
                  value={form.confirm_password}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  name="privacy_policy"
                  checked={form.privacy_policy}
                  onChange={handleFormChange}
                  className="mt-1"
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>

              {(error || registerError) && (
                <p className="text-xs text-red-600">
                  {error || registerError}
                </p>
              )}

              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium disabled:bg-gray-300"
              >
                {loading ? "Sending OTP..." : "Next"}
              </button>
            </div>
          </StepperPanel>

          {/* STEP 2 */}
          <StepperPanel header="Verify">
            <div className="mt-6">
              <p className="text-sm text-gray-700 mb-6">
                Enter the 6-digit code sent to your email
              </p>

              <div className="flex justify-between gap-2 mb-8">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={v}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-12 h-12 text-center border rounded-md text-lg focus:ring-1 focus:ring-blue-600"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  disabled={disableResend}
                  onClick={handleResend}
                  className="text-sm text-blue-600 disabled:text-gray-400"
                >
                  Resend {disableResend && `(${counter}s)`}
                </button>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join("").length !== 6 || registerLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm disabled:bg-gray-300"
                >
                  Verify
                </button>
              </div>
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default SignUp;
