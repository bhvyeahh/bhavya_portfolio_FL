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
      "WORKING WITH PORTX WAS A GAME-CHANGER. THE DESIGN WAS BEAUTIFUL AND SUPER INTUITIVE.",
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

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] min-h-[300vh] border-t border-white/5"
    >
      {/* -------------------- STICKY TOP SECTION -------------------- */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-0">
        {/* Header */}
        <div className="absolute top-6 md:top-10 w-full px-6 md:px-12 lg:px-20 flex justify-between items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] z-20">
          <span>//</span>
          <span className="text-white font-bold tracking-widest">
            TESTIMONIALS
          </span>
          <span>//</span>
        </div>

        {/* Rotating Badge */}
        <motion.div
          style={{ rotate }}
          className="relative w-[220px] h-[220px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="curve"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="text-[4px] md:text-[6px] fill-[#ff3300] font-bold uppercase tracking-[0.2em]">
              <textPath href="#curve">
                Testimonials • Trusted By Clients • Testimonials • Trusted By
                Clients •
              </textPath>
            </text>
          </svg>

          <div className="absolute text-[#ff3300] text-[70px] md:text-[120px] lg:text-[180px] font-black leading-none mt-10">
            ”
          </div>
        </motion.div>

        {/* Subtext */}
        <p className="absolute bottom-10 md:bottom-20 text-gray-500 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-center px-6">
          Your satisfaction is my reputation.
          <br className="hidden md:block" /> See what clients say.
        </p>

        {/* Grid BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-[-1]"></div>
      </div>

      {/* -------------------- SCROLLING CARDS -------------------- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 -mt-[80vh]">
        {/* Spacer to reveal spinner first (reduced to avoid huge gap) */}
        <div className="h-[15vh] w-full"></div>

        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`flex w-full mb-20 md:mb-40 ${
              t.align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 80,
                x: t.align === "right" ? 40 : -40,
              }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[420px] md:max-w-[480px] bg-[#111] p-6 md:p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl group hover:border-white/20 transition-all duration-300"
            >
              <p className="font-display font-bold text-base md:text-lg lg:text-xl text-white uppercase leading-snug mb-8">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-gray-500 text-[8px] md:text-[10px] font-mono uppercase mt-1">
                    {t.title}
                  </p>
                </div>

                <div className="ml-auto opacity-40 group-hover:opacity-80 transition-all">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-10 10 5-10 5zm0 9l2-10 10 5-10 5z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* Small bottom buffer */}
        <div className="h-[8vh] w-full"></div>
      </div>
    </section>
  );
}
