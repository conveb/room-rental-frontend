// components/VerifyPhoneNumber.jsx
import { useState, useEffect } from 'react';
import { usePhoneVerification } from '../../../hooks/auth/usePhoneVerification';

const VerifyPhoneNumber = ({ isPhoneVerified, onVerificationComplete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        phoneNumber,
        setPhoneNumber,
        otp,
        setOtp,
        isLoading,
        isOtpSent,
        isVerified,
        timer,
        error,
        sendOtp,
        verifyOtp,
        resendOtp,
        resetVerification
    } = usePhoneVerification();

    // Handle successful verification
    useEffect(() => {
        if (isVerified) {
            setShowSuccess(true);
            // Auto close after 5 seconds
            const timer = setTimeout(() => {
                setIsModalOpen(false);
                setShowSuccess(false);
                resetVerification();
                if (onVerificationComplete) {
                    onVerificationComplete();
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVerified, onVerificationComplete, resetVerification]);

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetVerification();
        setShowSuccess(false);
    };

    // Handle send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        const success = await sendOtp(phoneNumber);
        if (success) {
            setOtp('');
        }
    };

    // Handle verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        await verifyOtp(phoneNumber, otp);
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        await resendOtp();
    };

    // Handle change phone number
    const handleChangePhoneNumber = () => {
        resetVerification();
    };

    // Don't render if phone is verified
    if (isPhoneVerified && !showSuccess) {
        return null;
    }

    return (
        <>
            {/* Verification Bar */}
            <div
                style={{
                    transition: 'all 0.3s ease',
                }}
                className={`text-center text-sm ${showSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} p-3`}
            >
                {showSuccess ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p style={{ fontSize: '0.875rem' }}>
                            Phone number verified successfully! This message will disappear in 5 seconds...
                        </p>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ animation: 'pulse 2s infinite' }}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                ) : (
                    <p className='text-xs md:text-sm'>
                        Your phone number is not verified.{' '}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                fontWeight: '600',
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#7f1d1d'}
                            onMouseLeave={(e) => e.target.style.color = 'inherit'}
                        >
                            Click here to verify now
                        </button>
                    </p>
                )}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                    onClick={handleCloseModal}
                >
                    {/* Modal Content */}
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            padding: '1.5rem',
                            maxWidth: '28rem',
                            width: '90%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ×
                        </button>

                        {/* Modal Header */}
                        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                {isVerified ? 'Verification Successful!' : 'Verify Your Phone Number'}
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                {isVerified
                                    ? 'Your phone number has been successfully verified.'
                                    : isOtpSent
                                        ? 'Enter the OTP sent to your phone number'
                                        : 'Please enter your phone number to receive a verification code'
                                }
                            </p>
                        </div>

                        {!isVerified ? (
                            <div>
                                {!isOtpSent ? (
                                    // Phone Number Input Form
                                    <form onSubmit={handleSendOtp}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label
                                                htmlFor="phone"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    marginBottom: '0.25rem'
                                                }}
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                disabled={isLoading}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '1rem',
                                                    outline: 'none'
                                                }}
                                            />
                                            {error && (
                                                <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                    {error}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !phoneNumber}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                fontSize: '1rem',
                                                fontWeight: '500',
                                                cursor: isLoading || !phoneNumber ? 'not-allowed' : 'pointer',
                                                opacity: isLoading || !phoneNumber ? 0.5 : 1
                                            }}
                                        >
                                            {isLoading ? (
                                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '1rem',
                                                        height: '1rem',
                                                        border: '2px solid white',
                                                        borderTopColor: 'transparent',
                                                        borderRadius: '50%',
                                                        animation: 'spin 1s linear infinite'
                                                    }}></span>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Send OTP'
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    // OTP Verification Form
                                    <form onSubmit={handleVerifyOtp}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label
                                                htmlFor="otp"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    marginBottom: '0.25rem'
                                                }}
                                            >
                                                Enter OTP
                                            </label>
                                            <input
                                                id="otp"
                                                type="text"
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                disabled={isLoading}
                                                maxLength={6}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '1rem',
                                                    outline: 'none'
                                                }}
                                            />
                                            {error && (
                                                <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                    {error}
                                                </p>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                            <button
                                                type="submit"
                                                disabled={isLoading || !otp || otp.length !== 6}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: '#3b82f6',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '1rem',
                                                    fontWeight: '500',
                                                    cursor: isLoading || !otp || otp.length !== 6 ? 'not-allowed' : 'pointer',
                                                    opacity: isLoading || !otp || otp.length !== 6 ? 0.5 : 1
                                                }}
                                            >
                                                {isLoading ? 'Verifying...' : 'Verify OTP'}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={isLoading || timer > 0}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: 'white',
                                                    color: '#374151',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '1rem',
                                                    fontWeight: '500',
                                                    cursor: isLoading || timer > 0 ? 'not-allowed' : 'pointer',
                                                    opacity: isLoading || timer > 0 ? 0.5 : 1
                                                }}
                                            >
                                                {timer > 0 ? (
                                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <polyline points="12 6 12 12 16 14" />
                                                        </svg>
                                                        Resend in {timer}s
                                                    </span>
                                                ) : (
                                                    'Resend OTP'
                                                )}
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleChangePhoneNumber}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#2563eb',
                                                fontSize: '0.875rem',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                display: 'block',
                                                margin: '0 auto'
                                            }}
                                        >
                                            ← Change phone number
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            // Success State
                            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <svg
                                        width="64"
                                        height="64"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 12l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
                                    Your phone number {phoneNumber} has been verified successfully!
                                </p>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    This window will close automatically in 5 seconds...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add animation styles */}
            <style>
                {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
            </style>
        </>
    );
};

export default VerifyPhoneNumber;