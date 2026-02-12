import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Characters } from "./characterCollection";
import defaultAvatar from "../../../Assets/characters/default.jpg";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import UserFeedback from "./UserFeedback";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";

import { MdOutlinePassword } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import { MdFeedback } from "react-icons/md";
import UserProfileSkeleton from "../../skeleton/UserProfileSkeleton";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "../../../hooks/auth/useGoogleAuth";
export default function UserAccount() {
  const navigate = useNavigate();
  const { user: checkProvider, logout } = useAuth();

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



  const [activeTab, setActiveTab] = useState("profile");
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const hasAvatarChanged = Number(selectedAvatar) !== Number(user?.avatar_id);

  const { handleSetPassword, loading: settingPassword } = useGoogleAuth();
  const [googlePasswordModal, setGooglePasswordModal] = useState(false); // 3. New modal state
  const [googlePasswordForm, setGooglePasswordForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setEditValues(user);
      setSelectedAvatar(user.avatar_id || defaultAvatar);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setEditValues(user);
      const initialId = user.avatar_id ? Number(user.avatar_id) : 1;
      setSelectedAvatar(initialId);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    // ✅ Validate Full Name
    if (!editValues.full_name || editValues.full_name.trim() === '') {
      toast.error('Full name is required');
      return;
    }

    // ✅ Validate Phone Number
    if (!editValues.phone || editValues.phone.trim() === '') {
      toast.error('Phone number is required');
      return;
    }
    const payload = {
      full_name: editValues.full_name,
      phone: editValues.phone,
      avatar_id: selectedAvatar,
    };

    const result = await updateUserProfile(payload);

    if (result.success) {
      setIsEditing(false);
      toast.success("Profile Updated Successfully.");
    } else {
      toast.error(result.message || "Profile Updation Failed.");
    }
  };

  const handleGoogleSetPassword = async () => {
    if (googlePasswordForm.new_password !== googlePasswordForm.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // payload matches the setpassword API requirements
      await handleSetPassword({
        password: googlePasswordForm.new_password,
        confirm_password: googlePasswordForm.confirm_password
      });
      setGooglePasswordModal(false);
      setGooglePasswordForm({ new_password: "", confirm_password: "" });
      // Optional: Refresh user data here if needed
    } catch (err) {
      // Error handled by hook's toast
    }
  };


  const handleConfirmLogout = async () => {
    await logout();
    navigate("/");
    setShowModal(false);
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

  if (loading) {
    return <div className="mt-0 text-center text-sm"><UserProfileSkeleton /></div>;
  }

  if (error) {
    return <div className="mt-32 text-center text-red-500">{error}</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen px-5 md:p-6 mt-0 md:mx-auto md:container">
      {activeTab === "profile" && (
        <div className="space-y-5 mt-3">
          <div className="bg-white rounded-3xl p-6 shadow text-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="relative flex flex-col items-center gap-4">
                {/* Main Avatar Display */}
                <div className={`relative transition-transform duration-300 ${avatarEditMode ? "scale-110" : "scale-100"}`}>
                  {/* Main Avatar Display */}
                  <img
                    src={
                      Characters.find((c) => c.id === Number(selectedAvatar))?.img ||
                      defaultAvatar
                    }
                    className="h-52 w-52 rounded-full object-cover border-4 border-white shadow-lg"
                    alt="User Avatar"
                  />

                  {/* The Action Button (Edit / Save) */}
                  {/* Container for the buttons, positioned over the avatar */}
                  <div className="absolute bottom-3 left-0 right-0 px-3 flex justify-between items-center pointer-events-none">

                    {/* 1. LEFT SIDE: Close/Cancel Button */}
                    <div className="pointer-events-auto">
                      {avatarEditMode && !updating && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering any parent clicks
                            setSelectedAvatar(user.avatar_id);
                            setAvatarEditMode(false);
                          }}
                          className="bg-red-500 border border-white text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* 2. RIGHT SIDE: Edit/Save Button */}
                    <div className="pointer-events-auto">
                      <button
                        type="button"
                        onClick={async () => {
                          if (avatarEditMode) {
                            // Logic: If in edit mode, we only save if something actually changed
                            if (hasAvatarChanged) {
                              await handleSaveProfile();
                            }
                            setAvatarEditMode(false);
                          } else {
                            setAvatarEditMode(true);
                          }
                        }}
                        // Disable if updating OR if we are in edit mode but haven't picked a new avatar yet
                        disabled={updating || (avatarEditMode && !hasAvatarChanged)}
                        className={`flex items-center justify-center border border-white text-white p-2 rounded-full shadow-lg transition-all text-xl
        ${updating || (avatarEditMode && !hasAvatarChanged)
                            ? "bg-gray-400 cursor-not-allowed opacity-50"
                            : "bg-black hover:bg-neutral-800"
                          }`}
                      >
                        {updating ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : avatarEditMode ? (
                          <FaCheck className="h-5 w-5" />
                        ) : (
                          <CiEdit className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Avatar Selection Carousel */}
                {avatarEditMode && (
                  <div className="w-full h-28 overflow-x-auto pt-4 avatar-scroll">
                    <div className="flex gap-4 px-1 md:px-6 snap-x snap-mandatory">
                      {Characters.map((char) => {
                        // Compare selectedAvatar ID with the current character ID
                        const isActive = Number(selectedAvatar) === char.id;

                        return (
                          <button
                            key={char.id}
                            onClick={() => {
                              setSelectedAvatar(char.id); // This triggers hasAvatarChanged to become true
                              setEditValues((prev) => ({ ...prev, avatar_id: char.id }));
                            }}
                            className={`snap-center flex-shrink-0 transition-all duration-300 ${Number(selectedAvatar) === char.id ? "scale-110" : "scale-95 opacity-60"
                              }`}
                          >
                            <img
                              src={char.img}
                              className={`h-20 w-20 rounded-full object-cover border-2 ${Number(selectedAvatar) === char.id ? "border-black" : "border-transparent"
                                }`}
                              alt="Avatar Option"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-semibold text-lg first-letter:uppercase">{user.full_name}</h2>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs text-neutral-500">
                  Full name <span className="text-red-500">*</span>
                </label>
                {!isEditing && !user?.full_name && (
                  <span className="text-xs text-red-500">Missing</span>
                )}
              </div>
              <input
                disabled={!isEditing}
                value={editValues.full_name || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, full_name: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />
              {!isEditing && !user?.full_name && (
                <p className="text-xs text-red-500 mt-1">
                  Please edit profile to add your full name
                </p>
              )}

              <label className="text-xs text-neutral-500">Email (Cannot be changed)</label>
              <input
                disabled={true}
                value={user.email || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, email: e.target.value })
                }
                className="w-full no-drop rounded-xl border px-4 py-4 text-xs text-gray-400 md:text-sm disabled:bg-neutral-50"
              />

              <div className="flex justify-between items-center">
                <label className="text-xs text-neutral-500">
                  Phone <span className="text-red-500">*</span>
                </label>
                {!isEditing && !user?.phone && (
                  <span className="text-xs text-red-500">Missing</span>
                )}
              </div>
              <input
                disabled={!isEditing}
                value={editValues.phone || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, phone: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />
              {!isEditing && !user?.phone && (
                <p className="text-xs text-red-500 mt-1">
                  Please edit profile to add your phone number
                </p>
              )}

              <div className="flex gap-2 pt-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={updating}
                      className="flex-1 bg-black text-white rounded-full py-2 text-xs md:text-sm font-semibold disabled:opacity-50"
                    >
                      {updating ? "Saving..." : "Save changes"}
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditValues(user);
                      }}
                      className="flex-1 border rounded-full py-2 text-xs md:text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full border rounded-full py-4 text-xs md:text-sm font-semibold"
                  >
                    Edit profile
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 text-sm p-0 md:px-5 mt-10 md:mt-0">
              <Link to="/auth/user/send_feedback">
                <button className="w-full text-left p-2 rounded-xl border hover:bg-neutral-50 flex gap-3 items-center">
                  <p className="p-3 bg-emerald-300 rounded-xl"><MdFeedback size={20} /></p> Send Feedback
                </button>
              </Link>

              {checkProvider?.auth_provider === "PASSWORD" ? (


                <button
                  onClick={() => setPasswordModal(true)}
                  className="w-full text-left p-2 rounded-xl border hover:bg-neutral-50 flex gap-3 items-center"
                >
                  <p className="p-3 bg-emerald-300 rounded-xl"><MdOutlinePassword size={20} /></p> Reset password
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setGooglePasswordModal(true)}
                    className="w-full text-left p-2 rounded-xl border  flex gap-3 items-center "
                    aria-label="Password reset not available for Google accounts"
                  >
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <FcGoogle size={20} />
                    </div>
                    <div className="text-left">
                      <span className="font-medium ">Set Password</span>
                      <p className="text-xs text-gray-400 mt-1">
                        You authenticated through google - Set password
                      </p>
                    </div>
                  </button>

                  {googlePasswordModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <FcGoogle size={24} />
                          <h2 className="text-lg font-semibold">Create Account Password</h2>
                        </div>
                        <p className="text-sm text-gray-500">
                          Set a password so you can log in without using Google in the future.
                        </p>

                        <input
                          type="password"
                          placeholder="New password"
                          value={googlePasswordForm.new_password}
                          onChange={(e) =>
                            setGooglePasswordForm({ ...googlePasswordForm, new_password: e.target.value })
                          }
                          className="w-full rounded-xl border px-4 py-3 text-sm"
                        />

                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={googlePasswordForm.confirm_password}
                          onChange={(e) =>
                            setGooglePasswordForm({ ...googlePasswordForm, confirm_password: e.target.value })
                          }
                          className="w-full rounded-xl border px-4 py-3 text-sm"
                        />

                        <div className="flex justify-end gap-3 pt-2">
                          <button
                            onClick={() => setGooglePasswordModal(false)}
                            className="px-4 py-2 rounded-xl border text-sm"
                          >
                            Cancel
                          </button>

                          <button
                            disabled={settingPassword}
                            onClick={handleGoogleSetPassword}
                            className="px-4 py-2 rounded-xl bg-black text-white text-sm disabled:opacity-50 flex items-center gap-2"
                          >
                            {settingPassword ? (
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : null}
                            {settingPassword ? "Setting..." : "Set Password"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
              }
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


              <button
                onClick={() => setShowModal(true)}
                className="w-full text-left p-2 rounded-xl border hover:bg-neutral-50 flex gap-3 items-center"
              >
                <p className="p-3 bg-red-300 rounded-xl"><AiOutlineLogout size={20} /></p> Logout
              </button>
              {
                showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                      <h2 className="text-lg font-semibold text-red-600">Logout</h2>
                      <p>Are you sure you want to Logout?</p>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => setShowModal(false)}
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

              <button
                onClick={() => setDeleteModal(true)}
                className="w-full text-left p-2 rounded-xl border hover:bg-red-50  flex gap-3 items-center"
              >
                <p className="p-3 bg-red-500 rounded-xl"><TiUserDelete size={20} /></p> Delete account
              </button>
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
      )}
    </div>
  );
}
