import heroImg from "../../Assets/Images/hero.jpg";

export default function HeroOne() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Root: full screen, 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-screen h-screen overflow-hidden bg-[#f5f2eb]">
        
        {/* ── LEFT SIDE: HERO CONTENT ── */}
        <div className="flex flex-col justify-center px-8 lg:pl-28 pt-16">
          <div className="max-w-[600px]">
            {/* Eyebrow */}
            <p className="font-playfair text-[20px] text-[#1a1a1a] mb-6">
              Alive Paris
            </p>

            {/* H1 Headings */}
            <h1 className="font-playfair text-[#1a1a1a] leading-[1.06] text-[48px] md:text-[66px] font-bold">
              Find Affordable Monthly
            </h1>
            <h1 className="font-playfair text-[#1a1a1a] leading-[1.1] text-[48px] md:text-[66px] font-normal italic mb-7">
              Rooms Across France
            </h1>

            {/* Subtitle */}
            <p className="font-dm text-[16px] text-[#1a1a1a] leading-relaxed mb-12 max-w-[430px]">
              Browse modern rooms with quality amenities, trusted hosts,
              and smooth booking.
            </p>

            {/* Search Rooms Button */}
            <button className="group flex items-center gap-4 border border-[#1a1a1a] rounded-full pl-7 pr-[7px] py-[7px] w-fit bg-transparent hover:bg-[#1a1a1a] transition-colors duration-300">
              <span className="font-dm text-[16px] text-[#1a1a1a] group-hover:text-white">Search Rooms</span>
              <span className="w-[46px] h-[46px] rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9H14.5M10 4.5L14.5 9L10 13.5" stroke="#EDE8D8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ── RIGHT SIDE: Paris Photo ── */}
        <div className="relative h-full w-full hidden lg:block">
          <img 
            src={heroImg} 
            alt="Paris" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </>
  );
}