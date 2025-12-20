import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Characters } from "./characterCollection";
import defaultAvatar from "../../../Assets/characters/default.jpg";


/* ---------------- MOCK DATA ---------------- */

const mockUser = {
  id: "u_123",
  name: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+49 123 456 789",
  avatarUrl:defaultAvatar,
};





/* ---------------- COMPONENT ---------------- */

const UserAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(mockUser);
  const [favorites, setFavorites] = useState([]);
  const [avatarEditMode, setAvatarEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl);



  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(user);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    setSelectedAvatar(user.avatarUrl);
  }, [user.avatarUrl]);

  useEffect(() => {
    setEditValues(user);
  }, [user]);

  /* ---------------- ACTIONS ---------------- */

  const handleSaveProfile = () => {
    setUser(editValues);
    setIsEditing(false);
  };

  const handleLogoutAll = () => {
    alert("Logged out from all devices");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Delete account permanently?")) {
      navigate("/");
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-neutral-50 px-2 md:p-6">




      <div className="space-y-5">
        <div className="bg-white rounded-3xl p-6 shadow text-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative flex flex-col items-center gap-4">
              {/* PROFILE IMAGE */}
              <div
                className={`relative transition-transform duration-300 ${avatarEditMode ? "scale-110" : "scale-100"
                  }`}
              >
                <img
                  src={selectedAvatar}
                  className="h-52 w-52 rounded-full object-cover"
                />

                {/* EDIT ICON */}
                <button
                  onClick={() => setAvatarEditMode((prev) => !prev)}
                  className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full shadow"
                >
                  ✏️
                </button>
              </div>

              {/* HORIZONTAL AVATAR SCROLLER */}
              {avatarEditMode && (
                <div className="w-full h-28 overflow-x-auto pt-4 avatar-scroll ">
                  <div className="flex gap-4 px-1 md:px-6 snap-x snap-mandatory">
                    {Characters.map((char) => {
                      const isActive = selectedAvatar === char.img;

                      return (
                        <button
                          key={char.id}
                          onClick={() => {
                            setSelectedAvatar(char.img);
                            setUser((prev) => ({
                              ...prev,
                              avatarUrl: char.img,
                            }));
                          }}
                          className={`snap-center flex-shrink-0 transition-all duration-300 ${isActive ? "scale-110" : "scale-95 opacity-70"
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
        </div>

        {/* ================= ACTION BUTTONS ================= */}
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

        {/* ================= DIVIDER ================= */}
        <hr className="my-2" />

        {/* ================= SECURITY ACTIONS ================= */}
        <div className="space-y-2 text-sm">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-50"
          >
            🔐 Reset password
          </button>

          <button
            onClick={handleLogoutAll}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-50"
          >
            🚪 Logout from all devices
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600"
          >
            🗑 Delete account
          </button>
        </div>
      </div>







    </div>
  );
};

export default UserAccount;
