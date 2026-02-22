import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/pngs/logo-silver.png";
import { useAuth } from "../../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, role, loading, sessionHint } = useAuth();

  const getAccountRoute = (role) => {
    switch (role) {
      case "STUDENT":
        return "/auth/user/accommodation";
      case "LAND_OWNER":
        return "/auth/landowner";
      case "ADMIN":
        return "/auth/admin";
      default:
        return "/signin";
    }
  };

  // Pages that always need black header
  const blackHeaderPages = [
    "/accommodation",
    "/student/1",
    "/workingonit",
    "/notifications",
  ];
  const BlackTextPages = [
    "/list-room"
  ];

  const isBlackRoute = blackHeaderPages.includes(location.pathname);
  const isWhiteRoute = BlackTextPages.includes(location.pathname);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine what to show in the button
  const renderAuthButton = () => {
    // If we have a session hint and we're still loading, show account button optimistically
    if (loading && sessionHint) {
      return (
        <li className="bg-black text-white rounded-full border border-stone-700">
          <Link to={getAccountRoute(role)}>
            <button className="p-3">
              <FaRegUser />
            </button>
          </Link>
        </li>
      );
    }

    // If we're still loading and no session hint, show minimal loading indicator
    if (loading) {
      return (
        <li className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-700">
          <ImSpinner9 size={16} className="animate-spin" />
        </li>
      );
    }

    // Final state based on actual user data
    return (
      <li className="bg-black text-white rounded-full border border-stone-700">
        <Link to={user ? getAccountRoute(role) : "/signin"}>
          <button className="p-3">
            {user ? <FaRegUser /> : "Sign In"}
          </button>
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 w-full px-2 md:px-0 
        transition-all duration-300 ${isWhiteRoute ? "text-black" : "text-white"}  ${scrolled ? "text-white" : "text-black"}
        ${isBlackRoute || scrolled
          ? "bg-black  shadow-lg py-2 md:py-3"
          : "bg-transparent  py-2 md:py-3"
        }
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-end gap-2">
          <img
            src={Logo}
            alt="aliveparis-logo"
            className={`transition-all duration-300 ${scrolled ? "w-8" : "w-14"
              } h-auto`}
          />
          <p className="special-font text-end">Alive Paris</p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm items-center opacity-90">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/accommodation">Find a Room</Link></li>
          <li><Link to="/list-room">List your room</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>

          {renderAuthButton()}

        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <HiMenu />
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[70%] bg-white text-black shadow-xl
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Close Button */}
          <div
            className="flex justify-end p-5 text-3xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <HiX />
          </div>

          <p className="text-center font-light text-2xl mb-10 special-font">
            Alive Paris
          </p>

          {/* Drawer Menu Items */}
          <ul className="flex flex-col gap-6 text-lg px-6 text-center items-center">
            <li onClick={() => setOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/accommodation">Find a Room</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/list-room">List your room</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/contact-us">Contact</Link>
            </li>
            
            {/* Mobile auth button */}
            {renderAuthButton()}

          </ul>
        </div>
      </div>
    </nav>
  );
}