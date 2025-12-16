import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa6";
import colors from "../../../theme/colors";

/* ---------------- MOCK DATA ---------------- */

const mockUser = {
  id: "u_123",
  name: "Alex Carter",
  email: "alex.carter@example.com",
  phone: "+49 123 456 789",
  avatarUrl:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const mockProperties = [
  {
    id: "prop_1",
    name: "Modern Studio Berlin",
    city: "Berlin",
    area: "45m²",
    rooms: "1BR",
    price: 1200,
    amenities: ["WiFi", "AC", "Kitchen"],
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400",
  },
  {
    id: "prop_2",
    name: "Luxury Apartment Munich",
    city: "Munich",
    area: "80m²",
    rooms: "2BR",
    price: 1800,
    amenities: ["WiFi", "Gym", "Pool"],
    image:
      "https://images.pexels.com/photos/1127101/pexels-photo-1127101.jpeg?w=400",
  },
];

const mockBookings = [
  {
    id: "b_1",
    roomType: "Premium Studio",
    city: "Berlin",
    checkIn: "2025-01-10",
    checkOut: "2025-03-10",
    price: 1200,
    status: "Approved",
    landlordApproved: true,
  },
];

const mockPayments = [
  {
    id: "p_1",
    bookingId: "b_1",
    date: "2025-01-10",
    amount: 1200,
    method: "Razorpay",
    status: "Paid",
  },
];

/* ---------------- COMPONENT ---------------- */

const UserProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(mockUser);
  const [properties] = useState(mockProperties);
  const [bookings, setBookings] = useState(mockBookings);
  const [payments] = useState(mockPayments);
  const [favorites, setFavorites] = useState([]);

  const [activeTab, setActiveTab] = useState("account");

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(user);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("landlord");
  const [reportDetails, setReportDetails] = useState("");

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
    <div className="min-h-screen bg-neutral-50 pt-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 pt-6 grid md:grid-cols-12 gap-6">

        {/* ================= LEFT (DESKTOP) ================= */}
        <aside className="hidden md:block md:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-4">
              <img
                src={user.avatarUrl}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="bg-white rounded-3xl shadow divide-y">
            {[
              ["account", "Account"],
              ["bookings", "Bookings"],
              ["payments", "Payments"],
              ["favourites", "Favourites"],
              ["safety", "Safety & Support"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-6 py-4 text-sm ${
                  activeTab === key
                    ? "font-semibold bg-neutral-100"
                    : "text-neutral-600"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ================= RIGHT ================= */}
        <section className="md:col-span-8 space-y-6">

          {/* ACCOUNT */}
          {activeTab === "account" && (
  <div className="bg-white rounded-3xl p-2 shadow space-y-5">

    {/* ================= MOBILE USER HEADER ================= */}
    <div className="md:hidden flex items-center gap-4 p-5 rounded-2xl border-b " style={{ backgroundColor: colors.studentColor }}>
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="h-20 w-20 rounded-full object-cover"
      />
      <div className="text-white">
        <h2 className="text-base  font-semibold ">
          {user.name}
        </h2>
        <p className="text-xs ">
          {user.email}
        </p>
      </div>
    </div>

    {/* ================= PROFILE DETAILS ================= */}
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
)}


          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-3xl p-6 shadow space-y-3">
              <h3 className="font-semibold text-lg">Bookings</h3>
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="border rounded-xl p-4 flex justify-between"
                >
                  <div>
                    <p className="font-medium">{b.roomType}</p>
                    <p className="text-xs text-neutral-500">
                      {b.checkIn} → {b.checkOut}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">€{b.price}</span>
                </div>
              ))}
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-3xl p-6 shadow space-y-3">
              <h3 className="font-semibold text-lg">Payments</h3>
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-xl p-4 flex justify-between"
                >
                  <span>{p.date}</span>
                  <span className="font-semibold">€{p.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* FAVOURITES */}
          {activeTab === "favourites" && (
            <div className="bg-white rounded-3xl p-6 shadow space-y-3">
              <h3 className="font-semibold text-lg">Favourites</h3>
              {properties
                .filter((p) => favorites.includes(p.id))
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 border rounded-xl p-3"
                  >
                    <img src={p.image} className="h-16 w-16 rounded-xl" />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-neutral-500">{p.city}</p>
                    </div>
                    <button onClick={() => toggleFavorite(p.id)}>❤️</button>
                  </div>
                ))}
            </div>
          )}

          {/* SAFETY */}
          {activeTab === "safety" && (
            <div className="bg-white rounded-3xl p-6 shadow space-y-3">
              <h3 className="font-semibold text-lg">Safety & Support</h3>
              <button onClick={() => setShowReportModal(true)}>🚨 Report fake landlord</button>
              <button onClick={() => setShowReportModal(true)}>🚨 Report fake property</button>
              <button>💬 Contact support</button>
              <button>📝 Submit complaint</button>
            </div>
          )}
        </section>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
<nav className="md:hidden fixed bottom-0 inset-x-0 m-3 rounded-[1.4rem] bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl z-50">
  <div className="flex justify-around items-center gap-1 h-16 px-1">

    {[
      { key: "account", label: "Account", icon: <FaUser/> },
      { key: "bookings", label: "Bookings", icon: <FaCalendar/> },
      { key: "payments", label: "Payments", icon: <FaCreditCard/> },
      { key: "favourites", label: "Favourites", icon: <FaHeart/> },
      { key: "safety", label: "Safety", icon: <FaUserShield/> },
    ].map((item) => {
      const isActive = activeTab === item.key;

      return (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className="flex-1 flex flex-col items-center justify-center text-[9px] p-2 rounded-[1.1rem] transition-all"
          style={
            isActive
              ? {
                  backgroundColor: colors.studentColor,
                  fontWeight: "600",
                  color: "white",
                }
              : {
                  color: colors.studentColor,
                }
          }
        >
          <span className="text-xl leading-none">{item.icon}</span>
          <span className="mt-1">{item.label}</span>
        </button>
      );
    })}
  </div>
</nav>


      {/* ================= MODALS ================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
            <h3 className="font-semibold mb-3">Reset password</h3>
            <input
              type="password"
              className="w-full border rounded-xl px-4 py-2 mb-4"
              placeholder="New password"
            />
            <button
              onClick={() => setShowPasswordModal(false)}
              className="w-full bg-black text-white rounded-full py-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="font-semibold mb-3">Submit report</h3>
            <textarea
              className="w-full border rounded-xl px-4 py-2 mb-4"
              rows="4"
              onChange={(e) => setReportDetails(e.target.value)}
            />
            <button
              onClick={() => setShowReportModal(false)}
              className="w-full bg-orange-600 text-white rounded-full py-2"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
