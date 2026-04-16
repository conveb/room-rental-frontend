import { useEffect, useRef } from "react";

const HutSVG = () => (
  <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Sky glow behind hut */}
    <defs>
      <radialGradient id="skyGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#92400E" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="160" cy="150" rx="120" ry="60" fill="url(#skyGlow)" />

    {/* Ground */}
    <ellipse cx="160" cy="200" rx="140" ry="20" fill="#78350F" opacity="0.5" />

    {/* Hut body */}
    <rect x="70" y="130" width="180" height="80" rx="4" fill="#92400E" />
    <rect x="80" y="140" width="160" height="70" rx="3" fill="#B45309" />

    {/* Wood planks */}
    {[150, 165, 180, 195].map((y) => (
      <rect key={y} x="80" y={y} width="160" height="2" fill="#92400E" opacity="0.4" />
    ))}

    {/* Door */}
    <rect x="140" y="160" width="40" height="50" rx="3" fill="#451A03" />
    <rect x="142" y="162" width="17" height="46" rx="2" fill="#6C2E0A" />
    <rect x="161" y="162" width="17" height="46" rx="2" fill="#6C2E0A" />
    <circle cx="158" cy="187" r="3" fill="#FCD34D" />
    <circle cx="162" cy="187" r="3" fill="#FCD34D" />

    {/* Windows */}
    <rect x="90" y="148" width="35" height="28" rx="3" fill="#FEF3C7" />
    <rect x="195" y="148" width="35" height="28" rx="3" fill="#FEF3C7" />
    <line x1="107" y1="148" x2="107" y2="176" stroke="#92400E" strokeWidth="2" />
    <line x1="90" y1="162" x2="125" y2="162" stroke="#92400E" strokeWidth="2" />
    <line x1="212" y1="148" x2="212" y2="176" stroke="#92400E" strokeWidth="2" />
    <line x1="195" y1="162" x2="230" y2="162" stroke="#92400E" strokeWidth="2" />

    {/* Warm window glow */}
    <rect x="91" y="149" width="33" height="26" rx="2" fill="#FDE68A" opacity="0.5" />
    <rect x="196" y="149" width="33" height="26" rx="2" fill="#FDE68A" opacity="0.5" />

    {/* Roof */}
    <polygon points="55,135 160,55 265,135" fill="#7C2D12" />
    <polygon points="60,133 160,60 260,133" fill="#991B1B" />
    {/* Roof shingles */}
    {[0, 1, 2, 3, 4].map((row) => (
      Array.from({ length: 8 - row }).map((_, col) => (
        <rect
          key={`${row}-${col}`}
          x={75 + row * 10 + col * 20}
          y={120 - row * 12}
          width="18"
          height="10"
          rx="1"
          fill="#7C2D12"
          opacity="0.6"
        />
      ))
    ))}

    {/* Chimney */}
    <rect x="195" y="70" width="22" height="50" rx="2" fill="#78350F" />
    <rect x="192" y="65" width="28" height="10" rx="2" fill="#92400E" />

    {/* Smoke */}
    {[0, 1, 2].map((i) => (
      <ellipse
        key={i}
        cx={206 + i * 4}
        cy={50 - i * 14}
        rx={6 + i * 3}
        ry={5 + i * 2}
        fill="#D1D5DB"
        opacity={0.4 - i * 0.1}
      />
    ))}

    {/* Trees */}
    <polygon points="35,195 55,130 75,195" fill="#166534" />
    <polygon points="40,195 55,145 70,195" fill="#15803D" />
    <rect x="52" y="185" width="7" height="15" fill="#92400E" />

    <polygon points="245,195 265,130 285,195" fill="#166534" />
    <polygon points="250,195 265,145 280,195" fill="#15803D" />
    <rect x="262" y="185" width="7" height="15" fill="#92400E" />
  </svg>
);

