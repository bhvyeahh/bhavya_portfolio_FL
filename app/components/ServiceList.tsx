"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    label: "CAFETERIA & RESTAURANT",
    sub: "Cafes • Fine Dining • Menus",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    label: "CLINIC & HEALTH",
    sub: "Private Practice • Booking Systems",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    label: "REAL ESTATE",
    sub: "Property Listings • Agency Portals",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    label: "CORPORATE",
    sub: "SaaS • Startups • Portfolios",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function ServiceList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] py-32 px-4 md:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5">
      
      {/* --- Section Header --- */}
      <div className="w-full flex justify-between items-end mb-24 px-2 md:px-4">
          <div>
            <div className="flex items-center gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                <span>//</span>
                <span className="text-white font-bold tracking-widest">MY SPECIALIZATIONS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase max-w-2xl leading-tight">
                Curated Digital <br/> Solutions
            </h2>
          </div>
          <p className="hidden md:block text-xs font-mono text-gray-400 max-w-xs text-right">
              HOVER TO VIEW PROJECTS
          </p>
      </div>

      {/* --- The 3D List Container --- */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 perspective-[1000px]">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="relative h-24 md:h-32 w-full group cursor-pointer z-10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* The 3D Pivoting Box */}
            <motion.div
              initial={false}
              animate={{
                rotateX: hoveredIndex === index ? 35 : 0, // Tilts the whole assembly down
              }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }} // Custom bezier for that "heavy" feel
              className="relative w-full h-full transform-style-3d origin-center"
            >
              
              {/* --- FRONT FACE (The Text Bar) --- */}
              {/* This is what you see by default. */}
              <div className="absolute inset-0 bg-[#0a0a0a] border border-white/10 flex items-center justify-between px-6 md:px-12 backface-hidden z-20 transition-colors duration-500 group-hover:border-white/30 group-hover:bg-[#111]">
                  
                  {/* Left: ID & Label */}
                  <div className="flex items-baseline gap-8 md:gap-16">
                      <span className="font-mono text-xs text-gray-600">0{index + 1}</span>
                      <h3 className="font-display font-black text-3xl md:text-5xl uppercase text-white tracking-tighter group-hover:text-brand-green transition-colors">
                          {service.label}
                      </h3>
                  </div>

                  {/* Right: Sub-label & Arrow */}
                  <div className="flex items-center gap-8">
                      <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                          {service.sub}
                      </span>
                      <ArrowUpRight className="text-gray-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300" size={24} />
                  </div>
              </div>


              {/* --- TOP FACE (The Hidden Image Lid) --- */}
              {/* Attached to the top edge, rotated back 90deg. */}
              <div 
                className="absolute left-0 bottom-[100%] w-full h-[200px] md:h-[300px] bg-zinc-800 origin-bottom transform -rotate-x-90 border border-white/10 overflow-hidden brightness-50 group-hover:brightness-100 transition-all duration-500"
              >
                 <img 
                    src={service.img} 
                    alt={service.label} 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                 />
                 {/* Gradient Overlay for text readability if needed */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                 
                 {/* Floating Label on the Image itself */}
                 <div className="absolute bottom-4 left-6 md:left-12">
                     <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase text-white">
                        View {service.label} Projects
                     </span>
                 </div>
              </div>

            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-30"></div>
    </section>
  );
}