// hooks/auth/usePhoneVerification.js
import { useState, useCallback, useEffect } from 'react';
import { verifyPhoneApi, verifyPhoneOtpApi } from '../../services/allAPI';

export const usePhoneVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);

    // Timer effect for resend OTP
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const sendOtp = useCallback(async (phone) => {
        setIsLoading(true);
        setError('');
        
        try {
            console.log('Sending OTP for phone:', phone);
            const response = await verifyPhoneApi({ phone });
            console.log('Send OTP response:', response);
            
            // Django automatically identifies the user from the session/token
            // The backend should return success message
            if (response && response.detail === "OTP sent successfully") {
                setIsOtpSent(true);
                setTimer(60); // Start 60 second timer for resend
                return true;
            } else {
                setError('Failed to send OTP');
                return false;
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            console.error('Error response:', err.response);
            
            // Handle specific error messages
            if (err.response?.status === 401) {
                setError('Please log in to verify your phone number');
            } else {
                setError(err.response?.data?.detail || 'Failed to send OTP');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyOtp = useCallback(async (phone, otpCode) => {
        setIsLoading(true);
        setError('');

        try {
            console.log('Verifying OTP:', { phone, otpCode });
            
            // Django automatically identifies the user from the session/token
            // No need to send temp_user_id
            const response = await verifyPhoneOtpApi({
                phone: phone,
                otp: otpCode
            });
            
            console.log('Verify OTP response:', response);

            // Check if verification was successful
            // The backend returns verified: true and user data
            if (response && response.verified === true) {
                setIsVerified(true);
                return true;
            } else {
                setError('Invalid OTP');
                return false;
            }
        } catch (err) {
            console.error('Verify OTP error:', err);
            console.error('Error response:', err.response);
            
            if (err.response?.status === 401) {
                setError('Please log in to verify your phone number');
            } else {
                setError(err.response?.data?.detail || 'Verification failed');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resendOtp = useCallback(async () => {
        if (timer > 0) return;
        
        setIsLoading(true);
        setError('');
        setOtp(''); // Clear previous OTP
        
        try {
            console.log('Resending OTP for phone:', phoneNumber);
            
            // Django automatically identifies the user from the session/token
            const response = await verifyPhoneApi({ phone: phoneNumber });
            
            console.log('Resend OTP response:', response);
            
            if (response && response.detail === "OTP sent successfully") {
                setTimer(60); // Reset timer
                return true;
            } else {
                setError('Failed to resend OTP');
                return false;
            }
        } catch (err) {
            console.error('Resend OTP error:', err);
            setError(err.response?.data?.detail || 'Failed to resend OTP');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [phoneNumber, timer]);

    const resetVerification = useCallback(() => {
        setPhoneNumber('');
        setOtp('');
        setIsOtpSent(false);
        setIsVerified(false);
        setError('');
        setTimer(0);
    }, []);

    return {
        // State
        phoneNumber,
        setPhoneNumber,
        otp,
        setOtp,
        isLoading,
        isOtpSent,
        isVerified,
        timer,
        error,
        
        // Actions
        sendOtp,
        verifyOtp,
        resendOtp,
        resetVerification
    };
};