import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
import { useAuth } from "../../../context/AuthContext";
import BacktoHome from "../../../components/btns/BacktoHome";

const AdminOtpVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const timerRef = useRef(null); // Use ref to store timer

    // Get data from navigation state
    const { email, purpose, requireOtp } = location.state || {};

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [canResend, setCanResend] = useState(false);

    const { verifyOtp, resendOtp, loading, error } = useEmailVerification();

    // Redirect if no email in state or if OTP wasn't required
    useEffect(() => {
        if (!email || !requireOtp) {
            navigate("/signin", { replace: true });
        }
    }, [email, requireOtp, navigate]);

    // Timer for resend OTP - Optimized
    useEffect(() => {
        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Don't start timer if timeLeft is 0 or less
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        // Start new timer
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Clear timer when reaching 0
                    clearInterval(timerRef.current);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup on unmount or when timeLeft changes
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [timeLeft]); // Only re-run if timeLeft changes

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

            // Clear timer on successful verification
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
        // Clear timer when navigating away
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        navigate("/signin", { replace: true });
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input Fields */}
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

                        {/* Test OTP hint */}
                        {process.env.NODE_ENV === 'development' && (
                            <p className="text-xs text-gray-400 text-center">
                                Test OTP: 448667
                            </p>
                        )}

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}



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