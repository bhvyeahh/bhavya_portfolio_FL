"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-6 md:pt-8 px-4 md:px-8 overflow-hidden bg-brand-dark pb-20 md:pb-32">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center md:items-start mb-12 md:mb-16 z-50">
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl md:text-2xl tracking-tighter text-white">BHAVYA.</span>
          <div className="text-[9px] md:text-[10px] text-gray-400 mt-1 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse shadow-[0_0_8px_#00ff41]"></span>
            Accepting New Clients
          </div>
        </div>

        <div className="hidden md:block text-xs font-mono text-gray-500 text-right">
          LOCAL TIME <br /> {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
        
        <Link href="mailto:bhavyarathore575@gmail.com">
          <button className="group border border-white/20 px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <span className="hidden sm:inline">bhavyarathore575@gmail.com</span>
            <span className="sm:hidden">Email Me</span>
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
          </button>
        </Link>
      </nav>

      {/* Main Hero Text */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mt-4">
        <div className="md:col-span-8 relative z-20">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-black text-[17vw] md:text-[14vw] lg:text-[12vw] leading-[0.8] tracking-tighter uppercase text-white text-center md:text-left"
          >
            BHAVYA
            <br />
            <span className="text-zinc-700">DEV.</span>
          </motion.h1>
        </div>

        <div className="md:col-span-4 flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6 mt-10 md:mt-24 z-20 text-center md:text-left">
            <Globe className="w-6 h-6 md:w-8 md:h-8 text-white/80" strokeWidth={1} />
            <h2 className="font-display text-lg md:text-xl font-bold uppercase leading-tight text-white">
                UI Visual Designer and <br /> Framer Developer
            </h2>
            <p className="text-xs text-gray-400 max-w-[280px] md:max-w-xs leading-relaxed">
                I love creating captivating and functional interfaces that evoke emotions and establish a connection between the brand and the user.
            </p>
        </div>
      </div>

      {/* --- THE SKEWED WORK SHOWCASE --- */}
      <div className="relative w-full mt-20 md:mt-24">
        
        {/* The Badge Floating Over the Grid */}
        <div className="absolute left-1/2 -top-14 md:-top-24 -translate-x-1/2 z-30">
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#111] border border-white/20 flex items-center justify-center relative shadow-2xl"
             >
                <svg viewBox="0 0 100 100" className="w-full h-full absolute animate-spin-slow p-2">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[12px] font-bold fill-white uppercase tracking-widest">
                    <textPath href="#curve">Verified Framer Expert • Verified Framer Expert •</textPath>
                  </text>
                </svg>
                <div className="text-2xl md:text-3xl font-bold text-white">F</div>
             </motion.div>
        </div>

        {/* The Slanted Image Grid */}
        <motion.div 
            initial={{ rotateX: 20, opacity: 0, y: 100 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-full h-[35vh] md:h-[60vh] overflow-hidden rounded-t-3xl border-t border-white/10 relative"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4 transform -skew-y-3 scale-110 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {/* Images */}
                <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mt-8 md:mt-12"></div>
                <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mt-8 md:mt-12"></div>
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute bottom-0 w-full h-24 md:h-32 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        </motion.div>

        {/* Status Footer */}
        <div className="absolute bottom-0 w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0 text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 py-4 border-t border-white/5 bg-brand-dark z-20">
            <div className="flex items-center gap-2">
                Available for Project <span className="w-1.5 h-1.5 bg-brand-green rounded-full"></span>
            </div>
            <div className="hidden md:block">Result On Time Delivery</div>
            <div className="hidden md:block">NDA Agreement Ready</div>
            {/* Mobile Only variant for middle items if you want them shown */}
            <div className="md:hidden flex gap-4">
                <span>On Time Delivery</span>
                <span>•</span>
                <span>NDA Ready</span>
            </div>
        </div>

      </div>
    </section>
  );
}