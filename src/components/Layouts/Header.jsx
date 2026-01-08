import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/pngs/logo-silver.png";
import { useAuth } from "../../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, role, loading } = useAuth();

  const getAccountRoute = (role) => {
    switch (role) {
      case "STUDENT":
        return "/auth/user/home";
      case "LANDOWNER":
        console.log('its landowner');
        return "/landowner";
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

  const isBlackRoute = blackHeaderPages.includes(location.pathname);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 z-30 w-full px-2 md:px-0 
        transition-all duration-300
        ${isBlackRoute || scrolled
          ? "bg-black text-white shadow-lg py-2 md:py-3"
          : "bg-transparent text-white py-2 md:py-3"
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
          <li><Link to="/workingonit">About</Link></li>
          <li><Link to="/accommodation">Find a Room</Link></li>
          <li><Link to="/workingonit">Rent a Room</Link></li>
          <li><Link to="/workingonit">Contact</Link></li>

          <li className="bg-black text-white  rounded-full border border-stone-700">
            <Link to={user ? getAccountRoute(role) : "/signin"}>
            <button className="p-3">
              {user ? <FaRegUser /> : "Sign In"}
            </button>
            </Link>
          </li>


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
              <Link to="/workingonit">About</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/accommodation">Find a Room</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/workingonit">Rent a Room</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/workingonit">Contact</Link>
            </li>
            {
              !loading && (
                user ? (
                  <li className="bg-black text-white px-3 py-3 border border-white border-2 rounded-full border border-stone-700">
                    <Link to={getAccountRoute(role)}>
                      <FaRegUser />
                    </Link>
                  </li>
                ) : (
                  <li className="bg-black text-white px-6 py-2 rounded-full border border-stone-700">
                    <Link to="/signin">
                      Sign In
                    </Link>
                  </li>
                )
              )
            }



          </ul>
        </div>
      </div>
    </nav>
  );
}
