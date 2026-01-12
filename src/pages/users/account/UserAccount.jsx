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
export default function UserAccount() {
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



  const [activeTab, setActiveTab] = useState("profile");
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setEditValues(user);
      setSelectedAvatar(user.avatarUrl || defaultAvatar);
    }
  }, [user]);

  useEffect(() => {
    const savedAvatarId = localStorage.getItem("selectedAvatarId");
    if (savedAvatarId) {
      const savedAvatar = Characters.find(
        (char) => char.id === savedAvatarId
      );
      if (savedAvatar) {
        setSelectedAvatar(savedAvatar.img);
        setUser((prev) => ({
          ...prev,
          avatarUrl: savedAvatar.img,
        }));
      }
    }
  }, [setUser]);

  const handleSaveProfile = async () => {
    const payload = {
      full_name: editValues.full_name,
      email: editValues.email,
      phone: editValues.phone,
      avatarUrl: selectedAvatar,
    };

    const result = await updateUserProfile(payload);

    if (result.success) {
      setIsEditing(false);
      toast.success("Profile Updated Successfully.")
    } else {
      console.log(result.message);
      toast.error("Profile Updation Failed.")
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
    return <div className="mt-0 text-center text-sm"><UserProfileSkeleton/></div>;
  }

  if (error) {
    return <div className="mt-32 text-center text-red-500">{error}</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen px-5 md:p-6 mt-20 md:mt-0 md:mx-auto md:container">
      {activeTab === "profile" && (
        <div className="space-y-5 mt-3">
          <div className="bg-white rounded-3xl p-6 shadow text-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className={`relative transition-transform duration-300 ${avatarEditMode ? "scale-110" : "scale-100"
                    }`}
                >
                  <img
                    src={selectedAvatar}
                    className="h-52 w-52 rounded-full object-cover"
                  />
                  <button
                    onClick={() => setAvatarEditMode((prev) => !prev)}
                    className="absolute bottom-3 right-3 bg-black border border-white text-white text-xl p-2 rounded-full shadow"
                  >
                    {avatarEditMode ? <FaCheck /> : <CiEdit />}
                  </button>
                </div>

                {avatarEditMode && (
                  <div className="w-full h-28 overflow-x-auto pt-4 avatar-scroll">
                    <div className="flex gap-4 px-1 md:px-6 snap-x snap-mandatory">
                      {Characters.map((char) => {
                        const isActive = selectedAvatar === char.img;
                        return (
                          <button
                            key={char.id}
                            onClick={() => {
                              setSelectedAvatar(char.img);
                              localStorage.setItem(
                                "selectedAvatarId",
                                char.id
                              );
                            }}
                            className={`snap-center flex-shrink-0 transition-all duration-300 ${isActive
                              ? "scale-105"
                              : "scale-95 opacity-70"
                              }`}
                          >
                            <img
                              src={char.img}
                              className={`h-20 w-20 rounded-full object-cover border-2 ${isActive
                                ? "border-black"
                                : "border-transparent"
                                }`}
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
              <label className="text-xs text-neutral-500">Full name</label>
              <input
                disabled={!isEditing}
                value={editValues.full_name || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, full_name: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

              <label className="text-xs text-neutral-500">Email</label>
              <input
                disabled={!isEditing}
                value={editValues.email || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, email: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

              <label className="text-xs text-neutral-500">Phone</label>
              <input
                disabled={!isEditing}
                value={editValues.phone || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, phone: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

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

              <button
                onClick={() => setPasswordModal(true)}
                className="w-full text-left p-2 rounded-xl border hover:bg-neutral-50 flex gap-3 items-center"
              >
                <p className="p-3 bg-emerald-300 rounded-xl"><MdOutlinePassword size={20} /></p> Reset password
              </button>
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
                    <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
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
