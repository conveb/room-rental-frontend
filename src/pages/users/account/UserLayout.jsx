import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { HiMiniHome, HiMiniBars3, HiXMark, HiMagnifyingGlass } from "react-icons/hi2";
import { IoBookmarkOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import colors from "../../../theme/colors";
import Logo from "../../../Assets/Images/logo.jpg";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";
import { useNotifications } from "../../../context/NotificationContext";
import { Characters } from "./characterCollection";

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
      <header className="fixed top-0 left-0 right-0   bg-white border-b border-gray-100   z-40">
        <div className="container mx-auto flex items-center justify-between  h-16">

          {/* LEFT: LOGO & SEARCH */}
          <div className="flex justify-end gap-4 lg:gap-8 flex-1">
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

            {/* Desktop User Glance */}
            <div className="hidden md:flex items-center gap-3 mr-2 pr-4 border-r border-gray-100">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 capitalize leading-none">
                  {userData?.full_name || "Guest User"}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {user?.email}
                </p>
              </div>
              <div className="border border-black border-2 p-[2px] rounded-full">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                  {userData?.avatar_id ? (
                    <img
                      src={Characters.find((c) => c.id === Number(userData.avatar_id))?.img}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : userData?.full_name ? (
                    // Show first letter if name exists
                    <span className="text-gray-700 font-bold uppercase text-2xl">
                      {userData.full_name.charAt(0)}
                    </span>
                  ) : (
                    // Fallback to icon if absolutely no data is available
                    <FaRegUserCircle className="text-gray-400 text-xl" />
                  )}
                </div>
              </div>
            </div>

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

          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}


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