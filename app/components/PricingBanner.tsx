"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PricingBanner() {
  const containerRef = useRef(null);
  
  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Triggers as the section enters and leaves viewport
  });

  // Parallax and scaling for the image:
  // Starts larger and lower, moves to its final position and size.
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1.2, 1]);
  const imageY = useTransform(scrollYProgress, [0.2, 0.5], ["10%", "0%"]);

  // Text reveal: Fades in and moves up as the image settles.
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* --- Full-screen Parallax Image --- */}
      <motion.div 
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 w-full h-full z-0"
      >
          {/* Image from your public folder */}
          <img 
             src="/pricebg.png" 
             alt="Pricing Background" 
             className="w-full h-full object-cover opacity-50"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/10"></div>
      </motion.div>

      {/* --- Revealed Text Content --- */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-4"
      >
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white tracking-tighter mb-4">
              Good Design Is <br/> Good Business
          </h2>
          <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">
              Invest in your digital presence.
          </p>
      </motion.div>

    </section>
  );
}