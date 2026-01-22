"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    label: "MOBILE DETAILING",
    sub: "Booking Engines • Landing Pages",
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    label: "CAFES & DINING",
    sub: "Digital Menus • Online Ordering",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    label: "AUTOMATION",
    sub: "SMS Reminders • Calendar Sync",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    label: "GROWTH & SEO",
    sub: "Google Maps • Lead Generation",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function ServiceList() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLImageElement>(null);
  
  const [activeImage, setActiveImage] = useState(services[0].img);
  const [isHoveringList, setIsHoveringList] = useState(false);

  useGSAP(
    () => {
      // 1. Setup QuickTo for high-performance mouse following
      const xTo = gsap.quickTo(cursorLabelRef.current, "left", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(cursorLabelRef.current, "top", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        // Only move the "Ghost Image" if we are hovering the section
        if (isHoveringList) {
            const { clientX, clientY } = e;
            xTo(clientX); 
            yTo(clientY); 
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 2. Entrance Animation for the list items
      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
        }
      });

      tl.from(".service-row", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef, dependencies: [isHoveringList] }
  );

  // Handle individual row hover
  const handleMouseEnterRow = (img: string) => {
    setActiveImage(img);
    setIsHoveringList(true);
    
    // Animate the "Pop" of the image appearing
    gsap.to(cursorLabelRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
    });
  };

  const handleMouseLeaveList = () => {
    setIsHoveringList(false);
    
    // Shrink the image when leaving the list area
    gsap.to(cursorLabelRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] py-32 px-4 md:px-12 flex flex-col justify-center border-t border-white/5 cursor-default relative z-10"
      onMouseLeave={handleMouseLeaveList}
    >
        {/* --- THE FLOATING GHOST IMAGE --- */}
        <div 
            ref={cursorLabelRef}
            className="fixed top-0 left-0 w-[300px] h-[220px] rounded-2xl overflow-hidden pointer-events-none z-50 opacity-0 scale-0 border border-white/20 shadow-2xl shadow-brand-green/10"
            style={{ transform: "translate(-50%, -50%)" }}
        >
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img 
                ref={cursorImageRef}
                src={activeImage} 
                alt="Preview" 
                className="w-full h-full object-cover"
            />
            {/* Overlay Text on Floating Image */}
            <div className="absolute bottom-4 left-4 z-20">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-white tracking-widest">
                        View Case Study
                    </span>
                </div>
            </div>
        </div>


      {/* --- Section Header --- */}
      <div className="w-full flex justify-between items-end mb-20 px-2 md:px-4">
        <div>
          <div className="flex items-center gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
            <span>//</span>
            <span className="text-white font-bold tracking-widest">
              MY SPECIALIZATIONS
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white uppercase max-w-2xl leading-[0.9]">
            Curated <br /> Solutions
          </h2>
        </div>
        <p className="hidden md:block text-xs font-mono text-gray-400 max-w-xs text-right">
          HOVER TO PREVIEW
        </p>
      </div>

      {/* --- The Clean List Container --- */}
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {services.map((service, index) => (
          <div
            key={service.id}
            // Removed mix-blend-mode to fix visibility issues
            className="service-row group relative border-t border-white/10 py-12 transition-all duration-500 hover:border-white/50"
            onMouseEnter={() => handleMouseEnterRow(service.img)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 relative z-20">
                
                {/* Left: Number & Title */}
                <div className="flex items-baseline gap-8 md:gap-12 transition-transform duration-500 group-hover:translate-x-4">
                    {/* Explicit Light Colors for Contrast */}
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-brand-green transition-colors duration-300">
                        0{index + 1}
                    </span>
                    <h3 className="font-display font-black text-4xl md:text-6xl uppercase text-zinc-400 tracking-tighter transition-colors duration-300 group-hover:text-white">
                        {service.label}
                    </h3>
                </div>

                {/* Right: Meta & Icon */}
                <div className="flex items-center gap-8 md:gap-16 transition-transform duration-500 group-hover:-translate-x-4">
                    <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300">
                        {service.sub}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
                    </div>
                </div>
            </div>

            {/* Hover Background Flash (Subtle) */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500 pointer-events-none"></div>
          </div>
        ))}
        {/* Bottom Border for last item */}
        <div className="w-full h-px bg-white/10"></div>
      </div>
    </section>
  );
}