"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ruler, Armchair, Waves, ArrowRight, MousePointer2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  // --- CUSTOM ASSETS ---
  const BlueprintGrid = () => (
    <div className="absolute inset-0 opacity-20 pointer-events-none" 
         style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
         }}>
    </div>
  );

  const CoffeeStain = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none opacity-40 mix-blend-multiply ${className}`} width="120" height="120" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="#5a3a2a" strokeWidth="8" fill="none" strokeDasharray="90, 30" transform="rotate(-15 50 50)" />
      <circle cx="50" cy="50" r="40" stroke="#5a3a2a" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // Header Animation
    tl.from(".service-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Cards Stagger
    tl.from(".blueprint-card", {
      y: 100,
      opacity: 0,
      rotateX: -15,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)"
    }, "-=0.4");

  }, { scope: containerRef });

  const services = [
    {
      icon: <Ruler className="w-8 h-8 text-white" />,
      title: "Custom Builders",
      subtitle: "The Portfolio Engine",
      features: ["High-Res Project Galleries", "Before/After Sliders", "Trust Signals & Awards"],
      note: "PLAN: A",
    },
    {
      icon: <Armchair className="w-8 h-8 text-white" />,
      title: "Showrooms",
      subtitle: "Digital Walkthrough",
      features: ["Live Inventory Sync", "Category Filtering", "Brand Showcases"],
      note: "PLAN: B",
    },
    {
      icon: <Waves className="w-8 h-8 text-white" />,
      title: "Pools & Outdoor",
      subtitle: "The Lead Machine",
      features: ["Cost Estimators", "Seasonal Promos", "Instant Quote Forms"],
      note: "PLAN: C",
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row items-end justify-between gap-6 border-b-2 border-black pb-4 service-header">
         <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Scope of Works</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85]">
               The <br/><span className="text-blue-700">Blueprints</span>
            </h2>
         </div>
         <div className="font-hand text-xl max-w-xs rotate-[-2deg]">
            "We don't guess. We engineer." <br/>
            <span className="text-sm font-sans text-gray-500 mt-2 block not-italic">Select your industry schema below ↓</span>
         </div>
      </div>

      {/* BLUEPRINT CARDS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {services.map((service, i) => (
          <div key={i} className="blueprint-card group relative h-[450px] perspective-1000">
             
             {/* Pin/Tape */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-black shadow-sm z-20"></div>

             {/* The Card */}
             <div className="w-full h-full bg-[#003366] text-white p-6 relative shadow-[8px_8px_0px_#000] border-2 border-black transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_#000] overflow-hidden flex flex-col">
                
                <BlueprintGrid />
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div className="p-3 border border-white/30 bg-white/10 backdrop-blur-sm">
                      {service.icon}
                   </div>
                   <span className="font-mono text-xs border border-white/30 px-2 py-1 opacity-70">
                      {service.note}
                   </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                   <h3 className="font-headline text-3xl font-bold uppercase mb-1 group-hover:text-yellow-400 transition-colors">
                      {service.title}
                   </h3>
                   <p className="font-mono text-blue-200 text-sm mb-6 border-b border-blue-500/30 pb-4 inline-block">
                      // {service.subtitle}
                   </p>

                   <ul className="space-y-4">
                      {service.features.map((feat, j) => (
                         <li key={j} className="flex items-center gap-3 text-sm font-medium">
                            <span className="w-1.5 h-1.5 bg-white rounded-none"></span>
                            {feat}
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Footer / CTA Hover */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/20 flex items-center justify-between group-hover:border-yellow-400 transition-colors">
                   <span className="font-mono text-xs uppercase tracking-wider opacity-60">
                      View Specs
                   </span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-yellow-400" />
                </div>

                {/* Measurement Lines (Decoration) */}
                <div className="absolute bottom-4 -right-4 text-[10px] font-mono opacity-30 rotate-[-90deg]">
                   SCALE 1:100
                </div>

             </div>
             
             {/* Coffee Stain on the 2nd card only */}
             {i === 1 && <CoffeeStain className="-bottom-8 -right-8 z-30" />}
          </div>
        ))}

      </div>

      {/* MOUSE DECORATION (Absolute) */}
      <div className="absolute top-1/2 right-[5%] hidden lg:block rotate-12 opacity-60">
         <div className="flex flex-col items-center gap-2">
            <MousePointer2 className="w-8 h-8 fill-black" />
            <span className="font-hand text-sm bg-yellow-200 px-2">Click to expand</span>
         </div>
      </div>

    </section>
  );
}