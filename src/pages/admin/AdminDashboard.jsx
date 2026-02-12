import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  addLocationAPI,
  deleteLocationsApi,
  getBookingsAPI,
  approvePropertyAPI,
} from "../../services/allAPI";
import { PiStudent } from "react-icons/pi";
import { FaPersonShelter } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineGroups3, MdOutlineLibraryBooks } from "react-icons/md";
import { MdImportantDevices } from "react-icons/md";
import SkeletonAdmin from "../skeleton/skeletonAdmin";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import { Link } from "react-router-dom";
import { useProperties } from "../../hooks/property/useProperties";
import ImgSkeleton from '../../Assets/pngs/img_skeleton.png'
import { getAvatarColor } from "./getAvatarColor";
import { useBlockUser } from "../../hooks/users/useBlockUser";
import StudentDetailsModal from "./components/StudentDetailsModal";
import { useAllBookings } from "../../hooks/bookings/useAllBookings";
import { Characters } from '../users/account/characterCollection';
import { toast } from "sonner";
import NoBookings from "../skeleton/NoBookings";
import { FiCalendar } from "react-icons/fi";
import { RiSecurePaymentFill } from "react-icons/ri";
import Title from "../../components/Title";
export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // ---------------- Users Hook ----------------
  const {
    users,
    loading,
    totalUsers,
    studentsCount,
    landOwnersCount,
  } = useAdminUsers(activeTab);

  const { filteredProperties: listProperties, loading: propertiesLoading, } = useProperties();


  // ---------------- State ----------------
  const [properties, setProperties] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");


  // ---------------- Filters ----------------
  const filteredUsers = users
    .filter(
      u =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => roleFilter === "ALL" || u.role === roleFilter);

  const filteredProperties = properties.filter(
    p =>
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(search.toLowerCase())
  );



  const fetchProperties = () => {
    try {
      setProperties(listProperties); // ✅ NO .data
    } catch (err) {
      toast.error(err);
    }
  };





  const deleteLocation = async (id) => {
    try {
      await deleteLocationsApi(id);
      fetchProperties();
    } catch (err) {
      toast.error(err);
    }
  };

  const approveProperty = async (id) => {
    try {
      await approvePropertyAPI(id);
      fetchProperties();
    } catch (err) {
      toast.error(err);
    }
  };
  const { blockUser, blocking } = useBlockUser();

  const [showDetails, setShowDetails] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");

  const { bookings, loading: bookingsLoading, error } = useAllBookings();
  
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  const recentData = [...bookings]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);


  const renderOverview = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card title="Students" value={studentsCount} icon={PiStudent} color={'bg-sky-200'} />
        <Card title="Landowners" value={landOwnersCount} icon={FaPersonShelter} color={'bg-emerald-200'} />
        <Card title="Total Users" value={totalUsers} icon={IoIosPeople} color={'bg-purple-200'} />
        <Card title="Bookings" value={bookings.length} icon={MdOutlineLibraryBooks} color={'bg-orange-200'} />
      </div>
      <Link to={'/auth/admin/manage_constants'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-teal-300 p-3 md:p-5 rounded-xl">
            <MdImportantDevices size={25} />
          </div>
          <div className="">
            <p>Manage Constants</p>
            <p className="text-xs text-stone-400">Add Country , Add Locations , Add Amenities </p>
          </div>
        </div>
      </Link>
      <Link to={'/auth/admin/groups&permissions'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-red-300 p-3 md:p-5 rounded-xl">
            <MdOutlineGroups3  size={25} />
          </div>
          <div className="">
            <p>Groups & Permissions</p>
            <p className="text-xs text-stone-400">Handle Groups and Permissions here.</p>
          </div>
        </div>
      </Link>
      <Link to={'/auth/admin/payment-providers'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-lime-300 p-3 md:p-5 rounded-xl">
            <RiSecurePaymentFill  size={25} />
          </div>
          <div className="">
            <p>Payout Providers</p>
            <p className="text-xs text-stone-400">Easily change payout providers here.</p>
          </div>
        </div>
      </Link>


      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
          {
            recentData && recentData.length > 0 && (
              <Link
                to="/auth/admin/view_bookings"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                View All
              </Link>
            )}
        </div>

        {/* DESKTOP VIEW (Table) - Hidden on small screens */}
        <div className="hidden md:block overflow-x-auto">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left border-collapse">
              {/* Ensure your Table Header matches the new 5-column layout */}
              {
                recentData && recentData.length > 0 && (

                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ref No</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Property</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                )}
              <tbody>
                {recentData && recentData.length > 0 &&
                  recentData.slice(0, 6).map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors border-b last:border-0">
                      <td className="p-4 font-medium text-gray-700">
                        <div className="flex flex-col">
                          <span className="text-sm">{booking.reference_no}</span>
                          <span className="text-[10px] text-gray-400 font-normal uppercase">ID: {booking.id.slice(0, 8)}</span>
                        </div>
                      </td>

                      <td className="p-4 text-gray-600 truncate max-w-[180px]">
                        {booking.property_title}
                      </td>

                      <td className="p-4 text-gray-800 font-semibold">
                        €{parseFloat(booking.total_rent_amount).toLocaleString()}
                      </td>

                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(booking.created_at).toLocaleDateString(undefined, {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col items-start gap-1">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`text-[9px] font-bold ml-1 ${booking.payment_status === 'UNPAID' ? 'text-red-500' : 'text-green-500'}`}>
                            {booking.payment_status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                }

                {(!recentData || recentData.length === 0) && (
                  <tr>
                    <td colSpan="5" className="p-5 w-full">
                      <div className="flex flex-col items-center justify-center text-center">
                        <NoBookings />
                      </div>
                    </td>
                  </tr>
                )}
                
              </tbody>
            </table>

            {/* VIEW ALL BUTTON SECTION */}
            {recentData.length > 6 && (
              <div className="p-3 border-t bg-gray-50/50 flex justify-center">
                <button
                  onClick={() => {/* Navigate to full bookings page */ }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                >
                  VIEW ALL BOOKINGS
                  <i className="pi pi-arrow-right text-[10px]"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE VIEW (Stacked Cards) - Hidden on medium+ screens */}
        <div className="md:hidden divide-y divide-gray-100">
          {bookingsLoading ? ("Loading Data") : (
            <>
              {recentData.length > 0 ? (
                recentData.map((booking) => (
                  <div key={booking.id} className="p-4 active:bg-gray-50 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {booking.reference_no}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {booking.property_title}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className={`text-[9px] font-bold ${booking.payment_status === 'UNPAID' ? 'text-red-500' : 'text-green-500'}`}>
                          {booking.payment_status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-3">
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Stay Period</p>
                        <p className="text-xs text-gray-600 font-medium">
                          {new Date(booking.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(booking.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          €{parseFloat(booking.total_rent_amount).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Booked: {new Date(booking.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">No recent bookings found</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );


  const renderUsers = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      <div className="flex items-center gap-2 w-full text-sm">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded-md flex-1 min-w-0"
        />

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded-md w-[100px] sm:w-auto"
        >
          <option value="ALL">All</option>
          <option value="STUDENT">Student</option>
          <option value="LAND_OWNER">Landowner</option>
        </select>
      </div>

      {loading ? (
        <SkeletonAdmin />
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map(u => {

          const character = Characters.find((c) => String(c.id) === String(u.avatar_id));

          return (
            <div
              key={u.id}
              className="relative border p-2 rounded-2xl flex gap-3 items-center cursor-pointer"
              onClick={() => {
                setSelectedUser(u);
                setShowDetails(true);
              }}


            >

              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden text-lg font-semibold text-black ${u.avatar ? "bg-gray-200" : getAvatarColor(u.full_name)
                  }`}
              >
                {u.avatar_id && character ? ( // Added check for character existence
                  <img
                    src={character.img}
                    alt={u.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  u.full_name?.charAt(0).toUpperCase()
                )}
              </div>

              {/* User Info */}
              <div>
                <p className="font-medium">{u.full_name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-xs text-gray-400">{u.role}</p>
              </div>

              {/* Status */}
              <span
                className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-2xl ${u.is_active ? "bg-green-500" : "bg-red-200"
                  }`}
              >
                {u.is_active ? "Active" : "Blocked"}
              </span>
            </div>
          )
        })
      )}
      {showDetails && selectedUser && (
        <StudentDetailsModal
          id={selectedUser.id}
          avatar_id={selectedUser.avatar_id}
          role={selectedUser.role}
          onClose={() => {
            setShowDetails(false);
            setSelectedUser(null);
          }}
          onBlock={() => {
            setShowBlockModal(true);
          }}
        />
      )}


      {/* BLOCK MODAL */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">

            <h3 className="text-lg font-semibold">Block User</h3>
            <p className="text-sm text-gray-500">
              {selectedUser?.full_name}
            </p>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-xl p-3 text-sm resize-none"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setReason("");
                  setSelectedUser(null);
                }}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                disabled={blocking || !reason}
                onClick={async () => {
                  const success = await blockUser(selectedUser.id, {
                    is_active: false,
                    reason,
                  });

                  if (success) {
                    setShowBlockModal(false);
                    setReason("");
                    setSelectedUser(null);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white disabled:opacity-50"
              >
                {blocking ? "Blocking..." : "Block"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );





  const renderProperties = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Properties</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded-md w-full"
      />

      {propertiesLoading ? (
        <p>Loading properties...</p>
      ) : listProperties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        listProperties.map(p => (
          <div
            key={p.id}
            className="border p-2 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3"
          >
            {/* Left */}
            <div className="flex gap-3 items-center">
              <img
                src={p.cover_image}
                alt={p.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ImgSkeleton;
                }}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div>
                <p className="font-medium">{p.title || "Unnamed property"}</p>

                {/* FIX START: Access the nested location_name property */}
                <p className="text-sm text-gray-500">
                  {p.location?.location_name || p.city || "No location"}
                </p>
                {/* FIX END */}

                <p className="mt-2 font-medium">
                  €{p.rent_per_month} / month
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              
                <Link
                            to={`/auth/admin/accommodation-details/${p.id}`}
                            key={p.id}
                            className="flex flex-col h-full" // 1. Ensure the link container takes full height
                          >

                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
                  >
                  View
                </button>
                  </Link>
              
              <button
                onClick={() => deleteLocation(p.id)}
                className="bg-red-500 text-white px-4 py-1 md:py-2 rounded-lg w-full md:w-auto"
              >
                Delete
              </button>
            </div>
          </div>

        ))
      )}
    </div>
  );


  return (
    <>
      <Title>
        <title>Admin Console | Dashboard</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Title>
      <div className="min-h-screen  md:p-6">
        <div className="max-w-7xl mx-auto space-y-0 md:space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold ">Admin Control Center</h1>
          <p className="text-[10px] md:text-sm text-stone-500 pb-2">This dashboard gives a quick overview of total students, landowners, users, and bookings, along with recent booking activity for easy monitoring.
          </p>

          <div className="flex bg-white rounded-3xl p-2 gap-2">
            {["overview", "users", "properties"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-2xl text-sm md:text-md ${activeTab === tab ? "bg-black text-white" : "bg-gray-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && renderOverview()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "properties" && renderProperties()}
        </div>
      </div>
    </>
  );
}

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-2 md:p-3 rounded-xl shadow flex items-center gap-5">
    {Icon && (
      <div className={`p-3 rounded-xl ${color}  text-gray-700`}>
        <Icon size={22} />
      </div>
    )}
    <div>
      <p className=" text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>

  </div>
);

