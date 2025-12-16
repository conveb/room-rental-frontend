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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full text-center">
        {/* Subtle success icon */}
        <div className="mx-auto mb-6 flex h-52 w-52 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <div className="h-32 w-32 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-5xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-900">
          Booking confirmed
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Thank you. Your reservation has been successfully secured.
        </p>

        {room && (
          <div className="mt-6 text-left">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Reservation details
            </p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {room.type}
                </p>
                <p className="text-xs text-neutral-500">{room.city}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Monthly rent
                </p>
                <p className="mt-1 text-lg font-semibold text-neutral-900">
                  €{room.price}
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-neutral-500">
          A confirmation email has been sent. You will be redirected to the
          homepage shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white tracking-wide shadow-[0_18px_40px_rgba(15,23,42,0.25)] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
        >
          Go to homepage now
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
