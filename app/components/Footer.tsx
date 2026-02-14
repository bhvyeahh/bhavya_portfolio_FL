"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUp, Instagram, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  // --- ASSETS ---
  const ScribbleLine = () => (
    <svg className="w-full h-2 text-white/20 mb-8" viewBox="0 0 100 2" preserveAspectRatio="none">
       <path d="M0,1 Q50,2 100,1" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4,4" />
    </svg>
  );

  const TornEdge = () => (
     <div className="absolute -top-10 left-0 w-full h-12 bg-[#111] z-10" 
          style={{ clipPath: "polygon(0% 20%, 5% 0%, 10% 20%, 15% 0%, 20% 20%, 25% 0%, 30% 20%, 35% 0%, 40% 20%, 45% 0%, 50% 20%, 55% 0%, 60% 20%, 65% 0%, 70% 20%, 75% 0%, 80% 20%, 85% 0%, 90% 20%, 95% 0%, 100% 20%, 100% 100%, 0% 100%)" }}>
     </div>
  );

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
        }
    });

    tl.from(".footer-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="relative w-full bg-[#111] text-white pt-24 pb-12 px-6 md:px-12 mt-24">
      
      {/* TORN EDGE DECORATION */}
      <TornEdge />

      <div className="max-w-7xl mx-auto relative z-20">
         
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            
            {/* COLUMN 1: BRAND */}
            <div className="md:col-span-5 footer-item">
               <h2 className="font-headline font-black text-5xl uppercase tracking-tighter mb-4">
                  Layoutory<span className="text-brand-green">.</span>
               </h2>
               <p className="font-hand text-gray-400 text-lg max-w-sm rotate-1 leading-relaxed">
                  "We build digital real estate for builders who want to own their market."
               </p>
               
               <div className="mt-8 flex items-center gap-2 border border-white/20 w-fit px-3 py-1 rounded-full bg-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                     System Status: Operational
                  </span>
               </div>
            </div>

            {/* COLUMN 2: SITE MAP (Scribbled) */}
            <div className="md:col-span-3 footer-item">
               <h3 className="font-mono text-xs font-bold uppercase text-gray-500 mb-6 tracking-widest">
                  // Site Map
               </h3>
               <ul className="space-y-3 font-headline font-bold text-xl uppercase tracking-wide">
                  {['Home', 'Services', 'Portfolio', 'Process', 'Pricing'].map((item) => (
                     <li key={item} className="group w-fit">
                        <Link href={`#${item.toLowerCase()}`} className="relative">
                           <span className="relative z-10 group-hover:text-yellow-400 transition-colors">{item}</span>
                           <span className="absolute left-0 bottom-0 w-0 h-2 bg-yellow-400/50 -rotate-2 group-hover:w-full transition-all duration-300 z-0"></span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>

            {/* COLUMN 3: CONTACT & SOCIALS */}
            <div className="md:col-span-4 footer-item text-right md:text-right">
               <button 
                 onClick={scrollToTop}
                 className="group relative inline-flex items-center justify-center w-16 h-16 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 mb-8"
               >
                  <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                  <span className="absolute -bottom-8 font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                     Elevator Up
                  </span>
               </button>

               <div className="flex flex-col items-start md:items-end gap-2">
                  <a href="mailto:bhavyarathore575@gmail.com" className="font-headline font-black text-2xl md:text-3xl hover:text-blue-500 transition-colors">
                     layoutoryy@gmail.com
                  </a>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                     IN
                  </p>
               </div>

               <div className="flex gap-4 mt-8 justify-start md:justify-end">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                     <a key={i} href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all hover:scale-110">
                        <Icon size={18} />
                     </a>
                  ))}
               </div>
            </div>

         </div>

         <ScribbleLine />

         {/* BOTTOM BAR */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-dashed border-white/10 footer-item">
            <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
               © 2026 Layoutory Agency. All Rights Reserved.
            </div>
            
            <div className="font-hand text-sm text-gray-400 rotate-[-1deg] flex items-center gap-2">
               Designed & Built by <span className="text-white underline decoration-wavy decoration-blue-600">Layoutory</span>
            </div>

            <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest hidden md:block">
               No Templates Harmed.
            </div>
         </div>

      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

    </footer>
  );
}