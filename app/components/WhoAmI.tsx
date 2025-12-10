"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const skills = [
  "FULL STACK",
  "NEXT.JS 14",
  "REACT",
  "NODE.JS",
  "TAILWIND CSS",
  "DATABASE DESIGN"
];

// --- Helper Component for the smooth typing effect ---
const TypingText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    // Split text into individual characters
    const letters = Array.from(text);
  
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: delay * i }
      })
    };
  
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        }
      },
      hidden: {
        opacity: 0,
        y: 20,
      },
    };
  
    return (
      <motion.span
        style={{ overflow: "hidden", display: "inline-block" }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className={className}
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    );
  };


export default function WhoAmI() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] pt-12 pb-8 px-6 md:px-12 overflow-hidden flex flex-col justify-between border-t border-white/5">
      
      {/* --- 1. Top Bar Markers --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 relative z-50">
        <span>//</span>
        <span className="text-white font-bold tracking-widest">WHO AM I</span>
        <span>//</span>
      </div>

      {/* --- 2. Main Content Wrapper --- */}
      <div className="relative flex-grow w-full h-full flex flex-col lg:block">
        
        {/* LEFT: Massive Location Typography with Typing Effect */}
        <div className="relative z-30 pt-4 lg:pt-10 pointer-events-none">
          <h2 className="font-display font-black text-[16vw] lg:text-[13vw] leading-[0.8] uppercase text-white tracking-tighter block">
            {/* We use two separate components to handle the line break gracefully */}
            <TypingText text="INDIA," delay={0.1} />
            <br />
            <TypingText text="BASE" delay={0.4} />
          </h2>

          {/* Pill Skills Tags (Normal fade in, not typing) */}
          <div className="mt-8 lg:mt-12 flex flex-wrap gap-3 max-w-lg pointer-events-auto">
            {skills.map((skill, index) => (
              <motion.span 
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 + (index * 0.05) }} // Delayed until after text types
                className="px-5 py-2 rounded-full border border-white/30 text-[10px] md:text-[11px] font-bold font-mono uppercase text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer hover:scale-105 bg-black/50 backdrop-blur-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Globe Icon */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 1.2 }}
             className="mt-8 pointer-events-auto inline-block"
          >
             <Globe className="w-12 h-12 text-white animate-spin-slow" strokeWidth={0.8} />
          </motion.div>
        </div>

        {/* CENTER/RIGHT: The "Sliced" Portrait Effect (Unchanged) */}
        <div className="absolute top-[20%] lg:top-[-5%] right-[-10%] lg:right-[0%] w-[120%] lg:w-[65%] h-[80%] lg:h-[110%] z-10 pointer-events-none mix-blend-screen">
             <div className="relative w-full h-full">
                 <img 
                    src="/mypfp.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover object-top opacity-90 grayscale contrast-125"
                 />
                 <div className="absolute inset-0 w-full h-full flex justify-between">
                    {[...Array(12)].map((_, i) => (
                        <div 
                           key={i} 
                           className="h-full bg-[#050505]" 
                           style={{ width: i % 2 === 0 ? '4%' : '2%', opacity: i % 2 === 0 ? 0.9 : 0.4 }}
                        />
                    ))}
                 </div>
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                 <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#050505] to-transparent"></div>
             </div>
        </div>

      </div>

      {/* --- 3. Bottom Layer (Text Overlapping Image with Typing Effect) --- */}
      <div className="relative z-40 mt-auto pt-10 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
          
          {/* Job Title - Typing Effect */}
          <h2 className="font-display font-black text-[13vw] lg:text-[10vw] leading-[0.8] uppercase text-white tracking-tighter mix-blend-difference">
            <TypingText text="WEB DEV/" delay={0.2} />
            <br />
            <TypingText text="CONSULTANT" delay={0.5} />
          </h2>

          {/* Description - Typing Effect */}
          <div className="max-w-xs text-right text-[10px] md:text-xs text-gray-400 leading-relaxed font-mono uppercase tracking-wide md:mb-4 mix-blend-difference">
             <TypingText 
                text="I specialize in solving business problems with code. From custom Next.js platforms to high-converting landing pages, I ensure your vision scales seamlessly online." 
                delay={0.8}
             />
          </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>

    </section>
  );
}