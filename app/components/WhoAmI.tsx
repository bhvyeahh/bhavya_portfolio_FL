"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Zap, Target, BarChart2, MousePointer2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MousePointer2,
    title: "Conversion Engineering",
    desc: "Every pixel is placed to drive user action. We don't just design; we direct traffic."
  },
  {
    icon: Zap,
    title: "Latency Elimination",
    desc: "Sub-100ms load times. We strip away the bloat to ensure instant interaction."
  },
  {
    icon: Target,
    title: "Precision SEO",
    desc: "Local dominance architecture. We structure data so Google prefers your business."
  },
  {
    icon: BarChart2,
    title: "Revenue Feedback",
    desc: "Built-in analytics loops. See exactly which leads turn into paying high-ticket clients."
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Reveal Background Lines
    tl.fromTo(".grid-line", 
      { scaleX: 0, transformOrigin: "left" }, 
      { scaleX: 1, duration: 1.5, stagger: 0.1, ease: "expo.out" }
    );

    // 2. Title Slide Up
    tl.fromTo(".about-title-char",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power4.out" },
      "-=1.2"
    );

    // 3. Feature Cards Cascade
    tl.fromTo(".feature-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F0F2F5] text-[#111] py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* --- BACKGROUND GRID (Blueprint Style) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Horizontal Lines */}
        <div className="grid-line absolute top-[20%] left-0 w-full h-[1px] bg-black/5"></div>
        <div className="grid-line absolute top-[50%] left-0 w-full h-[1px] bg-black/5"></div>
        <div className="grid-line absolute top-[80%] left-0 w-full h-[1px] bg-black/5"></div>
        {/* Vertical Lines */}
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-black/5 hidden md:block"></div>
        <div className="absolute right-[10%] top-0 h-full w-[1px] bg-black/5 hidden md:block"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* --- LEFT: MANIFESTO (Sticky) --- */}
        <div className="lg:col-span-5 flex flex-col justify-start">
           <div className="inline-flex items-center gap-2 mb-8 opacity-60">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">The Layoutory Standard</span>
           </div>

           <h2 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.9] mb-10 overflow-hidden">
             {/* Splitting text for animation */}
             {"SYSTEMS".split("").map((char, i) => (
               <span key={i} className="about-title-char inline-block">{char}</span>
             ))}
             <br/>
             {"OVER".split("").map((char, i) => (
               <span key={i} className="about-title-char inline-block text-gray-400 font-serif italic pr-2">{char}</span>
             ))}
             <br/>
             {"SITES".split("").map((char, i) => (
               <span key={i} className="about-title-char inline-block">{char}</span>
             ))}
           </h2>

           <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md feature-card">
             We don't build "brochure" websites. We engineer high-performance acquisition machines. 
             If it doesn't capture leads, automate bookings, or track revenue, it doesn't leave our lab.
           </p>

           <div className="mt-12 feature-card">
              <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                 Our Methodology <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
        </div>

        {/* --- RIGHT: GRID OF SPECS (Features) --- */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5 rounded-3xl overflow-hidden shadow-sm">
           
           {features.map((feature, idx) => (
             <div 
               key={idx} 
               className="feature-card bg-[#F0F2F5] p-10 flex flex-col gap-6 hover:bg-white transition-colors duration-500 group relative"
             >
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-gray-400">0{idx + 1}</div>
                
                <div className="w-12 h-12 rounded-xl bg-gray-200 group-hover:bg-blue-600 text-black group-hover:text-white transition-all duration-300 flex items-center justify-center">
                   <feature.icon size={20} strokeWidth={1.5} />
                </div>
                
                <div>
                   <h3 className="text-xl font-medium mb-3 tracking-tight">{feature.title}</h3>
                   <p className="text-xs text-gray-500 leading-relaxed pr-4">
                     {feature.desc}
                   </p>
                </div>
             </div>
           ))}

        </div>

      </div>

      {/* --- BOTTOM DECOR --- */}
      
    </section>
  );
}