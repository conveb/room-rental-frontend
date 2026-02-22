import React from "react";
import { useUserCompleteDetails } from "../../../hooks/users/useUserCompleteDetails";
import { useNavigate } from "react-router-dom";
import { MdOutlineOpenInNew, MdBlock, MdCheckCircle } from "react-icons/md";
import { Characters } from '../../users/account/characterCollection';
import { toast } from "sonner";

const StudentDetailsModal = ({ id, avatar_id, role, is_active, onClose, onStatusUpdate }) => {
  const { data, loading } = useUserCompleteDetails(id);
  const navigate = useNavigate();
  const character = Characters.find((c) => String(c.id) === String(avatar_id));

  if (!id) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <p className="text-sm text-gray-500 font-medium">Fetching profile...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { email, student_profile, created_at } = data;

  const handleViewDetails = () => {
    if (role === "STUDENT") {
      navigate(`/auth/admin/student/${id}`);
    } else if (role === "LAND_OWNER") {
      navigate(`/auth/admin/roomowner/${id}`);
    } else {
      toast.error("Unknown user role. Cannot navigate to details.");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="h-32 p-6 bg-black/90 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">
                {role === "STUDENT" ? "Student Quick View" : "Landowner Quick View"}
              </h2>
              <p className="text-xs text-gray-400">
                Joined {created_at ? new Date(created_at).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-6">

          {/* AVATAR */}
          <div className="relative -mt-12 flex flex-col items-center text-center">
            <div className="h-24 w-24 bg-zinc-100 text-black rounded-2xl flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg overflow-hidden">
              {character ? (
                <img src={character.img} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{student_profile?.full_name?.charAt(0) || "U"}</span>
              )}
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xl text-gray-900">
                {student_profile?.full_name || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{email}</p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] uppercase tracking-wider font-black text-gray-400 mb-1">Status</p>
              <div className={`text-xs font-bold py-1 px-2 rounded-full inline-block ${is_active ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                {is_active ? "● Active" : "● Blocked"}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] uppercase tracking-wider font-black text-gray-400 mb-1">Role</p>
              <span className="text-xs font-bold text-gray-700 block mt-1 uppercase">
                {role}
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-row gap-3">
            <button
              onClick={handleViewDetails}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl font-semibold transition"
            >
              <MdOutlineOpenInNew /> View Details
            </button>

            {is_active ? (
              <button
                onClick={() => onStatusUpdate('block')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold transition border border-red-100"
              >
                <MdBlock /> Block
              </button>
            ) : (
              <button
                onClick={() => onStatusUpdate('unblock')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-2xl font-bold transition border border-green-100"
              >
                <MdCheckCircle /> Unblock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;