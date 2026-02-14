"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Check, Hammer, HardHat, TriangleAlert } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // --- CUSTOM SVG ASSETS ---
  const Tape = ({ className }: { className?: string }) => (
    <div className={`absolute h-8 w-32 bg-white/40 backdrop-blur-sm border-l-2 border-r-2 border-dashed border-white/20 shadow-sm ${className}`} style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0% 100%)" }}></div>
  );

  const RedScribble = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M10,10 L190,90 M190,10 L10,90" stroke="#ef4444" strokeWidth="3" fill="none" />
      <path d="M20,50 Q100,20 180,50 T20,50" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5,5" />
    </svg>
  );

  useGSAP(() => {
    // 1. Marquee Animation (Infinite Scroll)
    const marqueeContent = marqueeRef.current?.querySelector(".marquee-content");
    if (marqueeContent) {
      gsap.to(marqueeContent, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }

    // 2. "The Tear Down" Entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".comparison-grid",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".bad-card", {
      x: -100,
      opacity: 0,
      rotate: -10,
      duration: 1,
      ease: "back.out(1.5)"
    })
    .from(".good-card", {
      x: 100,
      opacity: 0,
      rotate: 10,
      duration: 1,
      ease: "back.out(1.5)"
    }, "<0.2") // Overlap slightly
    .from(".vs-badge", {
      scale: 0,
      rotate: 360,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-20 overflow-hidden">
      
      {/* --- 1. CAUTION TAPE MARQUEE --- */}
      <div className="relative w-full bg-yellow-400 border-y-4 border-black rotate-[-2deg] scale-110 shadow-lg z-20 mb-24">
        {/* Striped Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)" }}>
        </div>
        
        <div ref={marqueeRef} className="overflow-hidden flex py-3 md:py-4">
          <div className="marquee-content flex whitespace-nowrap gap-12 items-center font-black text-xl md:text-3xl uppercase tracking-tighter text-black">
            {/* Repeat content twice for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>🚧 Under Construction? No. Under Strategy.</span>
                <Hammer className="w-8 h-8 fill-black" />
                <span>Built for Builders</span>
                <TriangleAlert className="w-8 h-8 fill-black" />
                <span>Showroom Inventory Sync</span>
                <HardHat className="w-8 h-8 fill-black" />
                <span>0% Generic Templates</span>
                <span className="bg-black text-yellow-400 px-2 transform skew-x-[-10deg]">100% Custom Leads</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2. THE PROBLEM (The Tear Down) --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
           <div className="inline-block relative">
              <h2 className="text-[10vw] md:text-[5vw] font-black text-black leading-[0.9] transform -skew-x-6">
                THE TEAR DOWN
              </h2>
              <div className="absolute -top-6 -right-8 rotate-12 bg-white p-2 border-2 border-black shadow-[4px_4px_0px_#000] hidden md:block">
                 <span className="font-hand text-red-600 text-lg font-bold">"Is your site leaking leads?"</span>
              </div>
           </div>
           <p className="font-hand text-xl md:text-2xl mt-6 max-w-2xl mx-auto text-gray-600">
             Your projects are custom. <span className="underline decoration-wavy decoration-red-500">So why is your website a template?</span>
           </p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
           
           {/* VS Badge (Center Absolute) */}
           <div className="vs-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex w-20 h-20 bg-black text-white rounded-full items-center justify-center border-4 border-white shadow-xl">
              <span className="font-black text-2xl italic">VS</span>
           </div>

           {/* BAD CARD (The Generic Site) */}
           <div className="bad-card relative group">
              <Tape className="-top-4 left-10 rotate-[-4deg]" />
              <div className="bg-gray-100 border-2 border-gray-300 p-6 md:p-10 rounded-sm rotate-[-2deg] shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
                 {/* Content */}
                 <div className="w-full h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                 <div className="flex gap-4 mb-6">
                    <div className="w-1/3 h-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-2/3 space-y-2">
                       <div className="w-full h-4 bg-gray-200 rounded"></div>
                       <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                       <div className="w-full h-4 bg-gray-200 rounded"></div>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 mt-auto opacity-50">
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                 </div>

                 {/* OVERLAY: The Scribble & Stamp */}
                 <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                    <div className="border-4 border-red-500 text-red-500 p-4 transform -rotate-12 opacity-90">
                       <span className="text-4xl font-black uppercase tracking-widest block">REJECTED</span>
                       <span className="text-sm font-mono block text-center">GENERIC TEMPLATE</span>
                    </div>
                    <RedScribble />
                 </div>
              </div>
              
              {/* Annotations */}
              <div className="absolute -bottom-8 left-0 font-hand text-red-600 rotate-2 w-full text-center md:text-left">
                 <span className="flex items-center gap-2 justify-center md:justify-start">
                   <X size={20}/> Zero Brand Identity
                 </span>
              </div>
           </div>

           {/* GOOD CARD (The Layoutory Site) */}
           <div className="good-card relative">
              <Tape className="-top-4 right-10 rotate-[4deg]" />
              <div className="bg-white border-2 border-black p-2 rounded-sm rotate-[2deg] shadow-[10px_10px_0px_rgba(0,0,0,1)] min-h-[420px] relative z-10 transition-transform hover:-translate-y-2">
                 
                 {/* Mock UI: High End Header */}
                 <div className="bg-black text-white p-4 flex justify-between items-center mb-1">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div className="font-mono text-[10px] uppercase tracking-widest">Est. 2024</div>
                 </div>

                 {/* Mock UI: Hero Image */}
                 <div className="h-48 bg-neutral-800 relative overflow-hidden mb-4 group-hover:scale-[1.01] transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" 
                      alt="Luxury Home" 
                      className="object-cover w-full h-full opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-white text-black px-2 py-1 text-xs font-bold">
                       CUSTOM BUILD #402
                    </div>
                 </div>

                 {/* Mock UI: Content */}
                 <div className="px-4 pb-6">
                    <h3 className="font-headline text-3xl font-black uppercase leading-none mb-2">
                       Built to <span className="bg-yellow-400 px-1">Last.</span>
                    </h3>
                    <div className="flex gap-2 mt-4">
                       <span className="bg-gray-100 px-2 py-1 text-[10px] font-mono border border-black rounded-full">Lead Capture</span>
                       <span className="bg-gray-100 px-2 py-1 text-[10px] font-mono border border-black rounded-full">Fast Load</span>
                    </div>
                 </div>

                 {/* STAMP */}
                 <div className="absolute bottom-6 right-6 rotate-[-15deg]">
                    <div className="border-4 border-green-600 text-green-600 px-4 py-2 rounded-lg shadow-sm bg-white/90">
                       <span className="flex items-center gap-2 font-black text-xl uppercase">
                          <Check size={24} strokeWidth={4} /> Approved
                       </span>
                    </div>
                 </div>
              </div>

              {/* Annotations */}
              <div className="absolute -bottom-10 right-0 font-hand text-green-700 rotate-[-2deg] w-full text-center md:text-right">
                 <span className="flex items-center gap-2 justify-center md:justify-end">
                   High-Ticket Ready <span className="text-xl">💰</span>
                 </span>
              </div>
           </div>

        </div>

        {/* Blueprint Line Decoration */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-300 border-t border-dashed border-blue-500 z-0 pointer-events-none hidden md:block opacity-50"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-300 border-r border-dashed border-blue-500 z-0 pointer-events-none hidden md:block opacity-50"></div>

      </div>
    </section>
  );
}