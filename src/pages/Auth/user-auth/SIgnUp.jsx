import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../../hooks/auth/useSignup";

const SignUp = () => {
  const stepperRef = useRef(null);
  const navigate = useNavigate();
  const { createAccount, verifyOtp, resendOtp, loading, error } = useSignup();

  const OTP_LENGTH = 6;
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: false,
  });

  // ---------------- FORM ----------------
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    await createAccount({
      name: form.full_name,
      email: form.email,
      password: form.password,
      confirm_password: form.confirm_password,
      privacy_policy: form.terms,
    });

    stepperRef.current.nextCallback();
  };

  // ---------------- OTP HANDLERS ----------------
  const handleOtpChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");
    if (!digit) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
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

  const handleVerifyOtp = async () => {
    await verifyOtp({
      email: form.email,
      otp: otp.join(""),
    });

    navigate("/signin");
  };

  // ---------------- OTP RESEND TIMER ----------------
  const [counter, setCounter] = useState(60);
  const [disableResend, setDisableResend] = useState(true);

  useEffect(() => {
    if (counter === 0) {
      setDisableResend(false);
      return;
    }
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = async () => {
    await resendOtp(form.email);
    setCounter(60);
    setDisableResend(true);
  };

  // ---------------- UI ----------------
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute top-0 right-5">
        <BacktoHome />
      </div>

      <div className="w-full max-w-5xl mx-auto flex bg-white">
        {/* LEFT */}
        <div className="hidden md:flex w-1/2 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg"
            className="w-full h-full object-cover"
            alt="housing"
          />
        </div>

        {/* RIGHT */}
        <div className="flex-1 px-6">
          <Stepper ref={stepperRef}>
            {/* SIGNUP STEP */}
            <StepperPanel header="Signup">
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <input
                  name="full_name"
                  placeholder="Full name"
                  value={form.full_name}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirm_password}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />

                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleFormChange}
                  />
                  Agree to terms
                </label>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded"
                >
                  {loading ? "Creating..." : "Create account"}
                </button>

                <button
                  type="button"
                  className="w-full border py-2 rounded flex justify-center gap-2"
                >
                  <FcGoogle /> Google
                </button>
              </form>
            </StepperPanel>

            {/* OTP STEP */}
            <StepperPanel header="OTP">
              <div className="flex gap-3 justify-center mt-4">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={val}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    maxLength={1}
                    className="w-12 h-12 text-center border rounded"
                  />
                ))}
              </div>

              <Button
                label="Verify OTP"
                className="mt-6 w-full bg-black"
                disabled={otp.join("").length !== OTP_LENGTH}
                onClick={handleVerifyOtp}
              />

              <button
                disabled={disableResend}
                onClick={handleResend}
                className="mt-3 text-sm"
              >
                Resend OTP {disableResend && `(${counter}s)`}
              </button>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
