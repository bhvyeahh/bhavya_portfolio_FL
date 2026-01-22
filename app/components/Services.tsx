"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- DATA (UPDATED FOR DETAILER NICHE) ---
const services = [
  {
    id: "websites",
    label: "WEBSITES", // Was BRANDING
    img: "https://images.unsplash.com/photo-1481480746807-0a2835979333?q=80&w=1000&auto=format&fit=crop", // Mobile/Tech vibe
    position:
      "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-10 md:left-[10%]",
  },
  {
    id: "booking",
    label: "BOOKING", // Was UI/UX
    img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1000&auto=format&fit=crop", // Calendar/Schedule vibe
    position:
      "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-20 md:right-[15%]",
  },
  {
    id: "localseo",
    label: "LOCAL SEO", // Was FRAMER
    img: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1000&auto=format&fit=crop", // Growth/Maps vibe
    position:
      "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-32 md:left-[20%]",
  },
  {
    id: "dashboards",
    label: "DASHBOARD", // Was ANIMATION
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Analytics vibe
    position:
      "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-10 md:right-[20%]",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      // 1. Mind-Blowing Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered Text Reveal with 3D Rotation
      tl.from(".service-item-text", {
        y: 100,
        rotateX: -45,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        transformOrigin: "0% 50% -50",
      });

      // Grid Pattern subtle fade in
      tl.from(".bg-grid-pattern", { opacity: 0, duration: 2 }, "-=1");
      
      // Background Image subtle scale in (Entrance)
      tl.from(".bg-texture-img", { scale: 1.1, opacity: 0, duration: 2 }, "-=2");
    },
    { scope: containerRef }
  );

  // --- Interaction Handlers (Premium Hover Logic) ---
  const handleMouseEnter = contextSafe((id: string) => {
    setHoveredService(id);

    // 1. Focus on the active Text
    gsap.to(`.text-${id}`, {
      color: "#ffffff",
      scale: 1.05,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "power2.out",
    });

    // 2. Blur the others (Cinema Effect)
    gsap.to(`.service-item-text:not(.text-${id})`, {
      color: "#27272a", // zinc-800
      scale: 0.95,
      filter: "blur(4px)",
      duration: 0.4,
      ease: "power2.out",
    });

    // 3. Reveal the Image (Pop effect)
    gsap.to(`.img-${id}`, {
      autoAlpha: 1, // handles opacity + visibility
      scale: 1,
      rotation: -2, // slight tilt for realism
      duration: 0.5,
      ease: "back.out(1.7)", // Small overshoot for 'pop'
    });
  });

  const handleMouseLeave = contextSafe(() => {
    setHoveredService(null);

    // 1. Reset all Texts
    gsap.to(".service-item-text", {
      color: "#27272a", // zinc-800
      scale: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
    });

    // 2. Hide all Images
    services.forEach((service) => {
      gsap.to(`.img-${service.id}`, {
        autoAlpha: 0,
        scale: 0.8,
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[60vh] md:min-h-screen bg-black flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden perspective-1000"
    >
      {/* --- NEW BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Texture Image */}
        <img 
            src="https://framerusercontent.com/images/SiTp60CA763cUNymzR4blwSuBvo.webp?scale-down-to=2048" 
            alt="Background Texture"
            className="bg-texture-img w-full h-full object-cover opacity-50 mix-blend-screen" 
        />
        {/* Gradient Overlay (Top and Bottom Fade) to integrate image smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-black/30" /> 
      </div>

      {/* Top Header */}
      <div className="absolute top-4 md:top-10 w-full px-4 md:px-8 flex justify-between items-center text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-white/5 pb-2 md:pb-4 z-20">
        <span>//</span>
        <span className="text-white font-bold">Solutions</span>
        <span>//</span>
      </div>

      {/* The Central Stacked Text */}
      <div className="relative z-20 flex flex-col items-center justify-center -space-y-1 md:-space-y-4 select-none mt-8 md:mt-0">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative group cursor-pointer service-wrapper"
            onMouseEnter={() => handleMouseEnter(service.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              hoveredService === service.id
                ? handleMouseLeave()
                : handleMouseEnter(service.id)
            }
          >
            {/* Reduced text sizes */}
            <h2
              className={`service-item-text text-${service.id} font-display font-black text-[12vw] md:text-[11vw] leading-[0.8] md:leading-[0.85] uppercase tracking-tighter text-zinc-800 transition-colors will-change-transform`}
            >
              {service.label}
            </h2>

            {/* Desktop-only sub-labels (UPDATED CONDITIONS) */}
            {service.id === "booking" && (
              <div className="hidden md:block absolute -left-32 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Auto-Sync Calendar <br /> SMS Reminders
              </div>
            )}
            {service.id === "websites" && (
              <div className="hidden md:block absolute -right-24 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                For Detailers <br /> & Cafes
              </div>
            )}
             {service.id === "dashboards" && (
              <div className="hidden md:block absolute -left-32 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Revenue Tracking <br /> Analytics
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Images Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
        {services.map((service) => (
          <div
            key={service.id}
            className={`img-${service.id} absolute ${service.position} z-30 w-full md:w-auto flex justify-center md:block opacity-0 invisible scale-90`}
          >
            <div className="w-[80vw] max-w-[300px] aspect-video md:w-[320px] md:h-[220px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900">
              <img
                src={service.img}
                alt={service.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Background Grid Pattern */}
      <div className="bg-grid-pattern absolute inset-0 opacity-10 z-10 pointer-events-none mix-blend-overlay"></div>
    </section>
  );
}