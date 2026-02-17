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
import { usePayoutAccount } from "../../../hooks/payout_providers/usePayoutAccount";
import PayoutModal from "./PayoutModal";
import { LiaPassportSolid } from "react-icons/lia";

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
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addAccount, account, loading: payoutLoading } = usePayoutAccount();


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

  const handleDeleteAccount = async () => {
    const result = await deleteUserProfile();
    if (result.success) {
      toast.success("Account deleted successfully.");
      navigate("/");
    } else if (result.message) {
      toast.error(result.message);
    }
  };

  if (loading) return <UserProfileSkeleton />;
  if (error) return <div className="mt-32 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen  md:mx-auto md:container p-5">
      <div className="space-y-5 mt-3">
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              <p
                className="h-40 w-40 rounded-full object-cover border-4 bg-emerald-100 flex items-center justify-center text-5xl font-bold text-emerald-700 uppercase"
              >
                {user?.full_name ? user.full_name.charAt(0) : "U"}
              </p>

            </div>



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
          <div className="">
            <h3 className="font-semibold text-gray-800 ml-2">Account Management</h3>
             <Link to="/auth/landowner/upload-passport">
              <ActionBtn
              icon={<LiaPassportSolid  size={22} />}
              label="Upload Passport"
              color="bg-red-400"
              
              />
              </Link>
            <ActionBtn
              icon={<MdOutlineAccountBalance size={22} />}
              label={account ? "Edit Payout Account" : "Add Payout Account"}
              color="bg-blue-300"
              // Removing the 'link' prop so it uses the 'onClick' logic
              onClick={() => setIsModalOpen(true)}
            />
            <PayoutModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={addAccount}
              initialValue={account?.account_identifier || ""}
            />

            <ActionBtn
              icon={<MdOutlinePassword size={22} />}
              label="Security & Password"
              color="bg-purple-300"
              onClick={() => setPasswordModal(true)}
            />
            {passwordModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                  <h2 className="text-lg font-semibold">Change Password</h2>

                  <input
                    type="password"
                    placeholder="Current password"
                    value={passwordForm.old_password}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, old_password: e.target.value })
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm"
                  />

                  <input
                    type="password"
                    placeholder="New password"
                    value={passwordForm.new_password}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, new_password: e.target.value })
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm"
                  />

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirm_password}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirm_password: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm"
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setPasswordModal(false)}
                      className="px-4 py-2 rounded-xl border text-sm"
                    >
                      Cancel
                    </button>

                    <button
                      disabled={changingPassword}
                      onClick={async () => {
                        if (
                          passwordForm.new_password !==
                          passwordForm.confirm_password
                        ) {
                          toast.error("Passwords do not match");
                          return;
                        }

                        const result = await changeUserPassword(passwordForm);

                        if (result.success) {
                          toast.success("Password changed successfully");
                          setPasswordModal(false);
                          setPasswordForm({
                            old_password: "",
                            new_password: "",
                            confirm_password: "",
                          });
                        } else {
                          toast.error(result.message);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-black text-white text-sm disabled:opacity-50"
                    >
                      {changingPassword ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <ActionBtn
              icon={<HiOutlineDocumentText size={22} />}
              label="Terms & Property Policy"
              color="bg-orange-300"
              link="/terms"
            />

            <ActionBtn
              icon={<MdOutlineContactSupport size={22} />}
              label="Owner Support"
              color="bg-teal-300"
              link="/auth/landowner/support"
            />

            <hr className="my-4 border-gray-100" />

            <ActionBtn
              icon={<AiOutlineLogout size={22} />}
              label="Sign Out"
              color="bg-gray-200"
              onClick={() => setShowLogoutModal(true)}
            />
            {
              showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                  <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
                    <p>Are you sure you want to Logout?</p>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-4 py-2 rounded-xl border text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => handleConfirmLogout()}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )
            }

            <ActionBtn
              icon={<TiUserDelete size={22} />}
              label="Close Owner Account"
              color="bg-red-100"
              textColor="text-red-600"
              onClick={() => setDeleteModal(true)}
            />
            {deleteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
                  <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setDeleteModal(false)}
                      className="px-4 py-2 rounded-xl border text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => handleDeleteAccount()}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}

// Helper Component for scannable actions
const ActionBtn = ({ icon, label, color, textColor = "text-gray-700", onClick, link }) => {
  const content = (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-white border border-gray-50 rounded-2xl hover:shadow-md hover:border-gray-200 transition-all group my-2"
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