"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Quote, MousePointer2 } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DOODLE COMPONENTS ---
const MaskingTape = ({ className, rotation }: { className?: string, rotation?: string }) => (
  <div className={`absolute w-32 h-8 bg-yellow-100/90 shadow-sm border-l border-r border-dashed border-white/40 backdrop-blur-sm z-30 ${className} ${rotation}`}
       style={{ clipPath: "polygon(2% 0, 98% 2%, 100% 95%, 0% 100%)" }}>
  </div>
);

const CoffeeStain = ({ className }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-30 mix-blend-multiply z-0 ${className}`} width="180" height="180" viewBox="0 0 100 100">
    <path d="M50,10 A40,40 0 1,1 10,50" stroke="#5a3a2a" strokeWidth="8" fill="none" strokeDasharray="60, 40" transform="rotate(20 50 50)" />
    <circle cx="50" cy="50" r="42" stroke="#5a3a2a" strokeWidth="2" fill="none" opacity="0.4" />
    <path d="M85,35 Q90,40 85,45" stroke="#5a3a2a" strokeWidth="4" fill="none" />
  </svg>
);

const ScribbleCircle = ({ className }: { className?: string }) => (
   <svg className={`absolute pointer-events-none z-10 ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
     <path d="M10,50 Q30,10 70,20 T90,50 T50,90 T10,50 T30,20" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5,2" />
   </svg>
);

