import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/pngs/logo-white.png";
import { useAuth, useSessionHint } from "../../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const sessionHint = useSessionHint();
  const { user, role, loading } = useAuth();

  // ── Role-based account route ─────────────────────────────────────────────
  const getAccountRoute = (role) => {
    switch (role) {
      case "STUDENT": return "/auth/user/accommodation";
      case "LAND_OWNER": return "/auth/landowner";
      case "ADMIN": return "/auth/admin";
      default: return "/signin";
    }
  };

  // ── Route-based appearance ───────────────────────────────────────────────
  const darkBgPages = ["/accommodation", "/student/:id", "/workingonit", "/notifications",'/accommodation-details/:id'];
  const darkTextPages = ["/list-room"];
  const isDarkBgRoute = darkBgPages.includes(location.pathname);
  const isDarkTextRoute = darkTextPages.includes(location.pathname);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Nav styles ───────────────────────────────────────────────────────────
  const navBg = scrolled || isDarkBgRoute ? "bg-black shadow-lg" : "bg-transparent";
  const navText = scrolled || isDarkBgRoute ? "text-white" : isDarkTextRoute ? "text-black" : "text-white";

  // ── Auth button — used in BOTH header and drawer ─────────────────────────
  // compact: true = icon-only pill for mobile header
  const AuthButton = ({ compact = false }) => {
  if (sessionHint || user) {
    return (
      <Link to={getAccountRoute(role)}>
        <div className={`bg-white text-black rounded-full border border-stone-700
                         flex items-center justify-center
                         ${compact ? "w-9 h-9" : "px-4 py-2 gap-2"}`}>
          <FaRegUser size={compact ? 14 : 13} />
          {/* {!compact && <span className="text-sm">Account</span>} */}
        </div>
      </Link>
    );
  }

  return (
    <Link to="/signin">
      <div className={`bg-white text-black rounded-full font-medium
                       flex items-center justify-center transition-all duration-200
                       hover:bg-zinc-100 active:scale-95
                       ${compact ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"}`}>
        Sign In
      </div>
    </Link>
  );
};

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 w-full px-4 md:px-0
          transition-all duration-300 py-3
          ${navBg} ${navText}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-end gap-2 flex-shrink-0">
            <img
              src={Logo}
              alt="aliveparis-logo"
              className={`transition-all duration-300 h-auto ${scrolled ? "w-7" : "w-10"}`}
            />
            <p className="special-font text-end leading-none">Alive Paris</p>
          </Link>

          {/* ── Desktop menu ──────────────────────────────────────────── */}
          <ul className="hidden md:flex gap-8 text-sm items-center opacity-90">
            <li><Link to="/" className="hover:opacity-70 transition-opacity">Home</Link></li>
            <li><Link to="/about" className="hover:opacity-70 transition-opacity">About</Link></li>
            <li><Link to="/accommodation" className="hover:opacity-70 transition-opacity">Find a Room</Link></li>
            <li><Link to="/contact-us" className="hover:opacity-70 transition-opacity">Contact</Link></li>
            <li><AuthButton /></li>
          </ul>

          {/* ── Mobile right side: Sign In + Hamburger ────────────────── */}
          <div className="flex md:hidden items-center gap-3">
            {/* Sign In always visible on mobile — outside the drawer */}
            <AuthButton compact />

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="text-2xl"
            >
              <HiMenu />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-[72%] max-w-xs bg-white text-black
          shadow-2xl transform transition-transform duration-300 z-50 md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <p className="special-font text-lg">Alive Paris</p>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-zinc-500 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-6 py-6 gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/accommodation", label: "Find a Room" },
            { to: "/contact-us", label: "Contact" },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center w-full px-3 py-3 rounded-xl text-base
                           text-zinc-700 hover:bg-zinc-50 hover:text-black
                           transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer footer — full-width CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 border-t border-zinc-100">
          <AuthButton />
        </div>
      </div>
    </>
  );
}