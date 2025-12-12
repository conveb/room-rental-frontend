import heroImg from '../../Assets/Images/heroImg.jpg';
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from '../../Assets/pngs/logo.png';

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Select Price");



  const cities = [
    "Paris", "Lyon", "Marseille", "Toulouse", "Nice",
    "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"
  ];

  const priceRanges = [
    "€0 - €50",
    "€50 - €100",
    "€100 - €200",
    "€200 - €300",
    "€300+"
  ];
  return (
    <>

      <div className="min-h-screen  text-neutral-900">
        {/* NAV */}




        <nav className="absolute inset-x-0 top-6 z-30 max-w-6xl mx-auto px-5 md:px-0 flex items-center justify-between text-white">
          {/* Logo */}
          <div className="text-lg font-semibold flex gap-2 items-center">
            <img src={Logo} alt="aliveparis-logo" className='w-10 h-auto' />
            Alive Paris</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm items-center opacity-90">
            <li>Home</li>
            <li>About</li>
            <li>Find a Room</li>
            <li>Rent a Room</li>
            <li>Contact</li>
            <a href="/signin">
              <li className="bg-black text-white px-6 py-2 rounded-full w-fit" >
                Sign In
              </li>
            </a>
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-3xl" onClick={() => setOpen(true)}>
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

            {/* Drawer Menu Items */}
            <ul className="flex flex-col gap-6 text-lg px-6 mt-4">
              <li onClick={() => setOpen(false)}>Home</li>
              <li onClick={() => setOpen(false)}>About</li>
              <li onClick={() => setOpen(false)}>Find a Room</li>
              <li onClick={() => setOpen(false)}>Rent a Room</li>
              <li onClick={() => setOpen(false)}>Contact</li>
              <a href="/signin">
                <li className="bg-black text-white px-6 py-2 rounded-full w-fit" >
                  Sign In
                </li>
              </a>
            </ul>
          </div>
        </nav>



        {/* HERO */}
        <header className="relative h-screen w-full">
          {/* background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
            aria-hidden
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/25 pointer-events-none z-0" />


          {/* content area */}
          <div className="relative z-20 h-full max-w-6xl mx-auto px-5 md:px-0 flex flex-col justify-start pt-24 md:pt-48">
            {/* LEFT TEXT */}
            <div className="max-w-6xl">
              <h1 className="special-font text-[3rem] md:text-[5.2rem] leading-tight text-white font-extrabold drop-shadow-lg">
                Live Better in Spaces
                <br />
                Made for You
              </h1>

              <p className="mt-12 text-sm md:text-lg text-white/90 max-w-xl">
                Browse modern rooms with quality amenities, trusted hosts, and smooth booking.
              </p>
            </div>
          </div>

          {/* SEARCH BAR AT BOTTOM CENTER */}
          <div className="z-20 absolute bottom-16 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 md:px-6 ">
            <div className="bg-black/50 backdrop-blur-sm rounded-[2rem] md:rounded-full p-2 shadow-lg border border-[.8px] border-white/50">

              <div className="grid grid-cols-3 md:grid-cols-7 gap-1 md:gap-3 items-center text-xs md:text-base relative">

                {/* CITY */}
                <div className="relative col-span-1 md:col-span-2 group">
                  <div className="w-full bg-white px-3 md:px-6 py-3 md:py-4 rounded-full text-center text-black cursor-pointer select-none">
                    Select City
                  </div>

                  {/* Hover Dropdown */}
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-30">
                    {cities.map((city) => (
                      <button
                        key={city}
                        className="px-0 md:px-4 py-2 rounded-xl hover:bg-black/10 text-left"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DATE */}
                <div className="col-span-1 md:col-span-2">
                  <input
                    type="date"
                    className="w-full bg-white px-3 md:px-6 py-3 md:py-4 rounded-full text-center text-black cursor-pointer outline-none appearance-none"
                    defaultValue="2024-06-01"
                  />
                </div>



                {/* PRICE */}
                <div className="relative col-span-1 md:col-span-2 group">
                  {/* Input-like div */}
                  <div className="w-full bg-white px-3 md:px-6 py-3 md:py-4 rounded-full text-center text-black cursor-pointer select-none">
                    {selectedPrice}
                  </div>

                  {/* Dropdown */}
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-30">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedPrice(range)} // update selected price
                        className="px-0 md:px-4 py-2 rounded-xl hover:bg-black/10 text-left"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BUTTON */}
                <button className="col-span-3 md:col-span-1 w-full rounded-full px-8 py-3 bg-stone-950 text-white font-medium border border-white/20">
                  Find
                </button>
              </div>

            </div>

          </div>
        </header>
      </div>

    </>
  );
}
