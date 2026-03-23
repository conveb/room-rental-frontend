import { useRef } from "react";
import { useHeroBgAnimation } from "../../gsap/Useherobganimation";
import { useHeroTextReveal } from "../../gsap/UseHeroTextReveal";
import HeroSvg from '../../Assets/svgs/herosvg.svg';

// ─── Replace these with your actual assets / copy ────────────────────────────
const BG_IMAGE =
    'https://res.cloudinary.com/dlfqobh58/image/upload/v1773922548/Alive_paris/xixgvlgg2q7tjx819nvm.png';

const HEADLINE_LINE_1 = "Find Affordable Monthly Rooms Across France";
const SUBTEXT =
    "Browse modern rooms with quality amenities, trusted hosts, and smooth booking.";
// ─────────────────────────────────────────────────────────────────────────────

export default function Heroone() {
    const bgRef = useRef(null);
    const textRef = useRef(null);

    // 1️⃣  Background: low-opacity → full, with subtle de-zoom
    useHeroBgAnimation(bgRef, 2.2, 0);

    // 2️⃣  Text + button: staggered bottom-to-top reveal, starts after bg begins
    useHeroTextReveal(textRef, "[data-reveal]", 0.13, 0.6);

    return (
        <section className="relative w-full h-screen min-h-[560px] overflow-hidden font-sans">

            {/* ── Background Image ───────────────────────────────────────────── */}
            <img
                ref={bgRef}
                src={BG_IMAGE}
                alt="Hero background"
                className="absolute inset-0  bg-[center_20%] w-full h-full object-cover object-center will-change-[opacity,transform]"
            />

            {/* ── Dark gradient overlay (always visible) ────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/65 pointer-events-none" />

            {/* ── Centered content ──────────────────────────────────────────── */}
            <div
                ref={textRef}
                className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
            >
                <div>

                    {/* Headline */}
                    <h1
                        data-reveal
                        className="text-[2.5rem] sm:text-7xl lg:text-8xl font-extrabold leading-none
                    text-white tracking-tight drop-shadow-2xl
                    text-left md:text-center"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        {HEADLINE_LINE_1}
                    </h1>

                    {/* Subtext */}
                    <p
                        data-reveal
                        className="mt-5 max-w-md text-base sm:text-lg text-white/80 leading-relaxed
                    drop-shadow-md text-left md:text-center"
                    >
                        {SUBTEXT}
                    </p>
                </div>

                {/* CTA buttons */}
                <div
                    data-reveal
                    className="mt-8 flex flex-wrap items-start md:items-center justify-start md:justify-center gap-3"
                >
                    <button
                        className="rounded-full bg-white px-8 py-3 text-sm font-semibold
                                   text-neutral-900 tracking-wide shadow-xl
                                   transition-all duration-300
                                   hover:shadow-white/30 hover:scale-105
                                   active:scale-95"
                    >
                        Explore
                    </button>
                    <button
                        className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold
                                   text-white tracking-wide backdrop-blur-sm bg-white/10
                                   transition-all duration-300
                                   hover:bg-white/20 hover:scale-105
                                   active:scale-95"
                    >
                        Explore Looks
                    </button>
                </div>

                {/* Top-right decorative image */}
                <div className="absolute top-10 right-10">
                    <img src={HeroSvg} alt="Hero" />
                </div>

                {/* Scroll hint */}
                <div
                    data-reveal
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                >
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                        Scroll
                    </span>
                    <svg
                        width="16" height="20" viewBox="0 0 16 20" fill="none"
                        className="animate-bounce text-white/40"
                    >
                        <path
                            d="M8 0v16M1 9l7 8 7-8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}