import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../Assets/pngs/logo-silver.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Pages that need black header background
  const blackHeaderPages = [
    "/accommodation",
    "/student/1",
    "/workingonit",
    '/notifications'

  ];

  const isBlackHeader = blackHeaderPages.includes(location.pathname);

  return (
    <nav
      className={`fixed left-0 right-0 z-30 w-full  px-5 md:px-0 py-4 md:py-2 
        ${isBlackHeader ? "bg-black text-white" : "bg-transparent text-white"}
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between transition-colors duration-300">

        {/* Logo */}
        <a href="/" className="text-lg font-semibold flex items-end gap-2 ">
          <img src={Logo} alt="aliveparis-logo" className="w-10 md:w-14 h-auto" />
          <p className="text-end special-font">
            Alive Paris
          </p>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm items-center opacity-90">
          <li>Home</li>
          <li>
            <a href="/workingonit">
              About
            </a>
          </li>
          <li>
            <a href="/accommodation">Find a Room</a>
          </li>
          <li>
            <a href="/workingonit">
              Rent a Room
            </a>
          </li>
          <li>
            <a href="/workingonit">
              Contact
            </a>
          </li>
          <a href="/signin">
            <li className="bg-black text-white px-6 py-2 rounded-full w-fit border border-[.5px] border-stone-700">
              Sign In
            </li>
          </a>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-3xl cursor-pointer" onClick={() => setOpen(true)}>
          <HiMenu />
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[70%] bg-white text-black shadow-xl transform ${open ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 z-50`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-5 text-3xl" onClick={() => setOpen(false)}>
            <HiX />
          </div>

          <p className="text-center font-light text-2xl mb-10 special-font">
            Alive Paris
          </p>

          {/* Drawer Menu Items */}
          <ul className="flex flex-col gap-6 text-lg px-6 mt-4 text-center items-center">
            <li onClick={() => setOpen(false)}>
              <a href="/workingonit">
                Home
              </a>
            </li>
            <li onClick={() => setOpen(false)}>
              <a href="/workingonit">About</a>
            </li>
            <li onClick={() => setOpen(false)}>
              <a href="/accommodation">Find a Room</a>
            </li>
            <li onClick={() => setOpen(false)}>
              <a href="/workingonit">Rent a Room</a>
            </li>
            <li onClick={() => setOpen(false)}>
              <a href="/workingonit">Contact</a>
            </li>
            <li className="bg-black text-white px-6 py-2 rounded-full w-fit">
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
