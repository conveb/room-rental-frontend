import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyCard from "../../components/PropertyCard";
import { PROPERTIES } from "../../components/PropertiesData";
import { Link } from "react-router-dom";
import { useProperties } from "../../hooks/property/useProperties";
import PropertyCardSkeleton from "../../pages/skeleton/PropertyCardSkeleton";

gsap.registerPlugin(ScrollTrigger);

const Arrow = () => (
    <svg
        width="15" height="15" viewBox="0 0 18 18" fill="none"
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        stroke="currentColor"
    >
        <path d="M3 9h12M10 4l5 5-5 5" />
    </svg>
);

export default function PropertiesSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const btnRef = useRef(null);
    const btnFillRef = useRef(null);
    const dividerRef = useRef(null);

    const {
        loading,
        error,
        filters,
        filteredProperties,
        handleFilterChange,
        applyFilters,
        resetFilters,
    } = useProperties();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Heading word reveal ────────────────────────────────────────
            const words = headingRef.current.querySelectorAll(".word");
            gsap.fromTo(
                words,
                { y: "110%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // ── Button: slide in → fill sweeps right to left ───────────────
            const btnTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            btnTl
                .fromTo(
                    btnRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    0.35
                )
                .fromTo(
                    btnFillRef.current,
                    { x: "101%" },
                    { x: "0%", duration: 0.55, ease: "power3.inOut" },
                    0.75
                );

            // ── Divider draws across ───────────────────────────────────────
            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);



    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

                .word-clip { overflow: hidden; display: inline-block; vertical-align: bottom; }
                .word      { display: inline-block; }

                /* Hover: slide fill back out to the right */
                .btn-view:hover .btn-fill {
                    transform: translateX(101%) !important;
                    transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
                }
                .btn-fill {
                    transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative bg-white px-8 sm:px-12 lg:px-16 py-2 md:py-16 container mx-auto"
            >
                {/* Header row */}
                <div className="flex items-end justify-between mb-6 gap-6">
                    <h2
                        ref={headingRef}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-800 leading-[1.1]"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        {["Explore", "our", "properties"].map((word) => (
                            <span key={word} className="word-clip mr-[0.22em]">
                                <span className="word">{word}</span>
                            </span>
                        ))}
                    </h2>

                    {/*
                        Button layers (bottom → top):
                        1. Black text label   — always visible, shows through when fill is gone
                        2. btn-fill           — black bg + white text, slides over layer 1
                    */}
                    <Link
                        ref={btnRef}
                        to="/accommodation"
                        className="btn-view relative flex-shrink-0 overflow-hidden
             rounded-full border border-zinc-900 px-6 py-3"
                        style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
                    >
                        {/* Layer 1 — black text, always underneath */}
                        <span className="relative flex items-center gap-2 text-sm font-medium text-zinc-900">
                            View all
                            <Arrow />
                        </span>

                        {/* Layer 2 — black fill with white text, slides in on reveal, out on hover */}
                        <span
                            ref={btnFillRef}
                            className="btn-fill absolute inset-0 bg-zinc-900 rounded-full
                                       flex items-center justify-center gap-2
                                       text-sm font-medium text-white"
                            style={{ transform: "translateX(101%)" }}
                        >
                            View all
                            <Arrow />
                        </span>
                    </Link>
                </div>

                {/* Divider */}
                <div
                    ref={dividerRef}
                    className="w-full h-px bg-zinc-100 mb-12"
                    style={{ transformOrigin: "left center" }}
                />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <PropertyCardSkeleton key={i} />
                        ))
                        :
                        filteredProperties.slice(0, 4).map((property) => (
                            <Link
                                key={property.id}
                                to={`/accommodation-details/${property.id}`}  // ← adjust to match your route
                            >
                                <PropertyCard
                                    property={property}
                                />
                            </Link>
                        ))
                    }
                </div>
                {/* Mobile view all */}
                <div className="mt-12 flex justify-center sm:hidden">
                    <Link
                        to="/accommodation"
                        className="flex items-center gap-2 rounded-full border border-zinc-200
             px-8 py-3 text-sm text-zinc-500"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        View all properties
                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor"
                                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
}