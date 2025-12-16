// SignUp.jsx
import React, { useEffect, useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { InputOtp } from 'primereact/inputotp';
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const stepperRef = useRef(null);
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");
    if (!digit) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < OTP_LENGTH) newOtp.push("");
    setOtp(newOtp);

    inputsRef.current[pasted.length - 1]?.focus();
  };
  const handleSendOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === OTP_LENGTH) {
      // You can call your API here to verify OTP
      navigate('/');
    }
  };
  // ===============================================================


  // create account function ================================================
  const handleCreateAccount = () => {
    stepperRef.current.nextCallback();
  }
  // ===============================================================


  // otp countdown ================================================
 const [counter, setCounter] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (counter === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = () => {
    console.log("Resending OTP...");
    // Call your API to resend OTP here
    setCounter(60); // reset counter
    setIsResendDisabled(true);
  };
  // ===============================================================
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute top-0 right-5">
        <BacktoHome />
      </div>
      <div className="w-full max-w-5xl mx-auto flex bg-white">
        {/* Left panel */}
        <div className="hidden md:flex w-1/2 flex-col rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-full">
            <img
              src="https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Student housing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-6 left-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-xl bg-white/90 flex items-center justify-center">
                <span className="text-sm font-semibold">🏠</span>
              </div>
              <span className="text-white font-semibold text-sm">
                Alive Paris
              </span>
            </div>

            <div className="absolute bottom-10 left-8 right-8">
              <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug">
                Create your free student housing account.
              </h2>
              <p className="mt-3 text-sm text-gray-200 max-w-xs">
                Save your favourite rooms, compare prices, and book your next
                home near campus in a few clicks.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}






        <div className="card flex justify-content-center px-3 md:px-10 ">
          <Stepper ref={stepperRef} style={{ flexBasis: '40rem'  }} >
            <StepperPanel header="Signup">
              <div className="w-full  flex items-center justify-center">
                <div className="w-full px-0 md:px-6 ">
                  <div className="my-2 md:my-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Sign up</h1>
                    <p className="mt-1 text-xs md:text-sm text-gray-500">
                      Join CampusRooms to discover verified student rooms and secure
                      your stay before the semester starts.
                    </p>
                  </div>

                  <form className="space-y-4 mt-5" onSubmit={()=>handleCreateAccount()}>
                    <div className="flex  gap-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Alex"
                          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Sharma"
                          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>


                    <div className="flex flex-col gap-2">

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder="Re-enter your password"
                          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                        />
                      </div>

                    </div>
                    <div className="flex items-start space-x-2">
                      <input
                        id="terms"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-gray-600 select-none"
                      >
                        I agree to the Terms of Service and Privacy Policy for booking
                        student rooms.
                      </label>
                    </div>

                    <button
                      type="submit"
                      
                      className="w-full mt-2 inline-flex justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
                    >
                      Create account
                    </button>
                  </form>

                  <div className="mt-4 flex items-center">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="px-3 text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="mt-4  w-full">

                    <button className="flex items-center justify-center w-full space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                      <FcGoogle />
                      <span> Google</span>
                    </button>
                  </div>

                  <p className="mt-6 text-xs text-gray-500 text-center">
                    Already have an account?{" "}
                    <a href="/signin">
                      <button className="font-semibold text-gray-900 hover:underline">
                        Sign in
                      </button>
                    </a>
                  </p>
                </div>
              </div>

              {/* <div className="flex pt-4 justify-content-end">
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
              </div> */}
            </StepperPanel>
            <StepperPanel header="OTP">
              <div className="w-full flex flex-col items-center justify-center px-4 py-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Verify your account
                </h2>

                <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
                  We’ve sent a 6-digit verification code to your email.
                  Please enter it below.
                </p>

                {/* OTP INPUTS */}
                <div className="mt-6 flex gap-3 justify-center">
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      onPaste={handlePaste}
                      className="
            w-12 h-12
            text-lg font-semibold text-center
            rounded-lg
            border border-gray-300
            focus:border-black
            focus:ring-1 focus:ring-black
            outline-none
            transition
          "
                    />
                  ))}
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  Didn’t receive the code? Check your spam folder.
                </p>

                <div className="mt-8 w-full max-w-sm flex flex-col gap-3">
                  <Button
                    label="Verify OTP"
                    className="w-full bg-black text-white py-2"
                    onClick={handleSendOtp} // no argument needed
                    disabled={otp.join("").length !== OTP_LENGTH}
                  />


                  <button
        type="button"
        className={`text-sm transition ${
          isResendDisabled ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-black"
        }`}
        onClick={handleResend}
        disabled={isResendDisabled}
      >
        Resend code {isResendDisabled && `(${counter}s)`}
      </button>
                </div>
              </div>

              <div className="flex pt-4 justify-content-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                />
              </div>
            </StepperPanel>

            
          </Stepper>
        </div>




      </div>
    </div>
  );
};

export default SignUp;
