import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARIS_IMAGE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=85";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const padRef     = useRef(null);
  const wrapRef    = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const lineRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pad     = padRef.current;
      const wrap    = wrapRef.current;
      const img     = imgRef.current;
      const overlay = overlayRef.current;
      const lines   = lineRefs.current.filter(Boolean);

      // ── PHASE 1 ──────────────────────────────────────────────────────────
      // Image enters small (large padding) → grows to full screen (0 padding)
      // Triggered as the section scrolls into view from the bottom
      gsap.fromTo(
        pad,
        { padding: "250px" },       // large padding = small image on enter
        {
          padding: "0px",           // no padding = full screen
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",    // section bottom enters viewport
            end: "top top",         // section top reaches viewport top
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        wrap,
        { borderRadius: "24px" },
        {
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // Overlay fades in alongside expansion
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // ── PHASE 2 ──────────────────────────────────────────────────────────
      // Image is full screen → text reveals bottom to top
      gsap.set(lines, { y: 50, opacity: 0 });
      lines.forEach((line, i) => {
        gsap.to(line, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          delay: i * 0.11,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── PHASE 3 ──────────────────────────────────────────────────────────
      // Scrolling past → image gets 50px floating gap all around
      gsap.fromTo(
        pad,
        { padding: "0px" },
        {
          padding: "50px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        wrap,
        { borderRadius: "0px" },
        {
          borderRadius: "16px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Parallax on the image
      gsap.to(img, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addLine = (el) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-[#0e0d0b]"
        style={{ height: "80vh" }}
      >
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "50vh" }}
        >
          {/* Padding wrapper — GSAP animates this to grow/shrink the image */}
          <div
            ref={padRef}
            className="w-full h-full"
            style={{ padding: "160px", boxSizing: "border-box" }}
          >
            {/* Image wrapper — always fills padRef's content area */}
            <div
              ref={wrapRef}
              className="relative w-full h-full overflow-hidden shadow-2xl"
              style={{ borderRadius: "24px" }}
            >
              <img
                ref={imgRef}
                src={PARIS_IMAGE}
                alt="Paris — our inspiration"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ willChange: "transform" }}
              />

              {/* Dark gradient overlay */}
              <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.3) 55%, transparent 100%)",
                  opacity: 0,
                }}
              />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 px-10 pb-12 z-10">
                <p
                  ref={addLine}
                  className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-300/80"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Story &nbsp;·&nbsp; Est. 2018
                </p>

                <h2
                  ref={addLine}
                  className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Born in the
                  <br />
                  <em className="font-semibold not-italic">Streets of Paris</em>
                </h2>

                <div ref={addLine} className="mt-5 mb-5 h-px bg-white/20 w-16" />

                <p
                  ref={addLine}
                  className="max-w-lg text-sm sm:text-base text-white/65 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  We draw every collection from the quiet corners of the Marais,
                  the geometry of Haussmann facades, and the effortless confidence
                  of a Parisian Sunday morning. Fashion isn't loud here — it's felt.
                </p>

                <a
                  ref={addLine}
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium
                             text-white/80 hover:text-amber-300 transition-colors duration-300 group"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Discover our collections
                  <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M3 9h12M10 4l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* Decorative label */}
              <div className="absolute bottom-6 right-8">
                <span
                  className="text-[10px] uppercase tracking-[0.25em] text-white/25"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Paris, France &nbsp;48°N
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}