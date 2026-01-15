import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Characters } from "../../../pages/users/account/characterCollection";
import defaultAvatar from "../../../Assets/characters/default.jpg";
import { CiEdit } from "react-icons/ci";
import { FaCheck, FaBuildingCircleCheck } from "react-icons/fa6";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";

import { MdOutlinePassword, MdOutlineAccountBalance, MdOutlineContactSupport } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import UserProfileSkeleton from "../../skeleton/UserProfileSkeleton";
import { toast } from "sonner";

export default function RoomOwnerAccount() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    user,
    setUser,
    loading,
    error,
    updating,
    changingPassword,
    updateUserProfile,
    changeUserPassword,
    deleteUserProfile
  } = useUserProfile();

  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setEditValues(user);
      setSelectedAvatar(user.avatarUrl || defaultAvatar);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    const payload = {
      full_name: editValues.full_name,
      email: editValues.email,
      phone: editValues.phone,
      business_name: editValues.business_name, // Specific for Owners
      avatarUrl: selectedAvatar,
    };

    const result = await updateUserProfile(payload);
    if (result.success) {
      setIsEditing(false);
      toast.success("Owner Profile Updated Successfully.");
    } else {
      toast.error("Update Failed.");
    }
  };

  const handleConfirmLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <UserProfileSkeleton />;
  if (error) return <div className="mt-32 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen px-5 md:p-6 mt-20 md:mt-0 md:mx-auto md:container">
      <div className="space-y-5 mt-3">
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              <img
                src={selectedAvatar}
                className={`h-40 w-40 rounded-full object-cover border-4 ${avatarEditMode ? "border-black scale-105" : "border-transparent"} transition-all`}
              />
              <button
                onClick={() => setAvatarEditMode(!avatarEditMode)}
                className="absolute bottom-1 right-1 bg-black border border-white text-white p-2 rounded-full shadow"
              >
                {avatarEditMode ? <FaCheck /> : <CiEdit />}
              </button>
            </div>
            
            {avatarEditMode && (
              <div className="w-full max-w-md overflow-x-auto py-4 flex gap-4 no-scrollbar">
                {Characters.map((char) => (
                  <img
                    key={char.id}
                    src={char.img}
                    onClick={() => setSelectedAvatar(char.img)}
                    className={`h-16 w-16 rounded-full cursor-pointer border-2 ${selectedAvatar === char.img ? "border-black" : "border-transparent"}`}
                  />
                ))}
              </div>
            )}

            <div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="font-bold text-xl">{user.full_name}</h2>
                <FaBuildingCircleCheck className="text-blue-500" title="Verified Owner" />
              </div>
              <p className="text-sm text-neutral-500">Property Management Account</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form Side */}
          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-800">Business Details</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-400 ml-1">Full Name</label>
              <input
                disabled={!isEditing}
                value={editValues.full_name || ""}
                onChange={(e) => setEditValues({ ...editValues, full_name: e.target.value })}
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm disabled:opacity-70"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-400 ml-1">Business/Tax Email</label>
              <input
                disabled={!isEditing}
                value={editValues.email || ""}
                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-400 ml-1">Contact Phone</label>
              <input
                disabled={!isEditing}
                value={editValues.phone || ""}
                onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm"
              />
            </div>

            <div className="pt-4">
              {isEditing ? (
                <div className="flex gap-3">
                  <button onClick={handleSaveProfile} className="flex-1 bg-black text-white rounded-2xl py-3 text-sm font-bold">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="flex-1 border border-gray-200 rounded-2xl py-3 text-sm">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="w-full bg-gray-100 text-gray-800 rounded-2xl py-3 text-sm font-bold hover:bg-gray-200 transition-colors">Edit Owner Profile</button>
              )}
            </div>
          </div>

          {/* Owner Actions Side */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 ml-2">Account Management</h3>
            
            <ActionBtn 
               icon={<MdOutlineAccountBalance size={22}/>} 
               label="Payout Settings" 
               color="bg-blue-100" 
               link="/auth/owner/payouts"
            />
            
            <ActionBtn 
               icon={<MdOutlinePassword size={22}/>} 
               label="Security & Password" 
               color="bg-purple-100" 
               onClick={() => setPasswordModal(true)}
            />

            <ActionBtn 
               icon={<HiOutlineDocumentText size={22}/>} 
               label="Terms & Property Policy" 
               color="bg-orange-100" 
               link="/terms"
            />

            <ActionBtn 
               icon={<MdOutlineContactSupport size={22}/>} 
               label="Owner Support" 
               color="bg-teal-100" 
               link="/support"
            />

            <hr className="my-4 border-gray-100" />

            <ActionBtn 
               icon={<AiOutlineLogout size={22}/>} 
               label="Sign Out" 
               color="bg-gray-200" 
               onClick={() => setShowLogoutModal(true)}
            />

            <ActionBtn 
               icon={<TiUserDelete size={22}/>} 
               label="Close Owner Account" 
               color="bg-red-100" 
               textColor="text-red-600"
               onClick={() => setDeleteModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Modals - Reuse your existing logic for Logout, Delete, and Password */}
      {/* ... PasswordModal, LogoutModal, DeleteModal ... */}
    </div>
  );
}

// Helper Component for scannable actions
const ActionBtn = ({ icon, label, color, textColor = "text-gray-700", onClick, link }) => {
  const content = (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-white border border-gray-50 rounded-2xl hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} rounded-xl group-hover:scale-110 transition-transform`}>{icon}</div>
        <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
      </div>
      <CiEdit className="text-gray-300" />
    </button>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};