const RoughArrow = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none z-0 text-black ${className}`} viewBox="0 0 100 100">
        <path d="M10,50 C30,40 60,40 80,60" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M80,60 L60,55 M80,60 L75,75" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      client: "Apex Homes",
      tag: "BUILDER",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
      result: "$4.2M SOLD",
      note: "Too easy!",
      tapeRot: "rotate-[-5deg]",
      cardRot: "rotate-2",
      scribbleColor: "text-blue-600",
    },
    {
      id: 2,
      client: "Moda Stone",
      tag: "SHOWROOM",
      image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=800&auto=format&fit=crop",
      result: "+200% VISITS",
      note: "Inventory Sync works.",
      tapeRot: "rotate-[5deg]",
      cardRot: "rotate-[-3deg]",
      scribbleColor: "text-red-500",
    },
    {
      id: 3,
      client: "Oasis Pools",
      tag: "OUTDOOR",
      image: "https://images.pexels.com/photos/3209053/pexels-photo-3209053.jpeg",
      result: "45 LEADS/MO",
      note: "Booked solid.",
      tapeRot: "rotate-[-10deg]",
      cardRot: "rotate-3",
      scribbleColor: "text-green-600",
    }
  ];

  // Safety Refresh
  useEffect(() => {
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Title Chaos (Using .to instead of .from)
    tl.to(".title-word", {
      y: 0,
      opacity: 1,
      rotate: (i) => (i % 2 === 0 ? -2 : 2), // Slight random rotation for final state if needed, or just 0
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // 2. Projects "Slapped" on the wall
    tl.to(".polaroid", {
      scale: 1,
      opacity: 1,
      rotate: (i) => (i % 2 === 0 ? 2 : -2), // Slight rotation for final resting place
      duration: 0.8,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=0.4");
    
    // 3. Floating Doodles
    tl.to(".doodle", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 md:px-8 bg-transparent min-h-screen">
      
      {/* --- BACKGROUND MESS --- */}
      <CoffeeStain className="top-20 left-10 hidden md:block" />
      <div className="absolute top-[40%] right-0 w-64 h-64 border-2 border-dashed border-gray-300 rounded-full opacity-50 pointer-events-none"></div>
      <RoughArrow className="w-32 h-32 top-40 right-20 rotate-12 hidden md:block opacity-40 text-gray-400" />

      {/* --- HEADER CHAOS --- */}
      <div className="max-w-7xl mx-auto mb-24 relative z-10 text-center md:text-left">
         <div className="inline-block relative">
            <h2 className="text-[15vw] md:text-[10vw] font-black uppercase leading-[0.8] text-black mix-blend-multiply tracking-tighter transform -rotate-2">
              <span className="title-word inline-block opacity-0 translate-y-12 rotate-12">Site</span><br/>
              <span className="title-word inline-block relative opacity-0 translate-y-12 rotate-12">
                  Visits
                  <ScribbleCircle className="w-[120%] h-[120%] -top-[10%] -left-[10%] text-red-500 animate-pulse" />
              </span>
            </h2>
            
            {/* Added opacity-0 scale-0 for initial state */}
            <div className="absolute -right-8 top-0 md:-right-24 md:top-12 bg-white border-2 border-black p-4 rotate-12 shadow-[6px_6px_0px_#000] doodle hidden md:block opacity-0 scale-0">
                <p className="font-hand text-xl text-blue-600 font-bold">"Evidence, not just pixels."</p>
            </div>
         </div>
         
         <p className="font-hand text-2xl md:text-3xl mt-8 md:ml-12 text-gray-700 max-w-lg rotate-1 relative z-10 title-word opacity-0 translate-y-12">
            We don't build "pretty". We build <span className="bg-yellow-300 px-2 font-bold transform -skew-x-12 inline-block">PROFITABLE</span>.
         </p>
      </div>

      {/* --- THE PROJECT WALL (Scattered Polaroids) --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-20">
        
        {projects.map((project) => (
          <div 
            key={project.id}
            // Added opacity-0 scale-150 for initial state
            className={`polaroid opacity-0 scale-150 group relative bg-white p-4 pb-12 shadow-xl transition-all duration-300 hover:z-50 hover:scale-105 ${project.cardRot}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
             {/* 1. MASKING TAPE (The "Pinned" look) */}
             <MaskingTape className="-top-4 left-1/2 -translate-x-1/2" rotation={project.tapeRot} />

             {/* 2. IMAGE AREA */}
             <div className="relative w-full aspect-[4/5] bg-gray-200 overflow-hidden border-2 border-black mb-4">
                 <img 
                   src={project.image} 
                   alt={project.client} 
                   className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                 />
                 
                 {/* OVERLAY: The Result (Scribbled) */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                     <div className="bg-white/90 border-2 border-black p-4 transform rotate-[-5deg] shadow-lg">
                        <span className={`font-hand font-black text-3xl md:text-4xl ${project.scribbleColor}`}>
                           {project.result}
                        </span>
                     </div>
                 </div>
             </div>

             {/* 3. CAPTION AREA (Messy Marker Text) */}
             <div className="text-center relative">
                 <h3 className="font-headline font-black text-2xl uppercase mb-1">{project.client}</h3>
                 <p className="font-mono text-xs text-gray-500 bg-gray-100 inline-block px-2 border border-gray-300 rounded-full mb-2">
                    {project.tag}
                 </p>
                 
                 {/* Handwritten Note (Absolute) */}
                 {/* Added opacity-0 scale-0 for initial state */}
                 <div className="absolute -bottom-10 -right-2 md:-right-6 rotate-[-6deg] doodle opacity-0 scale-0">
                    <div className="flex items-center gap-1 font-hand text-blue-600 text-lg">
                       <ArrowUpRight size={20} />
                       {project.note}
                    </div>
                 </div>
             </div>

             {/* Hover Effect: "See Case Study" Button */}
             <Link href={`/projects/${project.id}`} className="absolute inset-0 z-50" />
             
          </div>
        ))}
        
      </div>

      {/* --- BOTTOM CTA (Scribbled Arrow) --- */}
      <div className="relative mt-32 text-center">
          <RoughArrow className="w-24 h-24 absolute left-1/2 -translate-x-1/2 -top-16 text-black rotate-90" />
          <Link href="/portfolio">
            <button className="relative bg-black text-white font-headline font-bold text-xl uppercase px-12 py-6 hover:bg-yellow-400 hover:text-black transition-colors shadow-[8px_8px_0px_#888] hover:shadow-[4px_4px_0px_#000] border-2 border-transparent hover:border-black transform hover:-translate-y-1">
               See The Full Mess
            </button>
          </Link>
          <p className="mt-4 font-mono text-xs text-gray-500 uppercase tracking-widest opacity-60">
             ( Warning: High Conversion Ahead )
          </p>
      </div>

    </section>
  );
}