import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowForward } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=120&q=80",
    question: "How do I find the right property in France?",
    answer:
      "Our advisors guide you through every step — from defining your criteria to visiting shortlisted properties. We match you based on lifestyle, budget, and location preferences across all major French cities.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=120&q=80",
    question: "Can foreigners buy property in France?",
    answer:
      "Yes. France places no restrictions on foreign buyers. We have specialists who handle international purchases and can coordinate with notaires, banks, and legal advisors on your behalf.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&q=80",
    question: "What are the typical buying costs in France?",
    answer:
      "Expect notaire fees of 7–8% for older properties and around 2–3% for new builds. Additional costs include agency fees, mortgage arrangement fees, and survey costs. We provide a full cost breakdown before you commit.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=120&q=80",
    question: "How long does the buying process take?",
    answer:
      "From offer acceptance to completion, the French process typically takes 3–4 months. It involves signing a preliminary contract (compromis de vente) followed by the final deed with a notaire.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&q=80",
    question: "Do you offer property management services?",
    answer:
      "Yes. Our property management team handles rentals, maintenance, tenant communication, and local compliance so you can own with complete peace of mind from anywhere in the world.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const pillRefs   = useRef([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading reveal ─────────────────────────────────────────────────
      const words = headingRef.current.querySelectorAll(".word");
      gsap.fromTo(words,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Pills: cascade grow from right ─────────────────────────────────
      // duration: 0.8  — each pill takes 0.8s to fully grow
      // "-=0.4"        — next pill starts when previous is at 0.4s (halfway)
      // This creates the cascading waterfall feel exactly like the reference
      const pills = pillRefs.current.filter(Boolean);
      gsap.set(pills, { scaleX: 0, transformOrigin: "right center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      pills.forEach((pill, i) => {
        tl.to(
          pill,
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          i === 0 ? 0 : "-=0.4"   // first pill at t=0, each next starts 0.4s before previous ends
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .word-clip { overflow: hidden; display: inline-block; vertical-align: bottom; }
        .word      { display: inline-block; }
        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-answer.open { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
        .faq-icon { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); flex-shrink: 0; }
        .faq-icon.rotated { transform: rotate(180deg); }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-[#111110] py-24 px-6 sm:px-10 lg:px-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* ── Left: heading ──────────────────────────────────────────── */}
          <div className="lg:w-2/5 flex-shrink-0">
            <p
              className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Got questions?
            </p>
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-[52px] font-light text-white leading-[1.15]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {["Tailored", "Solutions", "for", "Your", "Real", "Estate", "Needs"].map((word) => (
                <span key={word} className="word-clip mr-[0.2em]">
                  <span className="word">{word}</span>
                </span>
              ))}
            </h2>

            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-400
                         hover:text-white transition-colors duration-300 group"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors duration-300" />
              Explore More
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"
                   className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* ── Right: FAQ pills ────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  ref={(el) => (pillRefs.current[i] = el)}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: isOpen ? "20px" : "9999px",
                    transition: "border-radius 0.4s cubic-bezier(0.4,0,0.2,1)",
                    willChange: "transform",
                  }}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center  text-black gap-4 p-3 text-left"
                    style={{ outline: "none", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <img
                      src={faq.image}
                      alt={faq.question}
                      style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                    <span
                      className="flex-1 text-sm  leading-snug"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                    >
                      {faq.question}
                    </span>
                    <span className={`faq-icon w-10 h-10 rounded-full border border-black/30 flex items-center justify-center ${isOpen ? "rotated" : ""}`}>
                     <IoMdArrowForward />
                    </span>
                  </button>

                  <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                    <div className="faq-answer-inner">
                      <p
                        className="px-6 pb-5 pt-1 text-sm text-zinc-400 leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}