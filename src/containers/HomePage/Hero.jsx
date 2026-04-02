import { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Reusable dropdown that closes when clicking outside
function Dropdown({ label, value, options, onSelect, onClear }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full ">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full bg-white px-3 md:px-6 py-3 md:py-4 rounded-full text-center
                    text-black cursor-pointer select-none transition-all
                    ${open ? "ring-2 ring-black/20" : ""}
                    ${value ? "font-medium" : "text-gray-400"}`}
      >
        {value || label}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl
                        border border-black/5 p-2 z-50 max-h-64 overflow-y-auto">
          {/* Clear option if something is selected */}
          {value && (
            <button
              type="button"
              onClick={() => { onClear(); setOpen(false); }}
              className="w-full px-4 py-2 rounded-xl text-left text-xs text-gray-400
                         hover:bg-gray-50 mb-1 border-b border-gray-100"
            >
              Clear selection
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onSelect(opt.value); setOpen(false); }}
              className={`w-full px-4 py-2.5 rounded-xl text-left text-sm transition-colors
                          hover:bg-black/5
                          ${value === opt.value ? "bg-black text-white hover:bg-black/80" : "text-black"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  const [selectedCity,   setSelectedCity]   = useState("");
  const [selectedDate,   setSelectedDate]   = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const cityOptions = [
    "Paris", "Lyon", "Marseille", "Toulouse", "Nice",
    "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille",
  ].map((c) => ({ label: c, value: c }));

  const priceOptions = [
    { label: "Up to €50",  value: "50"   },
    { label: "Up to €100", value: "100"  },
    { label: "Up to €200", value: "200"  },
    { label: "Up to €300", value: "300"  },
    { label: "€300+",      value: "9999" },
  ];

  const handleFind = () => {
    const params = new URLSearchParams();
    if (selectedCity)   params.set("city",   selectedCity);
    if (selectedDate)   params.set("date",   selectedDate);
    if (selectedBudget) params.set("budget", selectedBudget);
    navigate(`/accommodation?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <header className="relative h-screen w-full">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover "
          style={{ backgroundImage: `url('https://res.cloudinary.com/dlfqobh58/image/upload/v1773922548/Alive_paris/xixgvlgg2q7tjx819nvm.png')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/30 to-black/25 pointer-events-none z-0" />

        {/* Hero text */}
        <div className="relative z-20 h-full max-w-6xl mx-auto px-5 md:px-0 flex flex-col justify-start pt-32 md:pt-48">
          <div className="max-w-6xl">
            <h1 className="special-font text-[2.5rem] md:text-[5.2rem] leading-tight text-white font-extrabold drop-shadow-lg">
              Find Affordable Monthly Rooms Across France
            </h1>
            <p className="mt-6  text-sm md:text-lg text-white/90 max-w-xl">
              Browse modern rooms with quality amenities, trusted hosts, and smooth booking.
            </p>
            <Link to="/accommodation" className="inline-block mt-6">
            <button className="group flex items-center gap-4 bg-white border hover:border-white rounded-full pl-7 pr-[7px] py-[7px] w-fit bg-transparent hover:bg-transparent transition-colors duration-300">
             <p className="px-3 py-2 rounded-full text-center text-sm md:text-base text-black group-hover:text-white">
              Search Rooms
              </p>
              <span className="bg-black group-hover:bg-white p-3 rounded-full text-white group-hover:text-black"><FaArrowRight /></span> 
            </button>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div className="z-20 absolute bottom-16 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 md:px-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-[2rem] md:rounded-full p-2 shadow-lg border border-white/20">
            <div className="grid grid-cols-3 md:grid-cols-7 gap-1 md:gap-2 items-center text-xs md:text-sm">

              {/* City */}
              <div className="col-span-1 md:col-span-2">
                <Dropdown
                  label="Select City"
                  value={selectedCity}
                  options={cityOptions}
                  onSelect={setSelectedCity}
                  onClear={() => setSelectedCity("")}
                />
              </div>

              {/* Date */}
              <div className="col-span-1 md:col-span-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-white px-3 md:px-6 py-3 md:py-4 rounded-full
                             text-center text-black outline-none appearance-none cursor-pointer
                             [color-scheme:light]"
                />
              </div>

              {/* Price */}
              <div className="col-span-1 md:col-span-2">
                <Dropdown
                  label="Select Price"
                  value={selectedBudget
                    ? priceOptions.find((o) => o.value === selectedBudget)?.label
                    : ""}
                  options={priceOptions}
                  onSelect={setSelectedBudget}
                  onClear={() => setSelectedBudget("")}
                />
              </div>

              {/* Find button */}
              <button
                type="button"
                onClick={handleFind}
                className="col-span-3 md:col-span-1 w-full rounded-full px-6 py-3 md:py-4
                           bg-stone-950 text-white font-medium border border-white/20
                           hover:bg-stone-800 active:scale-95 transition-all"
              >
                Find
              </button>

            </div>
          </div>
        </div>

      </header>
    </div>
  );
}