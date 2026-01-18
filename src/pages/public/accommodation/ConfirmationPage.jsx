// src/pages/ConfirmationPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { room } = state || {};

  // Auto redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="mx-auto mb-10 flex h-40 w-40 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <div className="h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
            <span className="text-white text-5xl">✓</span>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Booking confirmed
          </h1>
          <p className="mt-3 text-neutral-500 leading-relaxed">
            Thank you. Your reservation has been <br /> successfully secured.
          </p>
        </div>

        {/* Summary Card */}
        {room && (
          <div className="mt-10 bg-neutral-50 p-6 rounded-[2rem] border border-neutral-100 text-left">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold mb-4">
              Reservation details
            </p>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold text-neutral-900">
                  {room.title || room.type}
                </p>
                <p className="text-xs text-neutral-500 mt-1">{room.city}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Price Paid
                </p>
                <p className="mt-1 text-xl font-black text-neutral-900">
                  €{room.rent_per_month || room.price}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-4 text-sm font-semibold text-white shadow-xl hover:bg-black transition-all active:scale-[0.98]"
          >
            Go to homepage now
          </button>
          
          <p className="mt-6 text-center text-[11px] text-neutral-400">
            A confirmation email has been sent. <br /> Check your inbox for check-in instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
