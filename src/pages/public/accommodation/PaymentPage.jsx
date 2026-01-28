import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// FIX 1: Ensure this path matches your folder exactly
import { toast } from "sonner";
// FIX 2: Changed LuCheckCircle to LuCircleCheck
import { LuShieldCheck, LuLock, LuCircleCheck } from "react-icons/lu";
import { usePayment } from "../../../hooks/payout_providers/usePayment";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { processPayment, paymentLoading } = usePayment();

  const { booking } = state || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <p className="text-neutral-400 text-sm font-medium tracking-widest uppercase">No Active Session</p>
          <button onClick={() => navigate(-1)} className="px-8 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest">Return</button>
        </div>
      </div>
    );
  }

  const handleAuthorization = async () => {
    const payload = {
      booking: booking.id 
    };

    const result = await processPayment(payload);

    if (result.success) {
      toast.success("Payment successful! Reservation confirmed.");
      setTimeout(() => {
        navigate("/auth/user/confirmation", { state: { booking } });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid gap-8 lg:grid-cols-2 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-neutral-100">
        
        {/* Left: Property Visual */}
        <div className="relative h-64 lg:h-auto bg-neutral-900">
          <img
            src={booking.property_image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000"}
            alt="Property"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Identity Verified</p>
            <h2 className="text-white text-xl font-bold">{booking.property_title}</h2>
          </div>
        </div>

        {/* Right: Authorization Actions */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <LuLock className="text-emerald-500" size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Secure Authorization</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Finalize Payment</h3>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-50">
              <span className="text-xs text-neutral-500 font-medium">Reference</span>
              <span className="text-xs font-mono font-bold">{booking.reference_no}</span>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b border-neutral-50">
              <span className="text-xs text-neutral-500 font-medium">Initial Amount</span>
              <span className="text-xl font-black text-neutral-900">₹{Number(booking.initial_payment_amount).toLocaleString()}</span>
            </div>

            <div className="bg-emerald-50/50 p-4 rounded-2xl flex gap-3">
              {/* Updated Icon Name here */}
              <LuCircleCheck className="text-emerald-600 shrink-0" size={18} />
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                By clicking authorize, you agree to the lease terms for the period of <b>{booking.start_date}</b> to <b>{booking.end_date}</b>.
              </p>
            </div>
          </div>

          <button
            onClick={handleAuthorization}
            disabled={paymentLoading}
            className="w-full h-16 flex items-center justify-center rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black disabled:bg-neutral-200 transition-all active:scale-95"
          >
            {paymentLoading ? (
              <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Authorize Transaction"
            )}
          </button>

          <p className="mt-6 text-center text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
            Processing via Secure Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;