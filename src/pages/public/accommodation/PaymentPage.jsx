import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Add useLocation
import { toast } from "sonner";
import { LuLock, LuCircleCheck, LuCalendar, LuMapPin, LuChevronRight, LuShieldCheck } from "react-icons/lu";
import { useBooking } from "../../../hooks/bookings/useBookings";
import { usePayment } from "../../../hooks/payout_providers/usePayment";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const location = useLocation(); // Used to check if we already have the URL from a previous state
  const { processPayment, paymentLoading } = usePayment();
  const { bookingLoading, fetchBookingDetails, bookingDetails } = useBooking();

  useEffect(() => {
    if (bookingId) fetchBookingDetails(bookingId);
  }, [bookingId]);

  // Handle the redirect to Wise
  const handlePayment = async () => {
    try {
      // 1. Call the processPayment hook (which should call your createPaymentApi)
      const result = await processPayment(bookingId);

      // 2. Check for success and the presence of the payment URL
      // Adjust 'result.payment_url' based on your actual API response structure
      if (result && (result.payment_url || result.url)) {
        const externalUrl = result.payment_url || result.url;
        
        toast.success("Redirecting to secure payment gateway...");
        
        // 3. Redirect the entire browser window to the Wise UI
        window.location.href = externalUrl;
      } else {
        toast.error("Could not generate payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("An error occurred during payment initiation.");
    }
  };

  if (bookingLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mb-4"></div>
        <p className="text-sm text-neutral-500 font-medium">Securing your session...</p>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Booking details could not be retrieved.</p>
      </div>
    );
  }

  const { property, start_date, end_date, total_rent_amount, id } = bookingDetails;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <nav className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-8 uppercase tracking-widest">
          <span>Search</span>
          <LuChevronRight size={12} />
          <span>Details</span>
          <LuChevronRight size={12} />
          <span className="text-black">Payment</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-2 shadow-sm border border-neutral-100">
              <div className="relative h-72 w-full overflow-hidden rounded-[1.5rem]">
                <img
                  src={property?.cover_image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"}
                  alt={property?.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-white text-2xl font-bold tracking-tight">{property?.title}</h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                    <LuMapPin size={14} />
                    <span>{property?.city}, {property?.country}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-2xl">
                  <p className="text-[10px] uppercase text-neutral-400 font-bold mb-1">Check-in</p>
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <LuCalendar className="text-neutral-400" size={16} />
                    {new Date(start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl">
                  <p className="text-[10px] uppercase text-neutral-400 font-bold mb-1">Check-out</p>
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <LuCalendar className="text-neutral-400" size={16} />
                    {new Date(end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 sticky top-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Price Summary</h3>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <LuShieldCheck size={14} />
                  <span className="text-[10px] font-bold uppercase">Verified</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Booking Reference</span>
                  <span className="font-mono text-neutral-400">#{id?.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Base Rent</span>
                  <span className="font-medium">€{Number(total_rent_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Service Fee</span>
                  <span className="font-medium text-emerald-600">€0.00</span>
                </div>
                
                <hr className="border-dashed border-neutral-200" />
                
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <span className="block text-sm font-bold">Total Amount</span>
                    <span className="text-[10px] text-neutral-400">Includes all taxes & fees</span>
                  </div>
                  <span className="text-3xl font-black tracking-tight">
                    €{Number(total_rent_amount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="group relative w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-neutral-800 disabled:bg-neutral-200 active:scale-[0.98]"
                >
                  {paymentLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Pay with Wise <LuCircleCheck size={18} />
                    </span>
                  )}
                </button>

                <p className="text-center text-[10px] text-neutral-400 leading-relaxed">
                  You will be redirected to Wise to complete your transaction securely.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <LuLock size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-neutral-800 leading-none">Secure Checkout</p>
                  <p className="text-[10px] text-neutral-500 mt-1">Directly processed by Wise</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;