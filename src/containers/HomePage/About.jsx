import about from '../../Assets/pngs/about.png'
export default function About() {
    return (
        <section className="min-h-screen bg-[#f5f2eb] ">
            <div className='container mx-auto  flex items-center px-6 py-5 md:py-20 lg:px-16'>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ── Content Column ── */}
                    <div className="flex flex-col justify-center order-2 lg:order-1">

                        {/* Eyebrow */}
                        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#5a7a4a] font-medium mb-8">
                            <span className="w-8 h-px bg-[#5a7a4a]" />
                            Student Living · France
                        </span>

                        {/* Heading */}
                        <h2
                            className="text-5xl lg:text-6xl xl:text-7xl font-light text-[#1e2a1a] leading-[1.05] mb-3 md:mb-6"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            A Room That
                            <br />
                            <em className="italic text-[#5a7a4a]">Feels Like</em>
                            <br />
                            Home.
                        </h2>

                        {/* Body */}
                        <p
                            className="text-[#4a5240] text-xs md:text-base leading-relaxed max-w-md mb-3 md:mb-10"
                        >
                            Thoughtfully furnished rooms for students who deserve more than bare walls and a
                            plastic chair. Each space pairs natural wood, soft greens, and morning light —
                            so you can study hard and still feel at ease.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-1 md:gap-3 mb-3 md:mb-12">
                            {["All Bills Included", "High-Speed Wi-Fi", "Quiet Hours", "Shared Kitchen", "Monthly Lease"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 md:px-4 py-2 rounded-full border border-[#b5c9a1] text-[#3d5230] text-xs tracking-wide bg-[#edf2e6]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Stats row */}
                        {/* <div className="flex gap-10 mb-12 border-t border-[#cdd8c0] pt-8">
                            {[
                                { value: "₹6,500", label: "per month" },
                                { value: "12+", label: "rooms available" },
                                { value: "0.4 km", label: "to campus" },
                            ].map(({ value, label }) => (
                                <div key={label}>
                                    <div
                                        className="text-3xl font-light text-[#1e2a1a]"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {value}
                                    </div>
                                    <div
                                        className="text-[11px] uppercase tracking-widest text-[#7a8f6a] mt-1"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        {/* CTA */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#book"
                                className="inline-flex items-center gap-3 bg-[#3d5230] text-[#edf2e6] text-sm px-8 py-4 rounded-full hover:bg-[#2d3d22] transition-colors duration-300"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Book a Viewing
                                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            {/* <a
                                href="#tour"
                                className="text-sm text-[#5a7a4a] underline underline-offset-4 hover:text-[#3d5230] transition-colors duration-200"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Virtual tour →
                            </a> */}
                        </div>
                    </div>

                    {/* ── Image Column ── */}
                    <div className="relative order-1 lg:order-2">

                        {/* Main image */}
                        <div className="relative rounded-3xl overflow-hidden ">
                            <img
                                src={about}
                                alt="Fresh green room with wooden dining table"
                                className="w-full h-full object-cover p-5"
                            />
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a1a]/30 via-transparent to-[#5a7a4a]/10" /> */}
                        </div>

                        {/* Floating badge — top left */}
                        <div className="absolute -top-4 -left-4 lg:-left-8 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#7ab55c] animate-pulse" />
                            <span
                                className="text-xs text-[#3d5230] font-medium"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Rooms available now
                            </span>
                        </div>

                        {/* Floating review card — bottom left */}
                        <div className="absolute -bottom-6 right-0  md:-left-4 lg:-left-10 bg-[#1e2a1a] rounded-2xl shadow-xl p-3 md:px-5 md:py-4 max-w-[200px]">
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="#7ab55c">
                                        <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                                    </svg>
                                ))}
                            </div>
                            <p
                                className="text-[11px] text-[#b5c9a1] leading-snug"
                                style={{ fontFamily: "'Lora', serif" }}
                            >
                                "Best decision I made as a student."
                            </p>
                            <p
                                className="text-[10px] text-[#5a7a4a] mt-1"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                — Arjun, 2nd year
                            </p>
                        </div>

                        {/* Small accent image — bottom right */}
                        {/* <div className="absolute -bottom-4 right-4 lg:right-0 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-[#f5f2eb]">
                            <img
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80"
                                alt="Wooden table detail"
                                className="w-full h-full object-cover"
                            />
                        </div> */}

                        {/* Decorative dot grid */}
                        <div className="absolute -right-6 top-1/3 grid grid-cols-4 gap-2 opacity-30 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#5a7a4a]" />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}