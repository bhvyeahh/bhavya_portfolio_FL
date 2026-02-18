"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Play, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function GlassHero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Optimized Mouse Light Source Logic (Desktop Only)
  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll(".glass-surface");
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
          (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-text", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
    );

    tl.fromTo(".glass-visual",
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "slow(0.7, 0.7, false)" },
      "-=0.8"
    );

    mm.add("(min-width: 768px)", () => {
       gsap.to(".floating-glass", {
         y: -20,
         rotateZ: 5,
         duration: 6,
         repeat: -1,
         yoyo: true,
         ease: "sine.inOut"
       });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#030303] text-white selection:bg-purple-500/30 perspective-[1000px] pb-12 md:pb-0"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#050505] to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-purple-900/20 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="absolute top-0 left-0 w-full z-50 px-4 py-4 md:px-12 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="glass-surface relative px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md overflow-hidden group">
             <span className="relative z-10 font-sans font-bold text-sm md:text-lg tracking-tight">Layoutory.</span>
          </div>
          <Link href="mailto:bhavyarathore575@gmail.com">
            <button className="glass-surface relative px-4 py-2 md:px-6 md:py-3 rounded-full bg-white text-black font-semibold text-[10px] md:text-xs uppercase tracking-widest overflow-hidden transition-transform">
               <span className="relative z-10">Contact</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center px-4 md:px-12 mt-20 md:mt-16">
        <div className="flex flex-col items-start order-2 lg:order-1">
          <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4 md:mb-8">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/70">Available for Projects</span>
          </div>

          <h1 ref={titleRef} className="font-sans font-medium text-[11vw] md:text-[10vw] lg:text-[6.5vw] leading-[0.9] tracking-tight mb-4 md:mb-6">
            <div className="overflow-hidden"><span className="hero-text block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50">BUILDING</span></div>
            <div className="overflow-hidden"><span className="hero-text block font-serif italic text-white/80">EMPIRES.</span></div>
          </h1>

          <p className="hero-text text-sm md:text-lg text-white/40 max-w-md leading-relaxed mb-8 md:mb-10">
            We transform outdated contractor portfolios into automated acquisition systems. Secure high-ticket bids while you sleep.
          </p>

          <div className="hero-text flex flex-col w-full sm:w-auto sm:flex-row gap-3 md:gap-4">
             <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank" className="w-full sm:w-auto">
               <button className="glass-surface group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 active:scale-95">
                  <span className="relative z-10 flex items-center justify-center gap-3 text-xs md:text-sm font-bold text-white">
                    Deploy System <ArrowUpRight size={16} />
                  </span>
               </button>
             </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: The "Liquid Glass" Artifact */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[80vh] w-full flex items-center justify-center glass-visual perspective-1000 order-1 lg:order-2 mb-8 lg:mb-0">
           <div className="floating-glass relative w-[70vw] md:w-full max-w-xs md:max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-[60px] md:blur-[80px]"></div>
              <div className="glass-surface absolute inset-0 rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-2xl shadow-2xl overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay grayscale transition-all duration-700"></div>
                 <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                       <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          {/* FIXED responsive icon sizing here */}
                          <CheckCircle2 className="text-green-400 w-4 h-4 md:w-5 md:h-5" />
                       </div>
                       <div>
                          <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">Revenue Tracked</p>
                          <p className="text-lg md:text-xl font-bold text-white">$124,000+</p>
                       </div>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full w-[80%] bg-gradient-to-r from-purple-400 to-blue-400"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}