const EiffelSVG = () => (
  <svg viewBox="0 0 300 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
    <defs>
      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="50%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="60%" stopColor="#1E3A5F" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    {/* Base platform */}
    <rect x="60" y="560" width="180" height="15" rx="3" fill="#374151" />
    <rect x="80" y="555" width="140" height="8" rx="2" fill="#4B5563" />

    {/* Leg 1 - Left */}
    <polygon points="80,555 100,420 130,420 120,555" fill="url(#metalGrad)" />
    {/* Leg 2 - Right */}
    <polygon points="220,555 200,420 170,420 180,555" fill="url(#metalGrad)" />

    {/* Cross braces level 1 */}
    <line x1="85" y1="530" x2="215" y2="530" stroke="#4B5563" strokeWidth="3" />
    <line x1="88" y1="510" x2="212" y2="510" stroke="#4B5563" strokeWidth="2.5" />
    <line x1="85" y1="530" x2="105" y2="490" stroke="#6B7280" strokeWidth="2" />
    <line x1="215" y1="530" x2="195" y2="490" stroke="#6B7280" strokeWidth="2" />
    <line x1="88" y1="510" x2="108" y2="470" stroke="#6B7280" strokeWidth="1.5" />
    <line x1="212" y1="510" x2="192" y2="470" stroke="#6B7280" strokeWidth="1.5" />

    {/* Lattice braces inside legs */}
    {[450, 470, 490, 510, 530].map((y, i) => (
      <line
        key={i}
        x1={82 + i * 3}
        y1={y}
        x2={90 + i * 3}
        y2={y - 20}
        stroke="#6B7280"
        strokeWidth="1"
        opacity="0.6"
      />
    ))}

    {/* First floor platform */}
    <rect x="100" y="415" width="100" height="12" rx="2" fill="#374151" />
    <rect x="105" y="410" width="90" height="8" rx="2" fill="#4B5563" />

    {/* Arch under first floor */}
    <path d="M100,420 Q150,380 200,420" stroke="#4B5563" strokeWidth="3" fill="none" />
    <path d="M100,420 Q150,370 200,420" stroke="#6B7280" strokeWidth="1.5" fill="none" opacity="0.5" />

    {/* Middle section */}
    <polygon points="110,410 130,280 170,280 190,410" fill="url(#metalGrad)" />

    {/* Cross braces level 2 */}
    <line x1="115" y1="390" x2="185" y2="390" stroke="#4B5563" strokeWidth="2.5" />
    <line x1="118" y1="370" x2="182" y2="370" stroke="#4B5563" strokeWidth="2" />
    <line x1="120" y1="350" x2="180" y2="350" stroke="#4B5563" strokeWidth="1.5" />
    <line x1="115" y1="390" x2="130" y2="350" stroke="#6B7280" strokeWidth="1.5" />
    <line x1="185" y1="390" x2="170" y2="350" stroke="#6B7280" strokeWidth="1.5" />
    <line x1="118" y1="370" x2="132" y2="330" stroke="#6B7280" strokeWidth="1" />
    <line x1="182" y1="370" x2="168" y2="330" stroke="#6B7280" strokeWidth="1" />

    {/* Second floor platform */}
    <rect x="120" y="275" width="60" height="10" rx="2" fill="#374151" />
    <rect x="123" y="270" width="54" height="8" rx="2" fill="#4B5563" />

    {/* Upper section */}
    <polygon points="128,270 140,170 160,170 172,270" fill="url(#metalGrad)" />

    {/* Cross braces level 3 */}
    <line x1="130" y1="255" x2="170" y2="255" stroke="#4B5563" strokeWidth="2" />
    <line x1="132" y1="235" x2="168" y2="235" stroke="#4B5563" strokeWidth="1.5" />
    <line x1="134" y1="215" x2="166" y2="215" stroke="#4B5563" strokeWidth="1" />
    <line x1="130" y1="255" x2="138" y2="215" stroke="#6B7280" strokeWidth="1" />
    <line x1="170" y1="255" x2="162" y2="215" stroke="#6B7280" strokeWidth="1" />

    {/* Third floor platform */}
    <rect x="133" y="165" width="34" height="8" rx="2" fill="#374151" />

    {/* Spire */}
    <polygon points="140,165 150,60 160,165" fill="#4B5563" />
    <polygon points="142,165 150,70 158,165" fill="#6B7280" />

    {/* Spire detail */}
    <line x1="143" y1="150" x2="157" y2="150" stroke="#9CA3AF" strokeWidth="1.5" />
    <line x1="144" y1="135" x2="156" y2="135" stroke="#9CA3AF" strokeWidth="1" />
    <line x1="146" y1="120" x2="154" y2="120" stroke="#9CA3AF" strokeWidth="1" />
    <line x1="147" y1="105" x2="153" y2="105" stroke="#9CA3AF" strokeWidth="0.8" />

    {/* Antenna tip */}
    <line x1="150" y1="60" x2="150" y2="25" stroke="#6B7280" strokeWidth="3" />
    <circle cx="150" cy="23" r="4" fill="#FCD34D" opacity="0.9" />

    {/* Lights on tower */}
    {[400, 340, 280, 230, 185].map((y, i) => (
      <g key={i}>
        <circle cx="150" cy={y} r="2.5" fill="#FCD34D" opacity="0.7" />
        <circle cx="150" cy={y} r="5" fill="#FCD34D" opacity="0.15" />
      </g>
    ))}
  </svg>
);

