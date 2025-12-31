import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BacktoHome from "../../../components/btns/BacktoHome";
import { useSignup } from "../../../hooks/auth/useSignup";

const OTP_LENGTH = 6;

const SignUp = () => {
  const stepperRef = useRef(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { sendOtp, verifyOtp, register, resendOtp, loading, error } =
    useSignup();

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

      console.log("REGISTER PAYLOAD", payload);

      await register(payload);

      navigate("/signin");
    } catch (err) {
      console.error(err?.message);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <BacktoHome />

      <div className="w-full max-w-4xl p-6">
        <Stepper ref={stepperRef}>
          {/* STEP 1 */}
          <StepperPanel header="Create Account">
            <div className="space-y-3">
              <div className="flex gap-2">
                {["STUDENT", "LANDOWNER"].map((type) => (
                  <button
                    key={type}
                    className={`w-full py-2 rounded-xl ${
                      form.account_type === type
                        ? "bg-black text-white"
                        : "border"
                    }`}
                    onClick={() =>
                      setForm({ ...form, account_type: type })
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleFormChange} className="input" />
              <input name="email" placeholder="Email" value={form.email} onChange={handleFormChange} className="input" />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleFormChange} className="input" />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="input"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="eye">
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={form.confirm_password}
                  onChange={handleFormChange}
                  className="input"
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye">
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>

              <label className="flex gap-2 text-sm">
                <input type="checkbox" name="privacy_policy" checked={form.privacy_policy} onChange={handleFormChange} />
                Accept Privacy Policy
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button onClick={handleCreateAccount} disabled={loading} className="btn">
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </div>
          </StepperPanel>

          {/* STEP 2 */}
          <StepperPanel header="Verify OTP">
            <div className="flex gap-2 justify-center mt-4">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={v}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-12 h-12 border text-center"
                />
              ))}
            </div>

            <Button
              label="Verify & Register"
              className="mt-4 w-full"
              disabled={otp.join("").length !== OTP_LENGTH}
              onClick={handleVerifyOtp}
            />

            <button disabled={disableResend} onClick={handleResend} className="text-sm mt-2">
              Resend OTP {disableResend && `(${counter}s)`}
            </button>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default SignUp;
