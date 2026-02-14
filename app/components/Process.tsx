"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Braces, Key } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);

  // --- CUSTOM SVG PATHS ---
  // A wiggly line that connects the steps vertically
  const ConnectionLine = () => (
    <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 100 800" preserveAspectRatio="none">
       {/* The "Gray" Guide Line */}
       <path 
         d="M50,0 Q60,100 40,200 T50,400 T60,600 T50,800" 
         stroke="#e5e7eb" 
         strokeWidth="4" 
         fill="none" 
         strokeDasharray="10,10"
       />
       {/* The "Marker" Line that draws on scroll */}
       <path 
         id="draw-path"
         d="M50,0 Q60,100 40,200 T50,400 T60,600 T50,800" 
         stroke="#000" 
         strokeWidth="4" 
         fill="none" 
         strokeLinecap="round"
       />
    </svg>
  );

  const steps = [
    {
      id: "01",
      title: "The Dig",
      subtitle: "Discovery & Strategy",
      desc: "We don't just guess. We excavate your competitor's data and find the gaps.",
      icon: <Search className="w-8 h-8 text-white" />,
      color: "bg-blue-600",
      rotation: "-rotate-3",
    },
    {
      id: "02",
      title: "The Frame",
      subtitle: "Wireframe & UX",
      desc: "Structure before style. We build the skeleton to ensure conversion flow.",
      icon: <PenTool className="w-8 h-8 text-white" />,
      color: "bg-yellow-500",
      rotation: "rotate-2",
    },
    {
      id: "03",
      title: "The Pour",
      subtitle: "Development",
      desc: "Clean code. No bloat. Built on Next.js for speed that Google loves.",
      icon: <Braces className="w-8 h-8 text-white" />,
      color: "bg-black",
      rotation: "-rotate-2",
    },
    {
      id: "04",
      title: "The Keys",
      subtitle: "Launch & Handoff",
      desc: "We hand over a fully tested engine, not just a website. You own it all.",
      icon: <Key className="w-8 h-8 text-white" />,
      color: "bg-green-600",
      rotation: "rotate-3",
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1, // Smooth drawing linked to scroll
      }
    });

    // 1. Draw the line
    tl.fromTo("#draw-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, ease: "none" }
    );

    // 2. Animate Steps individually as we scroll past them
    steps.forEach((step, index) => {
        gsap.from(`.step-card-${index}`, {
            scrollTrigger: {
                trigger: `.step-card-${index}`,
                start: "top 75%",
                toggleActions: "play reverse play reverse",
            },
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "back.out(1.5)"
        });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-2 overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-24 relative z-10 px-4">
         <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 px-2 py-1 rounded-full bg-white mb-4 inline-block">
            Our Method
         </span>
         <h2 className="text-5xl md:text-7xl font-black uppercase text-black leading-none">
            From <span className="underline decoration-wavy decoration-blue-500">Napkin</span> <br/>
            To <span className="bg-black text-white px-2 transform skew-x-[-10deg] inline-block">Keys</span>.
         </h2>
      </div>

      {/* THE FLOWCHART */}
      <div className="max-w-4xl mx-auto relative px-4">
         
         {/* The Wavy Connector Line */}
         <ConnectionLine />

         <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {steps.map((step, i) => (
               <div 
                 key={i} 
                 className={`step-card-${i} flex items-center gap-8 md:gap-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse md:flex-row'} relative`}
               >
                  {/* Step Number / Marker */}
                  <div className={`hidden md:flex w-24 h-24 rounded-full border-4 border-black bg-white items-center justify-center relative shadow-[4px_4px_0px_#000] z-20 shrink-0 ${step.rotation}`}>
                     <span className="font-black text-3xl">{step.id}</span>
                     {/* Connector Dot */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>
                  </div>

                  {/* The Card */}
                  <div className={`flex-1 bg-white border-2 border-black p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0px_#000] transition-shadow duration-300 group ${i % 2 !== 0 ? 'md:text-right' : 'text-left'}`}>
                     
                     {/* Icon Badge */}
                     <div className={`absolute -top-6 ${i % 2 !== 0 ? 'md:right-8 left-8' : 'left-8'} w-12 h-12 ${step.color} border-2 border-black flex items-center justify-center shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                        {step.icon}
                     </div>

                     <div className="mt-4">
                        <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                           {step.subtitle}
                        </span>
                        <h3 className="font-headline font-black text-2xl md:text-4xl uppercase mb-2 mt-1">
                           {step.title}
                        </h3>
                        <p className="font-hand text-lg text-gray-600 leading-snug">
                           {step.desc}
                        </p>
                     </div>

                     {/* Messy Arrow Decoration for Step 1 & 3 */}
                     {(i === 0 || i === 2) && (
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                           <svg width="40" height="20" viewBox="0 0 40 20" className="text-gray-400 rotate-12">
                              <path d="M0,10 Q20,0 40,10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                              <path d="M35,5 L40,10 L35,15" stroke="currentColor" strokeWidth="2" fill="none" />
                           </svg>
                        </div>
                     )}

                  </div>
               </div>
            ))}
         </div>

      </div>

      {/* FOOTER NOTE */}
      <div className="text-center mt-24">
         <p className="font-hand text-xl text-gray-400 rotate-[-2deg]">
            ( It usually takes 2-3 weeks. )
         </p>
      </div>

    </section>
  );
}