import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * useHeroBgAnimation
 * Fades the hero background image from low opacity (0.15) to full opacity (1)
 * using a slow, cinematic ease.
 *
 * @param {React.RefObject} bgRef  - ref attached to the background <img> or <div>
 * @param {number} duration        - animation duration in seconds (default 2.2)
 * @param {number} delay           - delay before animation starts (default 0)
 */
export function useHeroBgAnimation(bgRef, duration = 2.2, delay = 0) {
  useEffect(() => {
    if (!bgRef.current) return;

    // Set starting state immediately (no flash of full-opacity image)
    gsap.set(bgRef.current, { opacity: 0.1, scale: 1.06 });

    const tl = gsap.timeline({ delay });

    tl.to(bgRef.current, {
      opacity: 1,
      scale: 1,
      duration,
      ease: "power2.out",
    });

    return () => tl.kill();
  }, [bgRef, duration, delay]);
}