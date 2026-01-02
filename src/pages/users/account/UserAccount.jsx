import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Characters } from "./characterCollection";
import defaultAvatar from "../../../Assets/characters/default.jpg";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import UserFeedback from "./UserFeedback";
import { useAuth } from "../../../context/AuthContext";


// Main UserAccount component
const mockUser = {
  id: "u_123",
  name: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+49 123 456 789",
  avatarUrl: defaultAvatar,
};

export default function UserAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(mockUser);
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(user);
  const [showModal, setShowModal] = useState(false);
  const {logout} = useAuth();
  useEffect(() => setSelectedAvatar(user.avatarUrl), [user.avatarUrl]);
  useEffect(() => setEditValues(user), [user]);

  const handleSaveProfile = () => {
    setUser(editValues);
    setIsEditing(false);
  };

  const handleConfirmLogout = async () => {
    await logout();
    setShowModal(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Delete account permanently?")) navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-5 md:p-6  mt-20 ">
      {/* ====== TABS ====== */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
        <button
          className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${activeTab === "profile"
            ? "bg-black font-medium text-white"
            : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${activeTab === "feedback"
            ? "bg-black font-medium text-white"
            : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("feedback")}
        >
          Feedbacks
        </button>
      </div>

      {/* ====== FEEDBACK TAB ====== */}
      {activeTab === "feedback" && <UserFeedback />}

      {/* ====== PROFILE TAB ====== */}
      {activeTab === "profile" && (
        <div className="space-y-5 mt-3">
          <div className="bg-white rounded-3xl p-6 shadow text-center">
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Avatar Section */}
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

                {/* Avatar Selection */}
                {avatarEditMode && (
                  <div className="w-full h-28 overflow-x-auto pt-4 avatar-scroll">
                    <div className="flex gap-4 px-1 md:px-6 snap-x snap-mandatory">
                      {Characters.map((char) => {
                        const isActive = selectedAvatar === char.img;
                        return (
                          <button
                            key={char.id}
                            onClick={() => setSelectedAvatar(char.img)}
                            className={`snap-center flex-shrink-0 transition-all duration-300 ${isActive ? "scale-105" : "scale-95 opacity-70"
                              }`}
                          >
                            <img
                              src={char.img}
                              className={`h-20 w-20 rounded-full object-cover border-2 ${isActive ? "border-black" : "border-transparent"
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
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs text-neutral-500">Full name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={editValues.name}
                onChange={(e) =>
                  setEditValues({ ...editValues, name: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

              <label className="text-xs text-neutral-500">Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={editValues.email}
                onChange={(e) =>
                  setEditValues({ ...editValues, email: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

              <label className="text-xs text-neutral-500">Phone</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={editValues.phone}
                onChange={(e) =>
                  setEditValues({ ...editValues, phone: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-4 text-xs md:text-sm disabled:bg-neutral-50"
              />

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-black text-white rounded-full py-2 text-xs md:text-sm font-semibold"
                    >
                      Save changes
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

            {/* Security Actions */}
            <div className="space-y-2 text-sm p-0 md:px-5 mt-10 md:mt-0">
              <button className="w-full text-left p-4 rounded-xl border hover:bg-neutral-50">
                🔐 Reset password
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="w-full text-left p-4 rounded-xl border hover:bg-neutral-50"
              >
                🚪 Logout from all devices
              </button>
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                  <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Confirm Logout
                    </h2>

                    <p className="text-sm text-gray-600">
                      Are you sure you want to logout from all devices?
                      This will end all active sessions.
                    </p>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleConfirmLogout}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left p-4 rounded-xl border hover:bg-red-50 text-red-600"
              >
                🗑 Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
