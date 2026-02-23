import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
import { useAuth } from "../../../context/AuthContext";
import BacktoHome from "../../../components/btns/BacktoHome";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const AdminOtpVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const timerRef = useRef(null);

    // Get data from navigation state - now includes OTP
    const { email, otp: responseOtp, purpose, requireOtp } = location.state || {};

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [showOtp, setShowOtp] = useState(false); // State to toggle OTP visibility

    const { verifyOtp, resendOtp, loading, error } = useEmailVerification();

    // Redirect if no email in state or if OTP wasn't required
    useEffect(() => {
        if (!email || !requireOtp) {
            navigate("/signin", { replace: true });
        }
    }, [email, requireOtp, navigate]);

    // Timer for resend OTP
    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((digit, index) => {
            if (index < 6) newOtp[index] = digit;
        });

        setOtp(newOtp);
        const lastFilledIndex = Math.min(pastedData.length, 5);
        document.getElementById(`otp-${lastFilledIndex}`)?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join("");
        if (otpString.length !== 6) return;

        try {
            const payload = {
                email,
                otp: otpString,
                purpose: purpose || "ADMIN_LOGIN"
            };

            await verifyOtp(payload);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            sessionStorage.setItem('aliveparis_session_hint', 'true');
            await login();
            navigate("/auth/admin", { replace: true });

        } catch (err) {
            console.error("OTP verification failed:", err);
        }
    };

    const handleResendOtp = async () => {
        try {
            await resendOtp({
                email,
                purpose: purpose || "ADMIN_LOGIN"
            });
            setTimeLeft(120);
            setCanResend(false);
            setOtp(["", "", "", "", "", ""]);
            document.getElementById("otp-0")?.focus();
        } catch (err) {
            console.error("Failed to resend OTP:", err);
        }
    };

    const handleBackToSignin = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        navigate("/signin", { replace: true });
    };

    const toggleOtpVisibility = () => {
        setShowOtp(!showOtp);
    };

    return (
        <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
            <div className="absolute top-4 right-5">
                <BacktoHome onClick={handleBackToSignin} />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Two-Factor Authentication
                        </h1>
                        <p className="text-sm text-gray-500">
                            For security reasons, we've sent a verification code to<br />
                            <span className="font-medium text-gray-700">{email}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            Enter the 6-digit code to complete your sign in
                        </p>
                    </div>

                    {/* Display the actual OTP from response for client reference */}
                    {responseOtp && (
                        <div className="mb-6 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
                            <div className="flex items-center justify-between text-center">
                                <p className="text-xs md:text-sm text-red-800 font-medium">
                                    Your OTP Code (for testing/reference):
                                </p>
                                
                            </div>
                            <div className="flex gap-3 items-center justify-center">

                            <p className="text-2xl font-bold text-black text-center mt-2 tracking-widest">
                                {showOtp ? responseOtp : "••••••"}
                            </p>
                            <button
                                    type="button"
                                    onClick={toggleOtpVisibility}
                                    className="text-xs text-black"
                                >
                                    {showOtp ? <IoEyeOffSharp size={20}/> : <IoEyeSharp size={20}/>}
                                </button>
                            </div>
                            <p className="text-xs text-red-600 text-center mt-2">
                                Please type this code in the fields below
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input Fields - Client types here */}
                        <div className="flex justify-center gap-2" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    required
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        {/* Timer Display */}
                        <div className="text-center text-sm text-gray-500">
                            {timeLeft > 0 ? (
                                <p>Code expires in <span className="font-medium text-gray-700">{formatTime(timeLeft)}</span></p>
                            ) : (
                                <p className="text-red-500">Code expired - please request a new one</p>
                            )}
                        </div>

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={loading || otp.join("").length !== 6}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Verify & Complete Sign In"}
                        </button>

                        {/* Resend Option */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={!canResend || loading}
                                className="text-sm text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Didn't receive code?{" "}
                                <span className="font-medium text-black">
                                    {canResend ? "Resend Now" : `Resend in ${formatTime(timeLeft)}`}
                                </span>
                            </button>
                        </div>

                        {/* Back to Sign In */}
                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={handleBackToSignin}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                ← Back to Sign In
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                    This is an additional security step for admin access
                </p>
            </div>
        </div>
    );
};

export default AdminOtpVerification;