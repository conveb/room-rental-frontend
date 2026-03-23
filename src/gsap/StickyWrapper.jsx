import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * StickyWrapper
 * 
 * Wraps ANY section so FeedbackSection slides over it with a parallax effect.
 * 
 * How it works:
 * - Measures the inner content height on mount
 * - Sets the outer wrapper to contentHeight + extraScroll (default 300px)
 *   so there's scroll travel after the content is fully visible
 * - Inner div is position:sticky top:0 so it pins while wrapper scrolls
 * - Scales down slightly as FeedbackSection approaches
 * 
 * Usage:
 *   <StickyWrapper>
 *     <PropertiesSection />
 *   </StickyWrapper>
 *   <FeedbackSection />
 */
export default function StickyWrapper({ children, extraScroll = 300 }) {
  const wrapperRef = useRef(null);
  const innerRef   = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner   = innerRef.current;

    // Measure actual content height and set wrapper height
    const contentHeight = inner.scrollHeight;
    wrapper.style.height = `${contentHeight + extraScroll}px`;

    // Refresh ScrollTrigger after height change
    ScrollTrigger.refresh();

    // Scale + fade the inner content as FeedbackSection slides over
    const ctx = gsap.context(() => {
      gsap.to(inner, {
        scale: 0.94,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "bottom bottom",   // wrapper bottom enters viewport bottom
          end: "bottom top",        // wrapper bottom reaches viewport top
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [extraScroll]);

  return (
    /*
      Outer wrapper:
      - height set dynamically = content height + extraScroll
      - position:relative + zIndex:1 establishes stacking context below FeedbackSection
    */
    <div
      ref={wrapperRef}
      style={{ position: "relative", zIndex: 1 }}
    >
      {/*
        Inner sticky container:
        - position:sticky + top:0 pins it to the viewport top
        - height:auto so it takes the natural content height
        - overflow:hidden clips during scale animation
        - width:100% fills the wrapper
      */}
      <div
        ref={innerRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          overflow: "hidden",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </div>
  );
}