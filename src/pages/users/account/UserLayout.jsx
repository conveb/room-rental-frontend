import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { HiMiniHome, HiMiniBars3, HiXMark, HiMagnifyingGlass } from "react-icons/hi2";
import { IoBookmarkOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import colors from "../../../theme/colors";
import Logo from "../../../Assets/pngs/logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";
import { useNotifications } from "../../../context/NotificationContext";

const navItems = [
  { to: "/auth/user/accommodation", label: "Explore", icon: <HiMiniHome /> },
  { to: "/auth/user/bookings", label: "My Stays", icon: <FaRegCalendarCheck /> },
  // { to: "/auth/user/messages", label: "Inbox", icon: <IoChatboxEllipsesOutline /> },
  { to: "/auth/user/account", label: "Account", icon: <FaRegUserCircle /> },
];

const UserLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useAuth(); // Contains email
  const { user: userData } = useUserProfile(); // Contains full_name
  const { unreadCount } = useNotifications();

  return (
    <div className="min-h-screen flex flex-col ">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between container mx-auto z-40">

        {/* LEFT: LOGO & SEARCH */}
        <div className="flex items-end gap-4 lg:gap-8 flex-1">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={Logo} alt="logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg hidden sm:block text-slate-900">Alive Paris</span>
          </Link>


        </div>

        {/* MIDDLE: DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 mx-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: USER ACTIONS & PROFILE */}
        <div className="flex items-center gap-1 md:gap-3 flex-1 justify-end">

          {/* Wishlist Icon */}
          <Link to="/auth/user/saved" className=" p-2 text-slate-600 hover:bg-slate-50 rounded-full transition relative">
            <IoBookmarkOutline className="text-xl" />
          </Link>

          {/* Notifications */}
          <Link to="/auth/user/notifications" className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition">
            <IoIosNotifications className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          {/* Desktop User Glance */}
          <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 capitalize leading-none">
                {userData?.full_name || "Guest User"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                {user?.email}
              </p>
            </div>
            <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
              {userData?.profile_image ? (
                <img src={userData.profile_image} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <FaRegUserCircle className="text-gray-400 text-xl" />
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setOpen(true)} className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-full">
            <HiMiniBars3 className="text-2xl" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl flex flex-col p-6 transition-transform">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl text-slate-900">Menu</span>
              <button onClick={() => setOpen(false)} className="p-2 bg-slate-50 rounded-full text-xl hover:bg-slate-100"><HiXMark /></button>
            </div>

            {/* User Profile Card in Sidebar */}
            <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold text-xl shadow-sm border border-slate-200">
                  {userData?.full_name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-slate-900 truncate capitalize text-lg leading-tight">
                    {userData?.full_name || "Welcome!"}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-1">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                to="/auth/user/account"
                onClick={() => setOpen(false)}
                className="mt-4 block text-center py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                View Profile
              </Link>
            </div>

            <nav className="space-y-2">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all ${isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                      : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  <span className="mr-4 text-2xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pt-16 pb-20 md:pb-6 overflow-auto">
        <Outlet />
      </main>

      {/* BOTTOM NAV (MOBILE) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 m-3 rounded-[1.4rem] bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl z-30">
        <div className="flex justify-around items-center gap-1 h-16 px-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex-1 flex flex-col items-center justify-center text-[9px] p-2 rounded-[1.1rem]"
                style={
                  isActive
                    ? {
                      backgroundColor: colors.primaryColor,
                      color: "white",
                      fontWeight: "600",
                    }
                    : { color: colors.primaryColor }
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

      </nav>
    </div>
  );
};

export default UserLayout;