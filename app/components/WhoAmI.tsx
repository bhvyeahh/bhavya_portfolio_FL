"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";

// Register ScrollTrigger (just in case it's not global yet)
gsap.registerPlugin(ScrollTrigger);

const skills = [
  "FULL STACK",
  "NEXT.JS 14",
  "REACT",
  "NODE.JS",
  "TAILWIND CSS",
  "DATABASE DESIGN",
];

// --- GSAP TypingText Component ---
const TypingText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className="typing-char inline-block translate-y-full opacity-0 will-change-transform"
          data-delay={delay} // We pass delay to read it in the main timeline
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
};

export default function WhoAmI() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when top of section hits 60% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // 1. Image "Cyber Scan" Reveal (The Mind-Blowing part)
      // We animate the bars *out* to reveal the image, or animate them *in* to construct it.
      // Let's animate the bars scaling Y to create a "digital reconstruction" vibe.
      tl.from(".slice-bar", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        stagger: {
          amount: 0.5,
          from: "random", // Randomizes the order for a glitch effect
        },
        ease: "power2.inOut",
      });

      // 2. Text Reveal (Reading the delay prop we set earlier doesn't work easily with batch selection)
      // So we just stagger them manually in groups for precise control.

      // Group 1: "INDIA, BASE"
      tl.to(
        ".typing-char",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)", // Nice pop effect
        },
        "-=0.4"
      );

      // 3. Skills Pills Cascade
      tl.from(
        ".skill-pill",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 4. Globe Spin In
      tl.from(
        ".globe-icon",
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.75)",
        },
        "-=0.8"
      );

      // 5. Parallax Effect on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;

        // Move Image Text slightly opposite to mouse
        gsap.to(".parallax-target", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });

        // Move Image bars slightly for depth
        gsap.to(".slice-bar", {
          x: -xPos * 0.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="
        relative w-full 
        min-h-screen 
        bg-[#050505] 
        pt-12 pb-8 
        px-6 md:px-12 lg:px-20
        overflow-hidden 
        flex flex-col justify-between 
        border-t border-white/5
      "
    >
      {/* --- TOP MARKERS --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 relative z-50">
        <span>//</span>
        <span className="text-white font-bold tracking-widest">WHO AM I</span>
        <span>//</span>
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative flex-grow w-full h-full flex flex-col lg:block">
        {/* LEFT TEXT BLOCK */}
        <div className="relative z-30 pt-2 md:pt-10 pointer-events-none parallax-target">
          {/* Location Typography */}
          <h2
            className="
              font-display font-black 
              text-[12vw] md:text-[13vw] 
              leading-[0.8] 
              uppercase text-white tracking-tighter
            "
          >
            <TypingText text="INDIA," delay={0.1} />
            <br />
            <TypingText text="BASE" delay={0.4} />
          </h2>

          {/* Skills Pills */}
          <div
            className="
              mt-6 md:mt-10 
              flex flex-wrap gap-2 md:gap-3 
              max-w-full md:max-w-lg 
              pointer-events-auto pr-4 md:pr-0
            "
          >
            {skills.map((skill, index) => (
              <span
                key={skill}
                className="
                  skill-pill
                  px-3 py-1.5 md:px-5 md:py-2 
                  rounded-full border border-white/30 
                  text-[9px] md:text-[11px] 
                  font-bold font-mono uppercase text-white 
                  bg-black/50 backdrop-blur-sm 
                  hover:bg-white hover:text-black 
                  transition-all duration-300 cursor-pointer hover:scale-105
                "
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Globe Icon */}
          <div className="globe-icon mt-6 md:mt-8 pointer-events-auto inline-block">
            <Globe
              className="w-8 h-8 md:w-12 md:h-12 text-white animate-spin-slow"
              strokeWidth={0.8}
            />
          </div>
        </div>

        {/* PORTRAIT IMAGE RESPONSIVE FIX */}
        <div
          className="
            absolute 
            top-[22%] md:top-[15%] lg:top-[-5%] 
            right-[-20%] md:right-[0%] 
            w-[130%] md:w-[80%] lg:w-[65%] 
            h-[50%] md:h-[80%] lg:h-[110%] 
            z-10 pointer-events-none 
            mix-blend-screen 
            opacity-40 md:opacity-100
          "
        >
          <div className="relative w-full h-full">
            <img
              src="/mypfp.jpg"
              alt="Profile"
              className="w-full h-full object-cover object-top opacity-90 grayscale contrast-125"
            />

            {/* Slice bars (The Glitch Overlay) */}
            <div className="absolute inset-0 w-full h-full flex justify-between">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="slice-bar h-full bg-[#050505]"
                  style={{
                    width: i % 2 === 0 ? "4%" : "2%",
                    opacity: i % 2 === 0 ? 0.7 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Gradients */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#050505] to-transparent"></div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM JOB TITLE / DESCRIPTION --- */}
      <div
        className="
          relative z-40 mt-auto pt-10 
          flex flex-col md:flex-row 
          items-start md:items-end 
          justify-between 
          gap-6 pointer-events-none
        "
      >
        <div className="parallax-target">
          <h2
            className="
              font-display font-black 
              text-[11vw] md:text-[10vw] 
              leading-[0.8] 
              uppercase text-white tracking-tighter 
              mix-blend-difference
            "
          >
            <TypingText text="WEB DEV/" delay={0.2} />
            <br />
            <TypingText text="CONSULTANT" delay={0.5} />
          </h2>
        </div>

        <div
          className="
            max-w-[260px] md:max-w-xs 
            text-right md:text-right 
            text-[10px] md:text-xs 
            text-gray-400 leading-relaxed 
            font-mono uppercase tracking-wide 
            mix-blend-difference self-end
            parallax-target
          "
        >
          {/* Note: Standard text fade in for long paragraph is better than typing effect */}
          <div className="typing-char opacity-0 translate-y-4">
            I specialize in solving business problems with code. From custom
            Next.js platforms to high-converting landing pages, I ensure your
            vision scales seamlessly online.
          </div>
        </div>
      </div>

      {/* GRID BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}