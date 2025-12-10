"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote: "CLEAN UI, SMOOTH INTERACTIONS, AND THOUGHTFUL DETAILS, IT'S EXACTLY WHAT WE NEEDED.",
    name: "Thiago Alcatara",
    title: "MARKETING MANAGEMENT, ABC JSC",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    align: "right"
  },
  {
    id: 2,
    quote: "WORKING WITH PORTX WAS A GAME-CHANGER. THE DESIGN WAS NOT ONLY BEAUTIFUL BUT ALSO SUPER INTUITIVE.",
    name: "Bobby Clarkson",
    title: "CEO FOUNDER, AGENCIFY",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    align: "left"
  },
  {
    id: 3,
    quote: "10 POINTS!!! NOTHING TO SAY. BEST DESIGNER WITH ME.",
    name: "Nathan Drake",
    title: "DESIGN LEAD, BRUNO",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    align: "right"
  },
  {
    id: 4,
    quote: "BIGGER, BOLDER & BETTER. HE TOOK OUR VAGUE IDEAS AND TURNED THEM INTO A PIXEL-PERFECT PRODUCT.",
    name: "Lukas Franklin",
    title: "HEAD OF PRODUCT, AIXOR",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    align: "left"
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rotates the central badge based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] min-h-[300vh] border-t border-white/5">
      
      {/* --- STICKY BACKGROUND LAYER --- */}
      {/* This occupies the first screen height and stays there */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-0">
          
          {/* Header Markers */}
          <div className="absolute top-10 w-full px-8 flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] z-20">
            <span>//</span>
            <span className="text-white font-bold tracking-widest">TESTIMONIALS</span>
            <span>//</span>
          </div>

          {/* Central Spinning Badge */}
          <motion.div 
            style={{ rotate }}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
          >
             <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
               <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
               <text className="text-[6px] font-bold fill-[#ff3300] uppercase tracking-[0.2em]">
                 <textPath href="#curve">
                   Testimonial - Trusted By Clients - Testimonial - Trusted By Clients -
                 </textPath>
               </text>
             </svg>
             
             <div className="absolute text-[#ff3300] text-[150px] md:text-[200px] font-black leading-none mt-12">
               ”
             </div>
          </motion.div>

          <p className="absolute bottom-20 text-gray-500 text-[10px] font-mono uppercase tracking-widest text-center">
            Your satisfaction is my reputation, <br/> see what clients say
          </p>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-[-1]"></div>
      </div>


      {/* --- SCROLLING CARDS LAYER --- */}
      {/* Negative margin pulls this UP to overlap the sticky background, but only within the section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 -mt-[100vh]">
          
          {/* BUFFER SPACER: Pushes the first card down so we see the spinner first */}
          <div className="h-[50vh] w-full pointer-events-none"></div>

          {testimonials.map((t) => (
             <div 
               key={t.id}
               className={`flex w-full mb-32 md:mb-64 ${t.align === 'right' ? 'justify-end' : 'justify-start'}`}
             >
                <motion.div
                  initial={{ opacity: 0, y: 100, x: t.align === 'right' ? 50 : -50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }} // Triggers when card is 10% into view
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-[450px] bg-[#111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative group hover:border-white/20 transition-colors"
                >
                    <p className="font-display font-bold text-lg md:text-xl text-white uppercase leading-tight mb-8">
                       "{t.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                            <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-xs uppercase tracking-wide">{t.name}</h4>
                            <p className="text-gray-500 text-[9px] font-mono uppercase mt-1">{t.title}</p>
                        </div>
                        
                        <div className="ml-auto opacity-50">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-10 10 5-10 5zm0 9l2-10 10 5-10 5z"/></svg>
                        </div>
                    </div>
                </motion.div>
             </div>
          ))}
          
          {/* Bottom Buffer to ensure last card clears nicely */}
          <div className="h-[20vh] w-full pointer-events-none"></div>
      </div>
    </section>
  );
}