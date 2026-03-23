import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * useHeroTextReveal
 * Reveals hero text/button elements with a staggered bottom-to-top slide-in.
 * Each element should have a wrapper with overflow:hidden so the clip works cleanly.
 *
 * @param {React.RefObject} containerRef - ref on the element wrapping all reveal items
 * @param {string} selector              - CSS selector for children to animate (default "[data-reveal]")
 * @param {number} stagger               - stagger between each item in seconds (default 0.13)
 * @param {number} delay                 - delay before sequence starts (default 0.7)
 */
export function useHeroTextReveal(
  containerRef,
  selector = "[data-reveal]",
  stagger = 0.13,
  delay = 0.7
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(selector);
    if (!items.length) return;

    // Set starting state — elements are shifted down and invisible
    gsap.set(items, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay });

    tl.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger,
    });

    return () => tl.kill();
  }, [containerRef, selector, stagger, delay]);
}