export default function ParallaxHero() {
  const containerRef = useRef(null);
  const hutRef = useRef(null);
  const eiffelRef = useRef(null);
  const skyRef = useRef(null);
  const starsRef = useRef(null);
  const groundRef = useRef(null);
  const textRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const gsapRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};

    const loadGSAP = async () => {
      if (!window.gsap) {
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
          s.onload = resolve;
          document.head.appendChild(s);
        });
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
          s.onload = resolve;
          document.head.appendChild(s);
        });
      }

      const gsap = window.gsap;
      const { ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: false,
        },
      });

      // Initial state: Eiffel tower hidden below
      gsap.set(eiffelRef.current, { yPercent: 100, opacity: 0 });
      gsap.set(hutRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      gsap.set(scrollPromptRef.current, { opacity: 1 });

      // Sky transition: warm amber → deep midnight blue
      tl.to(skyRef.current, {
        background: "linear-gradient(to bottom, #0F172A 0%, #1E3A5F 40%, #312E81 70%, #4C1D95 100%)",
        duration: 1,
      }, 0);

      // Stars fade in
      tl.to(starsRef.current, { opacity: 1, duration: 0.6 }, 0.2);

      // Ground darkens
      tl.to(groundRef.current, {
        background: "linear-gradient(to top, #0F172A 0%, #1E1B4B 30%, transparent 100%)",
        duration: 1,
      }, 0);

      // Hut sinks down and fades
      tl.to(hutRef.current, {
        yPercent: 130,
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: "power2.in",
      }, 0);

      // Scroll prompt fades
      tl.to(scrollPromptRef.current, { opacity: 0, duration: 0.2 }, 0);

      // Text changes
      tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.3 }, 0.1);

      // Eiffel Tower rises from bottom — dramatic reveal
      tl.to(eiffelRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }, 0.3);

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    loadGSAP();
    return () => cleanup();
  }, []);

  // Generate random stars
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
  }));

  return (
    <div className="relative" style={{ height: "300vh" }} ref={containerRef}>
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Sky background */}
        <div
          ref={skyRef}
          className="absolute inset-0 transition-none"
          style={{
            background: "linear-gradient(to bottom, #92400E 0%, #B45309 20%, #F59E0B 50%, #FDE68A 75%, #FEF9C3 100%)",
          }}
        />

        {/* Stars layer */}
        <div ref={starsRef} className="absolute inset-0 opacity-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {stars.map((star) => (
              <circle
                key={star.id}
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r={star.size}
                fill="white"
                opacity={star.opacity}
              />
            ))}
          </svg>
        </div>

        {/* Moon */}
        <div ref={starsRef} className="absolute top-8 right-16 opacity-0 pointer-events-none">
          <div
            className="rounded-full"
            style={{
              width: 60,
              height: 60,
              background: "radial-gradient(circle at 35% 35%, #FEF3C7, #FCD34D)",
              boxShadow: "0 0 30px 10px rgba(253, 211, 77, 0.25)",
            }}
          />
        </div>

        {/* Ground */}
        <div
          ref={groundRef}
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "35%",
            background: "linear-gradient(to top, #78350F 0%, #92400E 30%, transparent 100%)",
          }}
        />

        {/* Paris cityline silhouette — appears with Eiffel */}
        <div
          ref={starsRef}
          className="absolute bottom-0 left-0 right-0 opacity-0"
          style={{ height: "20%" }}
        >
          <svg viewBox="0 0 800 150" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
            <rect x="0" y="80" width="60" height="70" fill="#0F172A" />
            <rect x="10" y="60" width="40" height="25" fill="#0F172A" />
            <rect x="70" y="100" width="40" height="50" fill="#0F172A" />
            <rect x="120" y="70" width="50" height="80" fill="#0F172A" />
            <rect x="130" y="55" width="30" height="20" fill="#0F172A" />
            <rect x="580" y="75" width="55" height="75" fill="#0F172A" />
            <rect x="645" y="85" width="45" height="65" fill="#0F172A" />
            <rect x="700" y="65" width="60" height="85" fill="#0F172A" />
            <rect x="710" y="50" width="40" height="20" fill="#0F172A" />
            <rect x="740" y="95" width="60" height="55" fill="#0F172A" />
          </svg>
        </div>

        {/* HUT */}
        <div
          ref={hutRef}
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
          style={{ width: "min(460px, 85vw)", height: "min(350px, 55vh)" }}
        >
          <HutSVG />
        </div>

        {/* EIFFEL TOWER */}
        <div
          ref={eiffelRef}
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
          style={{
            width: "min(280px, 55vw)",
            height: "min(680px, 90vh)",
            filter: "drop-shadow(0 0 40px rgba(167, 139, 250, 0.3))",
          }}
        >
          <EiffelSVG />
        </div>

        {/* Headline text */}
        <div
          ref={textRef}
          className="absolute top-0 left-0 right-0 flex flex-col items-center pt-12 px-6 z-10"
        >
          <p
            className="uppercase tracking-[0.3em] text-xs mb-3 font-medium"
            style={{ color: "#FDE68A", fontFamily: "Georgia, serif" }}
          >
            Purple Layer
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-center leading-tight"
            style={{
              fontFamily: "'Georgia', serif",
              color: "#FEF9C3",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            From Humble<br />
            <span style={{ color: "#FCD34D" }}>Beginnings</span>
          </h1>
        </div>

        {/* Scroll prompt */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#FDE68A", fontFamily: "Georgia, serif" }}
          >
            Scroll to rise
          </span>
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: "#FCD34D",
                  animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Ambient light overlay at bottom of Eiffel reveal */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "15%",
            background: "linear-gradient(to top, rgba(109, 40, 217, 0.15), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}