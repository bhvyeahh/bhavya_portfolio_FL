"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Updated project data with your specific links
const projects = [
  {
    id: "beany-barista",
    title: "BEANY BARISTA",
    category: "BRANDING / WEB DESIGN",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop", // Coffee vibe
    link: "https://beanybarsita-demo.vercel.app/", 
    size: "large" // Takes up the big left slot
  },
  {
    id: "notezen",
    title: "NOTEZEN APP",
    category: "WEB APP / SAAS",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop", // Clean tech vibe
    link: "https://notezenn.vercel.app/",
    size: "small" // Takes up the small right slot
  },
  {
    id: "luxury-cafe",
    title: "LUXURY CAFE",
    category: "E-COMMERCE",
    img: "https://framerusercontent.com/images/E3D1ipROmSUYy4qPfW8Lftxig.jpg?scale-down-to=2048",
    link: "https://luxury-cafe-demo.vercel.app",
    size: "large"
  },
  {
    id: "barber-shop",
    title: "BARBER SHOP",
    category: "LOCAL BUSINESS",
    img: "https://framerusercontent.com/images/lh61MkFEnG13s0kkVrM6qETSdg.webp?scale-down-to=1024&width=1920&height=1280",
    link: "https://blssd-barber-shop.vercel.app/",
    size: "small"
  }
];

export default function FeaturedWorks() {
  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-white/5 overflow-hidden">
      
      {/* --- Section Header --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-24 relative z-20">
        <span>//</span>
        <h2 className="text-white font-bold tracking-widest text-lg md:text-xl">FEATURED WORKS</h2>
        <span>//</span>
      </div>

      {/* --- Description Centered --- */}
      <div className="w-full flex justify-center mb-24 relative z-20">
          <p className="text-gray-400 text-xs md:text-sm font-mono text-center max-w-md leading-relaxed">
             A curated selection of projects that reflect our commitment <br className="hidden md:block" />
             to simplicity and purposeful design.
          </p>
      </div>

      {/* --- Projects Grid Layout --- */}
      {/* This grid creates the specific "Big Left / Small Right" layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-20">
        
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`group relative flex flex-col gap-6 ${
                project.size === "large" ? "lg:col-span-8" : "lg:col-span-4" // 8 columns vs 4 columns width
            }`}
          >
             {/* Image Card */}
             <a href={project.link} target="_blank" className="block overflow-hidden rounded-[2rem] relative">
                 <div className={`w-full bg-[#111] overflow-hidden relative ${
                     project.size === "large" ? "aspect-[16/10]" : "aspect-[4/5] lg:aspect-square"
                 }`}>
                     <img 
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                 </div>
             </a>

             {/* Project Info (Below Image) */}
             <div className="flex justify-between items-end px-2">
                 <div>
                     <h3 className="font-display font-black text-3xl md:text-4xl uppercase text-white tracking-tighter mb-2">
                        {project.title}
                     </h3>
                     <div className="flex gap-2">
                        <span className="bg-[#1a1a1a] text-gray-400 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-colors duration-300">
                            {project.category}
                        </span>
                     </div>
                 </div>

                 {/* Arrow Button */}
                 <a 
                    href={project.link} 
                    target="_blank"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                 >
                    <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                 </a>
             </div>

          </motion.div>
        ))}

      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}