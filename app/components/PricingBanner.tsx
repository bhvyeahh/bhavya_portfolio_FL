"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PricingBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Animation starts when top of section hits 80% of viewport
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Reveal: "Masked Slide Up"
      // We animate the 'y' from 100% to 0% inside an overflow-hidden parent.
      tl.from(".banner-text-line", {
        y: "100%",
        rotate: 3, // Slight rotation for style
        opacity: 0,
        duration: 1.2,
        stagger: 0.15, // Delay between lines
        ease: "power4.out",
      })
      .from(
        ".banner-sub",
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // 2. Parallax Image (Scrubbing)
      // This runs independently of the timeline above, linked directly to scroll position
      gsap.fromTo(
        imageRef.current,
        {
          y: "-15%", // Start slightly shifted up
          scale: 1.1, // Start zoomed in
        },
        {
          y: "15%", // Move down as we scroll (Classic Parallax)
          scale: 1, // Zoom out slightly creates depth
          ease: "none", // Linear ease is crucial for scrub
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Start when section enters viewport
            end: "bottom top", // End when section leaves viewport
            scrub: 1, // Smooths the scrubbing by 1 second (buttery feel)
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] bg-[#050505] overflow-hidden flex items-center justify-center perspective-1000"
    >
      {/* --- Full-screen Parallax Image --- */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* We wrap image in a div to handle overflow if needed, but here we animate the img tag directly */}
        <img
          ref={imageRef}
          src="/pricebg.png"
          alt="Pricing Background"
          className="w-full h-[130%] object-cover opacity-50 will-change-transform" // h-130% ensures no whitespace during parallax movement
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* --- Revealed Text Content --- */}
      <div ref={textRef} className="relative z-10 text-center px-4 mix-blend-lighten">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white tracking-tighter mb-6 leading-[0.9]">
          {/* Mask Wrapper for Line 1 */}
          <div className="overflow-hidden">
            <div className="banner-text-line block">Good Design Is</div>
          </div>
          {/* Mask Wrapper for Line 2 */}
          <div className="overflow-hidden">
            <div className="banner-text-line block text-gray-400">
              Good Business
            </div>
          </div>
        </h2>
        
        <div className="overflow-hidden">
            <p className="banner-sub font-mono text-sm text-brand-green uppercase tracking-[0.2em] border border-white/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm bg-white/5">
                Invest in your digital presence
            </p>
        </div>
      </div>
    </section>
  );
}