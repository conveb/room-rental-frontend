import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Happy clients",   value: 4800, suffix: "+", decimals: 0 },
  { label: "Properties sold", value: 1240, suffix: "+", decimals: 0 },
  { label: "Average rating",  value: 4.9,  suffix: "",  decimals: 1 },
  { label: "Cities covered",  value: 38,   suffix: "+", decimals: 0 },
];

const REVIEWS = [
  {
    id: 1, name: "Sophie Laurent", location: "Paris, France",
    avatar: "https://i.pravatar.cc/80?img=47", rating: 5,
    text: "Found our dream apartment in Le Marais within a week. The team understood exactly what we were looking for — light, charm, and proximity to the Seine.",
    property: "Maison Lumière", date: "March 2025",
  },
  {
    id: 2, name: "James Whitfield", location: "London, UK",
    avatar: "https://i.pravatar.cc/80?img=11", rating: 5,
    text: "As a foreign buyer, I was nervous about navigating the French market. The guidance was exceptional — seamless from viewing to signing.",
    property: "Penthouse Étoile", date: "January 2025",
  },
  {
    id: 3, name: "Isabelle Moreau", location: "Nice, France",
    avatar: "https://i.pravatar.cc/80?img=32", rating: 5,
    text: "Exceptional service. Our villa in Cannes exceeded every expectation. The attention to detail in matching us to the right property was remarkable.",
    property: "Villa Montmartre", date: "February 2025",
  },
  {
    id: 4, name: "Luca Ferretti", location: "Milan, Italy",
    avatar: "https://i.pravatar.cc/80?img=68", rating: 5,
    text: "We relocated from Milan and had our new home in Lyon sorted before we even arrived in France. Truly world-class service.",
    property: "Atelier Saint-Germain", date: "April 2025",
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d4a853" stroke="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

export default function FeedbackSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);
  const statEls    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headingRef.current.querySelectorAll(".word");
      gsap.fromTo(words,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
          }
        );
      });

      statEls.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
          onUpdate() {
            el.textContent = stat.decimals > 0
              ? counter.val.toFixed(stat.decimals)
              : Math.floor(counter.val).toLocaleString();
          },
          onComplete() {
            el.textContent = stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value.toLocaleString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .word-clip { overflow: hidden; display: inline-block; vertical-align: bottom; }
        .word { display: inline-block; }
        .review-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .review-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.08); }
      `}</style>

      {/*
        FeedbackSection sits directly after StickyWrapper in the DOM.
        The StickyWrapper pins the content above, and this section
        naturally scrolls up from below — sliding over the pinned content.
        zIndex:10 ensures it renders on top of the sticky wrapper (zIndex:1).
      */}
      <section
        ref={sectionRef}
        className="relative bg-[#f5f2eb]"
        style={{
          zIndex: 10,
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 -20px 80px rgba(0,0,0,0.12)",
          paddingTop: "72px",
          paddingBottom: "100px",
        }}
      >
        

        <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-20 mb-16">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-light text-zinc-800"
                     style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  <span ref={(el) => (statEls.current[i] = el)}>0</span>{stat.suffix}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400"
                     style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 mb-3"
               style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Client stories
            </p>
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-[52px] font-light text-zinc-800 leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {["What", "our", "clients", "say"].map((word) => (
                <span key={word} className="word-clip mr-[0.22em]">
                  <span className="word">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((review, i) => (
              <div
                key={review.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="review-card bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-4">
                  <Stars count={review.rating} />
                  <p className="text-sm text-zinc-600 leading-relaxed"
                     style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-zinc-100 pt-4">
                  <img src={review.avatar} alt={review.name}
                       className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-white" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-zinc-800 truncate"
                         style={{ fontFamily: "'DM Sans', sans-serif" }}>{review.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate"
                         style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {review.location} · {review.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Property tags */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {REVIEWS.map((r) => (
              <span key={r.id}
                    className="text-[11px] px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {r.property}
              </span>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}