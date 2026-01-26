import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserCompleteDetails } from "../../../hooks/users/useUserCompleteDetails";
import { Characters } from '../../users/account/characterCollection';
import { 
  MdArrowBack, 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdCalendarToday, 
  MdVerifiedUser, 
  MdFavorite 
} from "react-icons/md";

const StudentFullDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useUserCompleteDetails(id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <p className="text-gray-500 animate-pulse font-medium">Loading Student Profile...</p>
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-red-500">Error: Student not found.</div>;

  const { email, is_active, created_at, student_profile, favourites } = data;
  
  // Find character illustration
  const character = Characters.find((c) => String(c.id) === String(student_profile?.avatar_id));

  return (
    <div className="min-h-screen  pb-12">
      {/* Top Navigation Bar */}
      <div className=" border-b sticky top-0 z-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-all font-semibold"
          >
            <MdArrowBack className="text-xl" /> Back to Students
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
          
          {/* LEFT COLUMN: PROFILE CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="h-32 w-32 bg-zinc-900 rounded-xl overflow-hidden shadow-xl mb-6 border-4 border-white">
                {character ? (
                  <img src={character.img} alt="Student Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                    {student_profile?.full_name?.charAt(0) || "S"}
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-black text-gray-900">{student_profile?.full_name}</h1>
              <p className="text-gray-500 font-medium mb-6">{email}</p>
              
              <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                <InfoRow icon={<MdEmail />} label="Email Address" value={email} />
                <InfoRow icon={<MdPhone />} label="Phone Number" value={student_profile?.phone || "Not linked"} />
                <InfoRow icon={<MdCalendarToday />} label="Member Since" value={new Date(created_at).toLocaleDateString()} />
              </div>
            </div>

            {/* VERIFICATION STATUS */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MdVerifiedUser className="text-blue-500" /> Verification
              </h3>
              <div className={`p-4 rounded-xl flex items-center justify-between ${student_profile?.is_verified ? "bg-blue-50" : "bg-amber-50"}`}>
                <span className="text-sm font-bold">{student_profile?.is_verified ? "Student Verified" : "Pending Verification"}</span>
                <span>{student_profile?.is_verified ? "✅" : "⏳"}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatBox label="Total Favourites" value={favourites?.length || 0} color="text-red-500" />
              <StatBox label="Bookings" value={data.bookings?.length || 0} color="text-blue-500" />
              <StatBox label="Support Tickets" value={data.support_tickets?.length || 0} color="text-purple-500" />
            </div>

            {/* FAVOURITES LIST */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <MdFavorite className="text-red-500 text-2xl" /> 
                  Favourite Properties
                </h3>
              </div>

              {favourites?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favourites.map((fav) => (
                    <div key={fav.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl h-48 mb-4">
                        <img 
                          src={fav.property.cover_image} 
                          alt={fav.property.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase">
                          {fav.property.property_type.replace('_', ' ')}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{fav.property.title}</h4>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <MdLocationOn /> {fav.property.city}, {fav.property.region}
                      </div>
                      <div className="mt-2 text-lg font-black text-gray-900">
                        €{fav.property.rent_per_month}<span className="text-xs text-gray-400 font-medium">/month</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="h-20 w-20 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                    <MdFavorite className="text-gray-200 text-3xl" />
                  </div>
                  <p className="text-gray-400 font-medium">No properties favorited yet.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
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

export default StudentFullDetails;