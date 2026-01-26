import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserCompleteDetails } from "../../../hooks/users/useUserCompleteDetails";
import { 
  MdArrowBack, 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdCalendarToday, 
  MdHomeWork, 
  MdAccountBalanceWallet,
  MdAssignmentTurnedIn
} from "react-icons/md";

const RoomownerFullDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useUserCompleteDetails(id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <p className="text-gray-500 animate-pulse font-medium">Loading Landowner Profile...</p>
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-red-500">Error: Landowner not found.</div>;

  const { email, is_active, created_at, landowner_profile, properties, payout_accounts } = data;

  return (
    <div className="min-h-screen pb-12 bg-gray-50/30">
      {/* Top Navigation Bar */}
      <div className=" border-b sticky top-0 z-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-all font-semibold"
          >
            <MdArrowBack className="text-xl" /> Back to Landowners
          </button>
          <div className="flex gap-3">
             <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {is_active ? "● ACTIVE" : "● BLOCKED"}
              </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: LANDOWNER INFO */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="h-32 w-32 bg-blue-600 rounded-xl overflow-hidden shadow-xl mb-6 border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
                {landowner_profile?.full_name?.charAt(0) || "L"}
              </div>
              <h1 className="text-2xl font-black text-gray-900">{landowner_profile?.full_name}</h1>
              <p className="text-gray-500 font-medium mb-6 uppercase text-xs tracking-widest">Landowner Partner</p>
              
              <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                <InfoRow icon={<MdEmail />} label="Business Email" value={email} />
                <InfoRow icon={<MdPhone />} label="Phone" value={landowner_profile?.phone || "N/A"} />
                <InfoRow icon={<MdLocationOn />} label="Country" value={landowner_profile?.country_name || "N/A"} />
                <InfoRow icon={<MdCalendarToday />} label="Registered" value={new Date(created_at).toLocaleDateString()} />
              </div>
            </div>

            {/* STATUS CARDS */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MdAssignmentTurnedIn className="text-blue-500" /> Account Status
              </h3>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Onboarding</span>
                <span className="font-bold capitalize px-2 py-1 bg-gray-100 rounded-lg text-[10px]">
                    {landowner_profile?.onboarding_status?.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Payouts Enabled</span>
                <span className={`font-bold text-xs ${landowner_profile?.payments_receivable ? "text-green-600" : "text-amber-600"}`}>
                    {landowner_profile?.payments_receivable ? "Yes" : "Pending Setup"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PROPERTIES & PAYOUTS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatBox label="Total Properties" value={properties?.length || 0} color="text-blue-600" />
              <StatBox label="Payout Accounts" value={payout_accounts?.length || 0} color="text-green-600" />
              <StatBox label="Support Tickets" value={data.support_tickets?.length || 0} color="text-purple-600" />
            </div>

            {/* PROPERTIES SECTION */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 mb-8">
                <MdHomeWork className="text-blue-600 text-2xl" /> 
                Property Listings
              </h3>

              {properties?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((prop) => (
                    <div key={prop.id} className="group border rounded-xl overflow-hidden hover:shadow-md transition-all">
                      <div className="h-40 bg-gray-100 relative">
                        {prop.cover_image && <img src={prop.cover_image} alt={prop.title} className="w-full h-full object-cover" />}
                        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold ${prop.is_active ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                            {prop.is_active ? "LIVE" : "INACTIVE"}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 truncate">{prop.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{prop.city}</p>
                        <div className="mt-3 flex justify-between items-center">
                            <span className="text-blue-600 font-black">€{prop.rent_per_month}</span>
                            <button className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-black">Edit Listing</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-gray-50 rounded-xl border border-dashed flex flex-col items-center">
                  <MdHomeWork className="text-gray-300 text-5xl mb-4" />
                  <p className="text-gray-500 font-medium">No properties listed yet.</p>
                  <p className="text-gray-400 text-xs mt-1">Landowner needs to complete onboarding.</p>
                </div>
              )}
            </div>

            {/* PAYOUT ACCOUNTS SECTION */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 mb-6">
                    <MdAccountBalanceWallet className="text-green-600 text-2xl" /> 
                    Payout Methods
                </h3>
                {payout_accounts?.length > 0 ? (
                    <div className="space-y-3">
                        {payout_accounts.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="font-bold text-gray-700">Bank Account (****)</span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase">Primary</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm italic">No payout accounts connected.</p>
                )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Reusing helper components from Student page for consistency
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-gray-400 text-lg">{icon}</div>
    <div className="text-left">
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">{label}</p>
      <p className="text-sm font-bold text-gray-700 break-all">{value}</p>
    </div>
  </div>
);

const StatBox = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
    <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{label}</p>
  </div>
);

export default RoomownerFullDetails;