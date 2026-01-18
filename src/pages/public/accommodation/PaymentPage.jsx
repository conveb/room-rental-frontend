import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Look for 'property' since that is what you passed in navigate
  const { property } = state || {};

  // If no property is passed, show fallback
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
           <p className="text-neutral-500 text-sm tracking-wide">No property selected.</p>
           <button onClick={() => navigate('/accommodation')} className="mt-4 text-black underline text-sm">Return to search</button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    // You can keep passing it forward to confirmation
    navigate("/auth/user/confirmation", { state: { property } });
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-4 pt-10">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">Final step</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Confirm your stay
          </h1>
          <p className="mt-2 text-sm text-neutral-500 max-w-xl">
            Review your room details and complete the card payment to secure your reservation.
          </p>
        </div>

        {/* Main two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
          
          {/* LEFT: Image + room final details */}
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <div className="aspect-[4/3] w-full">
              <img
                src={property.cover_image || property.image || "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300/80">Room overview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {property.title || property.property_type}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-200">
                    {property.city}, {property.country}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-300/80">Monthly rent</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    €{property.rent_per_month || property.price}
                  </p>
                  <p className="text-xs text-neutral-300">per month</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment Form */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-6 md:p-7">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Card details</h3>
            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
              {/* Form fields remain the same... */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Name on card</label>
                <input required type="text" placeholder="Full name" className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm" />
              </div>
              
              {/* Simplified Card Input */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Card number</label>
                <input required type="text" placeholder="1234 5678 9012 3456" className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="MM / YY" className="rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm" />
                <input required type="password" placeholder="CVV" className="rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm" />
              </div>

              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white tracking-wide shadow-lg hover:bg-black transition"
              >
                Pay €{property.rent_per_month || property.price} and confirm stay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;