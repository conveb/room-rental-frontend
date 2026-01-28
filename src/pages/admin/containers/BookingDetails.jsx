import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuMapPin, LuCalendar, LuCreditCard, LuUser, LuShieldCheck, LuInfo } from "react-icons/lu";
import { useBooking } from '../../../hooks/bookings/useBookings';

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBookingDetails, bookingDetails, bookingLoading } = useBooking();

  useEffect(() => {
    if (id) fetchBookingDetails(id);
  }, [id]);

  if (bookingLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Authenticating Details</p>
      </div>
    </div>
  );

  if (!bookingDetails) return <div className="p-20 text-center">Booking not found.</div>;

  // Helper to format currency
  const formatCur = (val) => Number(val || 0).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="bg-white border-b border-neutral-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to List
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Booking Status</span>
            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              bookingDetails.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
            }`}>
              {bookingDetails.status}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: PROPERTY & MESSAGE --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-200">
              <img 
                src={bookingDetails.property_image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"} 
                alt="Property" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Reference No</p>
                <p className="text-sm font-bold text-neutral-900">{bookingDetails.reference_no}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black text-neutral-900 leading-tight">
                {bookingDetails.property_title}
              </h1>
              <div className="flex items-center gap-2 text-neutral-500">
                <LuMapPin className="text-emerald-500" />
                <span className="text-lg font-medium">Premium Property ID: {bookingDetails.property.split('-')[0]}</span>
              </div>
            </div>

            {/* Tenant Message Box */}
            <div className="p-8 bg-white rounded-[2rem] border border-neutral-100 shadow-sm">
               <div className="flex items-center gap-2 mb-4 text-neutral-400">
                  <LuInfo size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Tenant Note</span>
               </div>
               <p className="text-neutral-600 italic">"{bookingDetails.tenant_message || "No specific instructions provided."}"</p>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FINANCIALS --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 sticky top-32">
              <h2 className="text-xl font-bold text-neutral-900 mb-8 pb-6 border-b border-neutral-50">
                Reservation Summary
              </h2>

              <div className="space-y-8">
                {/* Dates */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900"><LuCalendar size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Stay Duration</p>
                    <p className="text-sm font-bold text-neutral-800">
                      {new Date(bookingDetails.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} 
                      <span className="text-neutral-300 mx-2">to</span> 
                      {new Date(bookingDetails.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Tenant Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900"><LuUser size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Tenant Details</p>
                    <p className="text-sm font-bold text-neutral-800">{bookingDetails.user_email}</p>
                    <p className="text-xs text-neutral-400">ID: {bookingDetails.user.split('-')[0]}...</p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="pt-6 border-t border-neutral-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Monthly Rent</span>
                    <span className="font-semibold text-neutral-800">{formatCur(bookingDetails.monthly_rent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Security Deposit</span>
                    <span className="font-semibold text-neutral-800">{formatCur(bookingDetails.security_deposit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Booking Fee</span>
                    <span className="font-semibold text-neutral-800">{formatCur(bookingDetails.booking_fee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Additional Charges</span>
                    <span className="font-semibold text-neutral-800">{formatCur(bookingDetails.charges)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-neutral-100">
                    <span className="font-bold text-neutral-900">Initial Payable</span>
                    <span className="text-xl font-black text-emerald-600">{formatCur(bookingDetails.initial_payment_amount)}</span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="mt-10 p-6 bg-neutral-900 rounded-[2rem] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LuShieldCheck className={bookingDetails.payment_status === 'PAID' ? "text-emerald-400" : "text-orange-400"} size={24} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-neutral-400">Payment Status</p>
                    <p className="text-sm font-bold">{bookingDetails.payment_status}</p>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-neutral-800"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Secure</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}