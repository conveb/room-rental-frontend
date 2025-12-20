import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Characters } from "./characterCollection";
import defaultAvatar from "../../../Assets/characters/default.jpg";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";

const mockUser = {
  id: "u_123",
  name: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+49 123 456 789",
  avatarUrl: defaultAvatar,
};

export default function UserAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // profile or dashboard

  const [user, setUser] = useState(mockUser);
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl);

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => setSelectedAvatar(user.avatarUrl), [user.avatarUrl]);
  useEffect(() => setEditValues(user), [user]);

  const handleSaveProfile = () => {
    setUser(editValues);
    setIsEditing(false);
  };

  const handleLogoutAll = () => alert("Logged out from all devices");

  const handleDeleteAccount = () => {
    if (window.confirm("Delete account permanently?")) navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-2 md:p-6 py-5">
      {/* ====== TABS ====== */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2 rounded-xl font-semibold transition ${
            activeTab === "dashboard"
              ? "bg-black text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`flex-1 py-2 rounded-xl font-semibold transition ${
            activeTab === "profile"
              ? "bg-black text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>

      {/* ====== PROFILE TAB ====== */}
      {activeTab === "profile" && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl p-6 shadow text-center">
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Avatar Section */}
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className={`relative transition-transform duration-300 ${
                    avatarEditMode ? "scale-110" : "scale-100"
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

                {/* Horizontal Avatar Scroller */}
                {avatarEditMode && (
                  <div className="w-full h-28 overflow-x-auto pt-4 avatar-scroll">
                    <div className="flex gap-4 px-1 md:px-6 snap-x snap-mandatory">
                      {Characters.map((char) => {
                        const isActive = selectedAvatar === char.img;
                        return (
                          <button
                            key={char.id}
                            onClick={() => setSelectedAvatar(char.img)}
                            className={`snap-center flex-shrink-0 transition-all duration-300 ${
                              isActive ? "scale-105" : "scale-95 opacity-70"
                            }`}
                          >
                            <img
                              src={char.img}
                              className={`h-20 w-20 rounded-full object-cover border-2 ${
                                isActive ? "border-black" : "border-transparent"
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
                onClick={handleLogoutAll}
                className="w-full text-left p-4 rounded-xl border hover:bg-neutral-50"
              >
                🚪 Logout from all devices
              </button>
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

      {/* ====== DASHBOARD TAB ====== */}
      {activeTab === "dashboard" && (
        <div className="space-y-6 px-2 md:px-0">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-xs text-gray-500">Upcoming Bookings</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">1</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">6</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-xs text-gray-500">Saved Rooms</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">3</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-xs text-gray-500">Pending Refunds</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">€120</p>
            </div>
          </div>

          {/* Upcoming Stay & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Stay
              </h2>
              <div className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Modern Studio Apartment
                  </p>
                  <p className="text-sm text-gray-500">Paris · 12 Aug – 18 Aug</p>
                </div>
                <Link
                  to="/bookings"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  View Booking
                </Link>
              </div>
              <div className="text-sm text-gray-500">
                Check‑in details will be available 24 hours before arrival.
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-start">
                  <span className="text-gray-700">Booking confirmed</span>
                  <span className="text-xs text-gray-400">2d ago</span>
                </li>
                <li className="flex justify-between items-start">
                  <span className="text-gray-700">Invoice ready to download</span>
                  <span className="text-xs text-gray-400">4d ago</span>
                </li>
                <li className="flex justify-between items-start">
                  <span className="text-gray-700">Price dropped on saved room</span>
                  <span className="text-xs text-gray-400">1w ago</span>
                </li>
              </ul>
              <Link
                to="/profile"
                className="inline-block text-sm text-indigo-600 hover:underline"
              >
                Manage notifications
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
