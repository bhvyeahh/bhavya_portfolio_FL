"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles, Car, Coffee, BarChart3 } from "lucide-react";

// --- DATA ---
const services = [
  {
    id: "01",
    title: "MOBILE DETAILING",
    category: "BOOKING SYSTEMS",
    desc: "Auto-sync calendar & deposit systems.",
    icon: <Car className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "CERAMIC COATING",
    category: "HIGH TICKET SALES",
    desc: "Showcase expensive packages efficiently.",
    icon: <Sparkles className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "CAFES & DINING",
    category: "DIGITAL MENUS",
    desc: "QR menus & commission-free ordering.",
    icon: <Coffee className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "GROWTH & SEO",
    category: "GOOGLE MAPS RANKING",
    desc: "Dominate local search results.",
    icon: <BarChart3 className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function ServiceList() {
  const containerRef = useRef<HTMLElement>(null);

  // Simple, safe interaction logic using standard CSS classes + GSAP context for internal moves
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const img = target.querySelector(".card-img");
    const overlay = target.querySelector(".card-overlay");
    const icon = target.querySelector(".card-icon");
    
    // Zoom Image
    gsap.to(img, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    // Darken overlay slightly less to reveal image
    gsap.to(overlay, { opacity: 0.4, duration: 0.5 });
    // Rotate Icon
    gsap.to(icon, { rotate: 45, scale: 1.2, color: "#fff", duration: 0.3 });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const img = target.querySelector(".card-img");
    const overlay = target.querySelector(".card-overlay");
    const icon = target.querySelector(".card-icon");

    gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0.7, duration: 0.5 });
    gsap.to(icon, { rotate: 0, scale: 1, color: "#9ca3af", duration: 0.3 });
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] py-24 px-4 md:px-12 flex flex-col justify-center border-t border-white/5"
    >
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end mb-16 px-2 md:px-4">
        <div>
          <div className="flex items-center gap-3 text-brand-green font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
             <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
             <span>Specialized Niches</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Expertise <br/> Areas
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 mt-6 md:mt-0">
          <span>SELECT A CARD</span>
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* --- GRID LAYOUT (Stable & Responsive) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-7xl mx-auto h-auto md:h-[800px]">
        {services.map((service, index) => (
          <div
            key={service.id}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="group relative w-full h-[300px] md:h-full rounded-3xl overflow-hidden border border-white/10 cursor-pointer bg-zinc-900"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                    src={service.img} 
                    alt={service.title} 
                    className="card-img w-full h-full object-cover scale-100 transition-transform will-change-transform"
                />
                {/* Overlay - Always visible to ensure text readability */}
                <div className="card-overlay absolute inset-0 bg-black/70 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                
                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <span className="font-mono text-xs md:text-sm text-gray-400 border border-white/20 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md">
                        {service.id} — {service.category}
                    </span>
                    <div className="card-icon text-gray-400 transition-colors duration-300">
                        <ArrowUpRight size={28} />
                    </div>
                </div>

                {/* Bottom Row */}
                <div>
                    <div className="mb-4 text-brand-green">
                        {service.icon}
                    </div>
                    <h3 className="font-display font-black text-3xl md:text-5xl text-white uppercase leading-none mb-4 translate-y-0 md:group-hover:-translate-y-2 transition-transform duration-500">
                        {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 ease-out">
                        {service.desc}
                    </p>
                </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-3xl transition-colors duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-20"></div>
    </section>
  );
}