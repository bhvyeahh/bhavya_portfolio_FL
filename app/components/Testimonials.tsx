"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "CLEAN UI, SMOOTH INTERACTIONS, AND THOUGHTFUL DETAILS, IT'S EXACTLY WHAT WE NEEDED.",
    name: "Thiago Alcatara",
    title: "MARKETING MANAGEMENT, ABC JSC",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    align: "right",
  },
  {
    id: 2,
    quote:
      "WORKING WITH BHAVYA WAS A GAME-CHANGER. THE DESIGN WAS BEAUTIFUL AND SUPER INTUITIVE.",
    name: "Bobby Clarkson",
    title: "CEO FOUNDER, AGENCIFY",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    align: "left",
  },
  {
    id: 3,
    quote: "10 POINTS!!! NOTHING TO SAY. BEST DESIGNER WITH ME.",
    name: "Nathan Drake",
    title: "DESIGN LEAD, BRUNO",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    align: "right",
  },
  {
    id: 4,
    quote:
      "BIGGER, BOLDER & BETTER. HE TURNED OUR VAGUE IDEAS INTO A PIXEL-PERFECT PRODUCT.",
    name: "Lukas Franklin",
    title: "HEAD OF PRODUCT, AIXOR",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    align: "left",
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] border-t border-white/5"
    >
      {/* -------------------- STICKY BACKGROUND -------------------- */}
      <div className="sticky top-0 w-full h-[60vh] md:h-[100vh] flex flex-col items-center justify-center overflow-hidden z-0">
        
        {/* Header */}
        <div className="absolute top-4 md:top-10 w-full px-6 flex justify-between items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] z-20">
          <span>//</span>
          <span className="text-white font-bold tracking-widest">
            TESTIMONIALS
          </span>
          <span>//</span>
        </div>

        {/* Rotating Badge */}
        <motion.div
          style={{ rotate }}
          className="relative w-[160px] h-[160px] md:w-[350px] md:h-[350px] flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
            <path
              id="curve"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="text-[5px] md:text-[6px] fill-[#ff3300] font-bold uppercase tracking-[0.15em]">
              <textPath href="#curve">
                Testimonials • Trusted By Clients • Testimonials • Trusted By Clients •
              </textPath>
            </text>
          </svg>

          <div className="absolute text-[#ff3300] text-[50px] md:text-[120px] font-black leading-none mt-4 md:mt-10">
            ”
          </div>
        </motion.div>

        {/* Subtext */}
        <p className="absolute bottom-10 md:bottom-20 text-gray-500 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-center px-6">
          Your satisfaction is my reputation.
        </p>

        {/* Grid BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-[-1]"></div>
      </div>

      {/* -------------------- SCROLLING CONTENT -------------------- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-12 lg:px-20 -mt-[30vh] md:-mt-[40vh] pb-32">
        
        {/* Smaller initial spacer to reduce gap at start */}
        <div className="h-[5vh] md:h-[10vh] w-full"></div>

        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`flex w-full mb-8 md:mb-32 ${
              t.align === "right" ? "md:justify-end justify-center" : "md:justify-start justify-center"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-[320px] md:max-w-[480px] bg-[#0c0c0c]/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:border-white/30 transition-colors duration-300"
            >
              <p className="font-display font-bold text-xs md:text-xl text-white uppercase leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-[10px] md:text-sm uppercase tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-gray-500 text-[8px] md:text-[10px] font-mono uppercase">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}