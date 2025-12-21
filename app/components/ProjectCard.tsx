"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const projects = [
  {
    id: "beany-barista",
    title: "BEANY BARISTA",
    category: "BRANDING / WEB DESIGN",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
    link: "https://beanybarsita-demo.vercel.app/",
    size: "large",
  },
  {
    id: "notezen",
    title: "NOTEZEN APP",
    category: "WEB APP / SAAS",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop",
    link: "https://notezenn.vercel.app/",
    size: "small",
  },
  {
    id: "luxury-cafe",
    title: "LUXURY CAFE",
    category: "E-COMMERCE",
    img: "https://framerusercontent.com/images/E3D1ipROmSUYy4qPfW8Lftxig.jpg?scale-down-to=2048",
    link: "https://luxury-cafe-demo.vercel.app",
    size: "large",
  },
  {
    id: "barber-shop",
    title: "BARBER SHOP",
    category: "LOCAL BUSINESS",
    img: "https://framerusercontent.com/images/lh61MkFEnG13s0kkVrM6qETSdg.webp?scale-down-to=1024&width=1920&height=1280",
    link: "https://blssd-barber-shop.vercel.app/",
    size: "small",
  },
];

export default function FeaturedWorks() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Text Reveal Animation (Split effect)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".section-header-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      }).from(
        ".section-desc",
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 2. Parallax Image Scroll Effect
      // We grab all project cards and give them different speeds based on their size/column
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card: any, i) => {
        // "Large" cards move slower, "Small" cards move faster to create disjointed depth
        const speed = i % 2 === 0 ? 50 : 150;

        gsap.to(card, {
          y: -speed, // Move up as we scroll down
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom", // Start when card hits bottom of screen
            end: "bottom top", // End when card leaves top of screen
            scrub: true, // Tie animation strictly to scrollbar
          },
        });
      });

      // 3. Magnetic Image Distortion on Hover
      // This listener tilts the images when you hover over them
      const handleMouseMove = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const img = target.querySelector(".project-img") as HTMLElement;
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;

        gsap.to(img, {
          scale: 1.1, // Zoom in slightly
          x: x,
          y: y,
          rotationY: x, // Tilt X
          rotationX: -y, // Tilt Y
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const img = target.querySelector(".project-img") as HTMLElement;

        gsap.to(img, {
          scale: 1,
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      // Attach listeners
      const projectWrappers = document.querySelectorAll(".project-wrapper");
      projectWrappers.forEach((wrapper) => {
        wrapper.addEventListener("mousemove", handleMouseMove as any);
        wrapper.addEventListener("mouseleave", handleMouseLeave as any);
      });

      return () => {
        projectWrappers.forEach((wrapper) => {
          wrapper.removeEventListener("mousemove", handleMouseMove as any);
          wrapper.removeEventListener("mouseleave", handleMouseLeave as any);
        });
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* --- Section Header --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-24 relative z-20">
        <span className="section-header-item">//</span>
        <h2 className="section-header-item text-white font-bold tracking-widest text-lg md:text-xl">
          FEATURED WORKS
        </h2>
        <Link href="/work" passHref>
          <button className="section-header-item flex items-center gap-2 border border-white/10 rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300">
            See All Works
            <ArrowUpRight size={12} className="inline-block ml-2" />
          </button>
        </Link>
        <span className="section-header-item">//</span>
      </div>

      {/* --- Description Centered --- */}
      <div className="w-full flex justify-center mb-24 relative z-20 overflow-hidden">
        <p className="section-desc text-gray-400 text-xs md:text-sm font-mono text-center max-w-md leading-relaxed">
          A curated selection of projects that reflect our commitment{" "}
          <br className="hidden md:block" />
          to simplicity and purposeful design.
        </p>
      </div>

      {/* --- Projects Grid Layout --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-20 pb-20">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card group relative flex flex-col gap-6 ${
              project.size === "large" ? "lg:col-span-8" : "lg:col-span-4"
            } translate-y-[100px]`} // Initial translation for parallax to chew on
          >
            {/* Image Card Container */}
            <a
              href={project.link}
              target="_blank"
              className="project-wrapper block overflow-hidden rounded-[2rem] relative perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`w-full bg-[#111] overflow-hidden relative ${
                  project.size === "large"
                    ? "aspect-[16/10]"
                    : "aspect-[4/5] lg:aspect-square"
                }`}
              >
                {/* The Image Itself */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="project-img w-full h-full object-cover scale-100 will-change-transform"
                />

                {/* Overlay (Flash effect on hover) */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-100 pointer-events-none mix-blend-overlay"></div>
              </div>
            </a>

            {/* Project Info (Below Image) */}
            <div className="flex justify-between items-end px-2">
              <div>
                <h3 className="font-display font-black text-3xl md:text-4xl uppercase text-white tracking-tighter mb-2 translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
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
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110"
              >
                <ArrowUpRight
                  size={20}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}