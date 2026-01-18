import { useState } from "react";

export default function MonthlyRentals() {
const CITIES = [
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80" },
    { name: "Lyon", img: "https://images.pexels.com/photos/30252650/pexels-photo-30252650.jpeg" },
    { name: "Marseille", img: "https://images.pexels.com/photos/15146539/pexels-photo-15146539.jpeg" },
    { name: "Nice", img: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80" },
    { name: "Toulouse", img: "https://images.pexels.com/photos/8283500/pexels-photo-8283500.jpeg" },
    { name: "Lille", img: "https://images.pexels.com/photos/12040634/pexels-photo-12040634.jpeg" },
    { name: "Bordeaux", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" },
    { name: "Montpellier", img: "https://images.pexels.com/photos/32784617/pexels-photo-32784617.jpeg" },
  ];
const [activeCity, setActiveCity] = useState(CITIES[0]);
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-0 py-10">
     <section className="mb-20">
              <div className="relative grid md:grid-cols-7 gap-5 items-start">
                <div className=" md:col-span-2 flex flex-col justify-end h-full">
                  <h2 className="absolute top-0 md:top-20 left-0 z-10 max-w-6xl special-font text-4xl md:text-6xl font-extrabold leading-tight" style={{ WebkitTextStroke: "15px white" }}>Monthly Rentals<br />Available Across<br />France</h2>
                  <h2 className="absolute top-0 md:top-20 left-0 z-10 max-w-6xl special-font text-4xl md:text-6xl font-extrabold leading-tight" >Monthly Rentals<br />Available Across<br />France</h2>

                  <div className="mt-32 md:mt-0">
                    <p className=" mt-6 text-sm text-gray-600 max-w-md" >Monthly rentals are available across France, offering flexible stays, furnished options, and convenient locations for anyone needing a comfortable home for a month or more.</p>

                    <button className="mt-6 px-4 py-2 bg-black text-white rounded"><a href="/accommodation">View all cities</a></button>

                    <div className="mt-6 text-2xl text-gray-400">2025</div>
                  </div>
                </div>

                <div className="md:col-span-3">
            <div className="relative md:w-[470px] h-96 md:h-[700px] bg-gray-200 overflow-hidden rounded-2xl shadow-xl transition-all duration-500">
              {/* Background Image with transition */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url('${activeCity.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

              <div className="absolute bottom-8 left-0 right-0 flex justify-between items-end text-white px-8 w-full">
                <div className="text-4xl md:text-5xl font-bold special-font text-start">
                  <p>
                    <span className="text-lg font-normal opacity-80">View rooms in</span> <br />
                    {activeCity.name}
                  </p>
                </div>

                <a 
                  href={`/accommodation?city=${activeCity.name}`}
                  className="w-16 h-16 md:h-24 md:w-24 rounded-full border border-white/40 hover:bg-white hover:text-black transition-all text-white text-4xl md:text-5xl flex items-center justify-center pb-2"
                >
                  →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CITY GRID SELECTION */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {CITIES.map((city, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCity(city)}
                  className={`relative h-[160px] rounded-xl overflow-hidden group transition-all duration-300 ${
                    activeCity.name === city.name ? "ring-4 ring-black ring-offset-2" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${city.img}')` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center px-3 py-1">
                    <p className="bg-black/60 backdrop-blur-sm px-4 py-2 text-white rounded-lg text-xs special-font font-medium uppercase tracking-widest">
                      {city.name}
                    </p>
                  </div>

                
                </button>
              ))}
            </div>
          </div>
              </div>
            </section>
    </div>
  );
}
