"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* --- Floating Globe Icon --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <Globe className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin-slow" strokeWidth={0.8} />
      </motion.div>

      {/* --- Massive Typography --- */}
      <div className="relative z-10 text-center flex flex-col items-center">
        
        {/* Line 1: READY TO */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-black text-[10vw] leading-[0.8] uppercase text-white tracking-tighter"
        >
          READY TO
        </motion.h2>

        {/* Line 2: COLLABORATE? */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display font-black text-[10vw] leading-[0.8] uppercase text-white tracking-tighter mb-8"
        >
          COLLABORATE?
        </motion.h2>

        {/* --- Subtext --- */}
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white text-sm md:text-lg font-mono text-center max-w-md leading-relaxed mb-12"
        >
            Have a project in mind? <br/>
            Let’s create something extraordinary together
        </motion.p>

        {/* --- Button --- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
        >   <Link href="mailto:bhavyarathore575@gmail.com">
        
            <button className="group relative px-8 py-4 rounded-full border border-white/20 overflow-hidden bg-transparent transition-all duration-300 hover:border-white hover:scale-105">
                <span className="relative z-10 text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-300">
                    Contact Now
                </span>
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
        </Link>
        </motion.div>

      </div>

      {/* --- Background Grid Pattern --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
      
      {/* --- Ambient Glow --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

    </section>
  );
}