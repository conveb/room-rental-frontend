import { useState } from 'react';
import { toast } from 'sonner'; // Import toast from sonner
import { createPaymentApi } from '../../services/allAPI';

export const usePayment = () => {
    const [paymentLoading, setPaymentLoading] = useState(false);

    const processPayment = async (paymentData) => {
        setPaymentLoading(true);
        try {
            const response = await createPaymentApi(paymentData);
            
            if (response.status >= 200 && response.status < 300) {
                toast.success('Payment processed successfully!');
                return { success: true, data: response.data };
            } else {
                const errorMsg = response.data?.booking?.[0] || "Payment failed.";
                toast.error(errorMsg); // Minimalist error toast
                return { success: false };
            }
        } catch (error) {
            toast.error('Connection error. Please try again.');
            return { success: false };
        } finally {
            setPaymentLoading(false);
        }
    };

    return { processPayment, paymentLoading };
};