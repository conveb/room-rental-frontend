import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TAG_COLORS = {
    Featured: "bg-zinc-100 text-zinc-500 border-zinc-200",
    New: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Luxury: "bg-amber-50 text-amber-600 border-amber-100",
    Popular: "bg-sky-50 text-sky-600 border-sky-100",
};

export default function PropertyCard({ property}) {
    const cardRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const img = imgRef.current;

        // ── Parallax ───────────────────────────────────────────────────────────
        gsap.fromTo(
            img,
            { yPercent: -15 },
            {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        // ── Hover 3D tilt ──────────────────────────────────────────────────────
        const onMove = (e) => {
            const r = card.getBoundingClientRect();
            const cx = (e.clientX - r.left) / r.width - 0.5;
            const cy = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
                rotateY: cx * 6,
                rotateX: -cy * 6,
                transformPerspective: 900,
                duration: 0.4,
                ease: "power1.out",
            });
        };

        const onLeave = () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.55)",
            });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative flex flex-col bg-white  overflow-hidden
                 cursor-pointer will-change-transform border border-zinc-100
                 hover:shadow-xl hover:shadow-zinc-200/60 transition-shadow duration-500"
            style={{ transformStyle: "preserve-3d", borderRadius: "2.5rem" }}
        >
            {/* Image clip window */}
            <div
                className="relative overflow-hidden flex-shrink-0 w-full h-[15rem] md:h-[30rem]"
            >
                <img
                    ref={imgRef}
                    src={property.cover_image}
                    alt={property.title}
                    className="absolute left-0 w-full object-cover will-change-transform"
                    style={{ height: "130%", top: "-15%" }}
                />

                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Tag */}
                {/* <span
                    className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest
                      px-2.5 py-1 rounded-full border
                      ${TAG_COLORS[property.tag] ?? TAG_COLORS.Featured}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {property.tag}
                </span> */}
                <span className="absolute top-3 right-5 bg-white p-3 md:p-5 rounded-3xl ml-auto flex items-center gap-1 
                           transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <svg width="13" height="13" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 9h12M10 4l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>


            </div>

            {/* Card content */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-5">
                <div className="flex justify-between items-center">

                    <div>
                        <h3
                            className="text-xl md:text-2xl font-bold text-white leading-snug"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {property.title}
                        </h3>
                        <p
                            className="mt-1 text-xs md:text-xs text-zinc-400 tracking-wide"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {property.address}
                        </p>
                    </div>
                    <div>
                        {/* Price */}
                        <span
                            className="bg-white/90 backdrop-blur-sm
                     text-zinc-800 text-xs font-medium px-3 py-1.5 rounded-full
                     border border-zinc-100 shadow-sm"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {property.rent_per_month}
                        </span>
                    </div>
                </div>
                {/* Stats */}
                <div
                    className="flex items-center gap-4 text-xs text-zinc-400 pt-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    <span className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9,22 9,12 15,12 15,22" />
                        </svg>
                        {property.rooms} Rooms
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h4l2 4H4zM20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                        </svg>
                        {property.bathrooms} bath
                    </span>
                    <span className="flex items-center gap-1.5">
                        
                        {property.furnished && (
                            <span className=" text-xs font-bold px-2 py-1 rounded-full">
                                Furnished
                            </span>
                        )}
                    </span>


                </div>
            </div>
        </div>
    );
}