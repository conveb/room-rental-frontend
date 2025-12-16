// src/pages/PaymentPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { room } = state || {};

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500 text-sm tracking-wide">
          No room selected.
        </p>
      </div>
    );
  }

  const handlePayment = () => {
    navigate("/confirmation", { state: { room } });
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Final step
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Confirm your luxury stay
          </h1>
          <p className="mt-2 text-sm text-neutral-500 max-w-xl">
            Review your room details and complete the card payment to secure your reservation.
          </p>
        </div>

        {/* Main two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
          {/* LEFT: Image + room final details */}
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            {/* Room image */}
            <div className="aspect-[4/3] w-full">
              <img
                src={
                  room.image ||
                  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt={`${room.type} in ${room.city}`}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Gradient overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300/80">
                    Room overview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {room.type}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-200">
                    {room.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-300/80">
                    Monthly rent
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    €{room.price}
                  </p>
                  <p className="text-xs text-neutral-300">per month</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-neutral-200">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Fully furnished
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                  Utilities included
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                  Flexible monthly stay
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: White primary card form */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-6 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                  Payment
                </p>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                  Card details
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  All transactions are secure and encrypted.
                </p>
              </div>
              {/* Simple card icon */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg bg-neutral-900" />
                <div className="h-8 w-12 rounded-lg border border-neutral-300" />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Name on card
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Card number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 pr-20 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1.5">
                    <span className="h-5 w-8 rounded-sm bg-neutral-900" />
                    <span className="h-5 w-8 rounded-sm border border-neutral-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Billing email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white tracking-wide shadow-[0_18px_40px_rgba(15,23,42,0.45)] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
              >
                Pay €{room.price} and confirm stay
              </button>

              <p className="text-[11px] text-neutral-500 leading-relaxed mt-2">
                Your payment is processed over a secure, encrypted connection. A confirmation email will be sent once the booking is completed.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
