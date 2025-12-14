export default function PerfectSpace() {
  return (
    <section className="pb-10 relative">
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <div className="md:col-span-2">
          <div className="relative h-96 md:h-[600px] rounded overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-black/35" />

            <h3 className="absolute top-5 right-5 md:right-10 md:top-10 special-font text-end text-4xl md:text-6xl font-extrabold text-white leading-tight">
              A Smarter Way<br />
              to Rent & Live
            </h3>

            {/* horizontal mini overlay items */}
            <div className="absolute left-0 right-0 bottom-5 md:bottom-20 flex justify-between items-center gap-4 bg-white/10 backdrop-blur-sm py-4 px-5 md:px-20">
              <div className="w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">
                  Verified Student Rooms
                </div>
                <div className="text-xs opacity-80">
                  Safe, inspected spaces designed for student living
                </div>
              </div>

              <div className="w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">
                  Flexible Monthly Stays
                </div>
                <div className="text-xs opacity-80">
                  Rent monthly without long-term contracts
                </div>
              </div>

              <div className="w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">
                  Near Universities
                </div>
                <div className="text-xs opacity-80">
                  Live close to campuses and city hotspots
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col justify-between px-5 md:pr-32 text-end">
          <h2 className="special-font text-4xl md:text-5xl font-extrabold leading-tight">
            Discover New Way<br />
            to Rent Student<br />
            Rooms in France
          </h2>

          <div className="flex flex-col justify-end text-end gap-5">
            <div className="text-sm text-gray-600">
              Finding student accommodation doesn’t have to be stressful. Browse
              trusted listings, book instantly, and move into fully furnished
              rooms tailored for students. No hidden fees, no complicated
              paperwork — just simple, secure renting.
            </div>
            <div className="text-gray-400 text-2xl">2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}
