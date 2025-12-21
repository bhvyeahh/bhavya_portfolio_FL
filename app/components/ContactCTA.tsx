"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // 1. Entrance Animation (Skew + Reveal)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Globe Pop
      tl.from(".globe-icon", {
        scale: 0,
        opacity: 0,
        rotation: -180,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // Text Skew Reveal
      tl.from(".cta-text-line", {
        y: "100%",
        skewY: 7,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      }, "-=0.5");

      // Button Scale In
      tl.from(btnRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.8");

      // 2. Mouse Follow Glow (The "Atmosphere")
      // We use quickTo for performance (no lag)
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.5, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        xTo(e.clientX - left);
        yTo(e.clientY - top);
        
        // Magnetic Button Effect logic is handled in specific hover listeners below
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef }
  );

  // --- Magnetic Button Logic ---
  const handleBtnMove = contextSafe((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3; // Strength of pull
    const y = (e.clientY - (top + height / 2)) * 0.3;

    gsap.to(btn, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const handleBtnLeave = contextSafe(() => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)", // Snap back elastically
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* --- Ambient Glow (Follows Mouse) --- */}
      {/* We center it initially, then GSAP moves it. */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-white/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen will-change-transform"
      ></div>

      {/* --- Floating Globe Icon --- */}
      <div className="mb-8 globe-icon relative z-20">
        <Globe
          className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin-slow"
          strokeWidth={0.8}
        />
      </div>

      {/* --- Massive Typography --- */}
      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center mix-blend-lighten">
        
        {/* Line 1: READY TO */}
        <div className="overflow-hidden">
             <h2 className="cta-text-line font-display font-black text-[10vw] leading-[0.8] uppercase text-white tracking-tighter block will-change-transform">
            READY TO
            </h2>
        </div>

        {/* Line 2: COLLABORATE? */}
        <div className="overflow-hidden mb-8">
            <h2 className="cta-text-line font-display font-black text-[10vw] leading-[0.8] uppercase text-white tracking-tighter block will-change-transform">
            COLLABORATE?
            </h2>
        </div>

        {/* --- Subtext --- */}
        <div className="overflow-hidden mb-12">
            <p className="cta-text-line text-white text-sm md:text-lg font-mono text-center max-w-md leading-relaxed opacity-80">
            Have a project in mind? <br />
            Let’s create something extraordinary together
            </p>
        </div>

        {/* --- Magnetic Button --- */}
        <div className="relative z-30">
            <Link href="mailto:bhavyarathore575@gmail.com">
                <button
                    ref={btnRef}
                    onMouseMove={handleBtnMove}
                    onMouseLeave={handleBtnLeave}
                    className="group relative px-8 py-4 rounded-full border border-white/20 overflow-hidden bg-transparent transition-colors duration-300 hover:border-white"
                >
                    <span className="relative z-10 text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-300">
                    Contact Now
                    </span>
                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                </button>
            </Link>
        </div>

      </div>

      {/* --- Background Grid Pattern --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-30"></div>
    </section>
  );
}