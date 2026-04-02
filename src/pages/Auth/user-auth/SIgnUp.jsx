import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../../hooks/auth/useSignup";
import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
import BacktoHome from "../../../components/btns/BacktoHome";
import { toast } from "sonner";
import { validateEmail, validateFullName, validatePassword } from "../../../utils/authValidation";

import SignupImg from "../../../Assets/Images/signup.jpg";
import Logo from "../../../Assets/pngs/logo-white.png";

const OTP_LENGTH = 6;

const SignUp = () => {
  const stepperRef = useRef(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [errors, setErrors] = useState({});

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
    // 1. Run Validations
    const newErrors = {
      full_name: validateFullName(form.full_name),
      email: validateEmail(form.email),
      password: validatePassword(form.password, form.confirm_password),
    };

    setErrors(newErrors);

    // 2. Check if any errors exist
    if (Object.values(newErrors).some(error => error !== null)) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    if (!form.privacy_policy) {
      toast.error("You must accept the privacy policy.");
      return;
    }
    try {
      await sendOtp({
        email: form.email,
        purpose: "ONBOARDING",
      });
      toast.success("We've sent an OTP to your email! Please check and enter it below.");

      setIsTimerActive(true);
      setCounter(60);
      setDisableResend(true);

      stepperRef.current.nextCallback();
    } catch (e) {
      console.error("Error sending OTP:", e);
      toast.error(e?.message || "Failed to send OTP. Please try again.");
    }
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

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    data.split("").forEach((char, index) => {
      if (index < OTP_LENGTH) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(data.length, OTP_LENGTH - 1);
    inputsRef.current[lastIndex]?.focus();
  };

  /* ---------------- VERIFY + REGISTER ---------------- */
  const handleVerifyOtp = async () => {
    if (!form.full_name || !form.email || !form.privacy_policy) {
      toast.error("Please complete the registration details first.");
      stepperRef.current.prevCallback();
      return;
    }
    try {
      await verifyOtp({
        email: form.email,
        otp: otp.join(""),
        purpose: "ONBOARDING",
      });
      toast.success("OTP verified successfully! Creating your account...");

      if (!form.privacy_policy)
        throw new Error("Privacy policy required");

      if (form.password !== form.confirm_password)
        throw new Error("Passwords do not match");

      const payload = {
        email: form.email,
        full_name: form.full_name,
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
    let timer;
    if (isTimerActive && counter > 0) {
      // Set to 1000ms for a real-time second countdown
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setDisableResend(false);
      setIsTimerActive(false); // Stop the timer once it hits zero
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isTimerActive, counter]);

  const handleResend = async () => {
    await resendOtp({ email: form.email, purpose: "ONBOARDING" });
    toast.success("OTP resent successfully , check you email!");
    setCounter(60);
    setDisableResend(true);
    setIsTimerActive(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 py-10 h-full">
      <div className="absolute top-4 right-5">
        <BacktoHome />
      </div>

      <div className="w-full h-[600px] max-w-5xl mx-auto flex  overflow-hidden md:bg-stone-100 md:p-2 md:rounded-[2rem]">
        {/* LEFT PANEL */}
        <div className="hidden relative w-full md:flex  items-center justify-center rounded-l-3xl"
          style={{ backgroundImage: `url(${SignupImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute bottom-0 left-0  flex flex-col  text-white p-3 rounded-bl-3xl bg-gradient-to-t from-black via-black/80 to-transparent p-5">
            <h2 className="text-2xl mb-2">Get Started</h2>
            <p className="text-sm">
             Join Alive Paris to browse our full list of student residences, manage your bookings, and secure your housing in the city.
            </p>
          </div>
          <div className="absolute top-5 left-5">
            <img src={Logo} alt="logo" className="w-7" />
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-md p-2 sm:p-8 bg-white rounded-r-3xl flex flex-col items-center justify-center">
          {/* Header */}
          <div className="w-full max-w-md text-center mb-5">
            <h1 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Use your information to get started
            </p>
          </div>
          <Stepper ref={stepperRef} linear>
            {/* STEP 1 */}
            <StepperPanel header="Details">
              <div className="space-y-4 mt-4">
                <div>
                  <input
                    name="full_name"
                    placeholder="Full name"
                    value={form.full_name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.full_name && <p className="text-[10px] text-red-500 ml-1">{errors.full_name}</p>}
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 ml-1">{errors.email}</p>}
                </div>

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
                  {errors.password && <p className="text-[10px] text-red-500 ml-1">{errors.password}</p>}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                  {errors.confirm_password && <p className="text-[10px] text-red-500 ml-1">{errors.confirm_password}</p>}
                </div>

                <label className={`flex items-center gap-2 text-xs transition-colors ${!form.privacy_policy ? 'text-red-500' : 'text-gray-600'}`}>
                  <input
                    type="checkbox"
                    name="privacy_policy"
                    checked={form.privacy_policy}
                    onChange={handleFormChange}
                    className="mt-1"
                  />
                  <span >
                    I agree to the Terms of Service and  <Link to="/privacy-policy" className="text-red-500 font-bold underline">Privacy Policy</Link> *
                  </span>
                </label>

                {(error || registerError) && (
                  <p className="text-xs text-red-600">
                    {error || registerError}
                  </p>
                )}

                <button
                  onClick={handleCreateAccount}
                  disabled={loading || !form.privacy_policy}
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Sending OTP..." : "Next"}
                </button>
                <p className="mt-6 text-xs text-gray-500 text-center">
                  Already have an account?{" "}
                  <Link to="/signin" className="font-semibold text-gray-900 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </StepperPanel>

            {/* STEP 2 */}
            <StepperPanel header="Verify">
              <div className="mt-6">
                <p className="text-sm text-gray-700 mb-6">
                  Enter the 6-digit code sent to your email
                </p>

                {/* OTP Input Section */}
                <div className="flex justify-between gap-1 sm:gap-2 mb-8">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el)}
                      value={v}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      onPaste={handlePaste}
                      className="w-full max-w-[3rem] aspect-square text-center border rounded-md text-lg sm:text-xl font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
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
    </div>
  );
};

export default SignUp;