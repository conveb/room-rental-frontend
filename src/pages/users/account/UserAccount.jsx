import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


/* ---------------- MOCK DATA ---------------- */

const mockUser = {
  id: "u_123",
  name: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+49 123 456 789",
  avatarUrl:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
};





/* ---------------- COMPONENT ---------------- */

const UserAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(mockUser);
  const [favorites, setFavorites] = useState([]);


  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(user);

  const [showPasswordModal, setShowPasswordModal] = useState(false);


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
            <img
              src={user.avatarUrl}
              className="h-52 w-52 rounded-full object-cover"
            />
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
