import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
    {
        offset: 60,
        cards: [
            { id: 1, name: "Paris", region: "Île-de-France", height: 220, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
            { id: 2, name: "Bordeaux", region: "Nouvelle-Aquitaine", height: 170, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" },
        ],
    },
    {
        offset: 0,
        cards: [
            { id: 3, name: "Lyon", region: "Auvergne-Rhône-Alpes", height: 175, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
            { id: 4, name: "Toulouse", region: "Occitanie", height: 200, image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80" },
        ],
    },
    {
        offset: 80,
        cards: [
            { id: 5, name: "Marseille", region: "Provence-Alpes", height: 260, image: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80" },
            { id: 6, name: "Strasbourg", region: "Grand Est", height: 160, image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80" },
        ],
    },
    {
        offset: 20,
        cards: [
            { id: 7, name: "Nice", region: "Côte d'Azur", height: 185, image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80" },
            { id: 8, name: "Cannes", region: "Côte d'Azur", height: 205, image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80" },
        ],
    },
    {
        offset: 50,
        cards: [
            { id: 9, name: "Biarritz", region: "Nouvelle-Aquitaine", height: 195, image: "https://cdn.britannica.com/62/180562-050-631AECAD/Fishermen-Port-Biarritz-France-tourist-area-fishermen-1870.jpg?w=300" },
            { id: 10, name: "Montpellier", region: "Occitanie", height: 175, image: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=600&q=80" },
        ],
    },
];

const ALL_CARDS = COLUMNS.flatMap((col) => col.cards);

export default function CitiesSection() {
    const wrapperRef = useRef(null);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const colRefs = useRef([]);
    const mobileRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            const words = headingRef.current.querySelectorAll(".word");
            gsap.fromTo(words,
                { y: "110%", opacity: 0 },
                {
                    y: "0%", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
                }
            );

            // Columns rise
            colRefs.current.forEach((col, i) => {
                if (!col) return;
                gsap.fromTo(col,
                    { y: 80, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.1,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
                    }
                );
            });

            // Mobile cards
            mobileRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.75, ease: "power2.out", delay: i * 0.07,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
                    }
                );
            });

            // Scale down as FeedbackSection slides over (scrubbed to scroll)
            gsap.to(sectionRef.current, {
                scale: 0.92,
                opacity: 0.6,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: true,   // ← was scrub: 1 (1 second lag), now instant

                },
            });
        });

        return () => ctx.revert();
    }, []);

    const CardMarkup = ({ card }) => (
        <Link to={`/accommodation?city=${encodeURIComponent(card.name)}`}>
            <div className="city-card" style={{ height: card.height }}>
                <img src={card.image} alt={card.name} />
                <div className="overlay" />
                <span className="num">{String(card.id).padStart(2, "0")}</span>
                <div className="arrow-btn">
                    <svg width="11" height="11" viewBox="0 0 18 18" fill="none"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13L13 5M13 5H7M13 5v6" />
                    </svg>
                </div>
                <div className="info">
                    <div className="city-name">{card.name}</div>
                    <div className="city-region">{card.region}</div>
                </div>
            </div>
        </Link>
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .word-clip { overflow: hidden; display: inline-block; vertical-align: bottom; }
        .word { display: inline-block; }
        .city-card { position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: box-shadow 0.4s ease, transform 0.4s ease; }
        .city-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.16); transform: translateY(-4px) scale(1.02); }
        .city-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .city-card:hover img { transform: scale(1.07); }
        .city-card .overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%, transparent 100%); pointer-events: none; }
        .city-card .num { position: absolute; top: 10px; left: 12px; font-size: 10px; color: rgba(255,255,255,0.5); font-family: 'DM Sans', sans-serif; letter-spacing: 0.12em; }
        .city-card .arrow-btn { position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.18); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; transition: background 0.3s; }
        .city-card:hover .arrow-btn { background: rgba(255,255,255,0.92); border-color: transparent; }
        .city-card:hover .arrow-btn svg { stroke: #18181b; }
        .city-card .info { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 12px 12px; }
        .city-card .city-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 500; color: #fff; line-height: 1.15; }
        .city-card .city-region { font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 2px; letter-spacing: 0.04em; }
        .layout-mobile  { display: grid; }
        .layout-desktop { display: none; }
        @media (min-width: 1024px) { .layout-mobile { display: none; } .layout-desktop { display: flex; } }
      `}</style>

            {/*
        WRAPPER: must be taller than 100vh so sticky has room to pin.
        The extra height (50vh) is the scroll travel during which
        FeedbackSection will slide up over CitiesSection.
      */}
            <div
                ref={wrapperRef}
                style={{ height: "110vh", position: "relative", zIndex: 1 }}
            >
                {/*
          STICKY SECTION: sticks to top:0 inside the tall wrapper.
          It stays pinned for the entire 150vh of wrapper scroll.
          FeedbackSection (outside this wrapper) then scrolls over the top.
        */}
                <section
                    ref={sectionRef}
                    className="bg-white py-10"
                    style={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        overflow: "hidden",
                        willChange: "transform, opacity",
                    }}
                >
                    <div className="px-4 sm:px-0 h-full flex flex-col justify-between">

                        <div className="text-center mb-10">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 mb-3"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Browse by destination
                            </p>
                            <h2
                                ref={headingRef}
                                className="text-4xl sm:text-5xl lg:text-[56px] font-light text-zinc-800 leading-[1.1]"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {["Discover", "Your", "Ideal", "City"].map((word) => (
                                    <span key={word} className="word-clip mr-[0.22em]">
                                        <span className="word">{word}</span>
                                    </span>
                                ))}
                            </h2>
                        </div>

                        {/* Mobile grid */}
                        <div className="layout-mobile gap-3 mx-auto px-4 flex-1"
                            style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "640px", alignContent: "start" }}>
                            {ALL_CARDS.slice(0, 6).map((card, i) => (
                                <Link
                                    key={card.id}
                                    to={`/accommodation?city=${encodeURIComponent(card.name)}`}
                                    ref={(el) => (mobileRefs.current[i] = el)}
                                >
                                    <div className="city-card" style={{ height: "160px" }}>
                                        <img src={card.image} alt={card.name} />
                                        <div className="overlay" />
                                        <span className="num">{String(card.id).padStart(2, "0")}</span>
                                        <div className="arrow-btn">
                                            <svg width="11" height="11" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 13L13 5M13 5H7M13 5v6" />
                                            </svg>
                                        </div>
                                        <div className="info">
                                            <div className="city-name">{card.name}</div>
                                            <div className="city-region">{card.region}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop masonry */}
                        <div className="layout-desktop gap-3 justify-center items-start mx-auto flex-1"
                            style={{ maxWidth: "1100px" }}>
                            {COLUMNS.map((col, ci) => (
                                <div key={ci} ref={(el) => (colRefs.current[ci] = el)}
                                    className="flex flex-col gap-3 flex-1" style={{ marginTop: col.offset }}>
                                    {col.cards.map((card) => <CardMarkup key={card.id} card={card} />)}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <a href="/cities"
                                className="flex items-center gap-2 rounded-full border border-zinc-200 px-7 py-3 text-sm text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-all duration-300 group"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Explore all cities
                                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}