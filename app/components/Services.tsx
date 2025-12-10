"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = [
  { 
    id: "branding", 
    label: "BRANDING", 
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
    position: "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-10 md:left-[10%]" 
  },
  { 
    id: "uiux", 
    label: "UI/UX", 
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    position: "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-20 md:right-[15%]" 
  },
  { 
    id: "framer", 
    label: "FRAMER", 
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
    position: "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-32 md:left-[20%]" 
  },
  { 
    id: "animation", 
    label: "ANIMATION", 
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    position: "bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-10 md:right-[20%]" 
  },
];

export default function Services() {
const [hovered, setHovered] = useState<string | null>(null);


  return (
    // CHANGE 1: min-h-[50vh] instead of min-h-screen for mobile to reduce vertical height
    <section className="relative w-full min-h-[60vh] md:min-h-screen bg-brand-dark flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden">
      
      {/* Top Header */}
      <div className="absolute top-4 md:top-10 w-full px-4 md:px-8 flex justify-between items-center text-gray-600 font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-white/5 pb-2 md:pb-4">
        <span>//</span>
        <span className="text-white font-bold">Services</span>
        <span>//</span>
      </div>

      {/* The Central Stacked Text */}
      <div className="relative z-20 flex flex-col items-center justify-center -space-y-1 md:-space-y-4 select-none mt-8 md:mt-0">
        {services.map((service) => (
          <div 
            key={service.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === service.id ? null : service.id)}
          >
            {/* CHANGE 2: Reduced text-[12vw] and leading-[0.8] for tighter mobile stack */}
            <h2 
              className={`font-display font-black text-[12vw] md:text-[11vw] leading-[0.8] md:leading-[0.85] uppercase tracking-tighter transition-all duration-500
                ${hovered === service.id 
                  ? "text-white scale-105 z-50" 
                  : hovered !== null 
                    ? "text-zinc-800 blur-[1px] md:blur-[2px] scale-95" 
                    : "text-zinc-800"
                }
              `}
            >
              {service.label}
            </h2>

            {/* Desktop-only sub-labels */}
            {service.id === 'uiux' && (
               <div className="hidden md:block absolute -left-32 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Web & App Design <br/> UX Research
               </div>
            )}
             {service.id === 'branding' && (
               <div className="hidden md:block absolute -right-24 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Logo Design <br/> Graphic
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Images Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
        <AnimatePresence>
            {services.map((service) => (
                hovered === service.id && (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`absolute ${service.position} z-30 w-full md:w-auto flex justify-center md:block pointer-events-auto`}
                    >
                        <div className="w-[80vw] max-w-[300px] aspect-video md:w-[320px] md:h-[220px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900">
                             <img 
                                src={service.img} 
                                alt={service.label} 
                                className="w-full h-full object-cover" 
                             />
                             <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </motion.div>
                )
            ))}
        </AnimatePresence>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
    </section>
  );
}