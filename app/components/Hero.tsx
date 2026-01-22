"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Globe, Calendar } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // FIX: Handle Time State to prevent Hydration Error
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial Setups
      gsap.set(".hero-nav-item", { y: -20, opacity: 0 });
      gsap.set(".hero-text-line", { y: 150, rotate: 5, opacity: 0 });
      gsap.set(".hero-sub-item", { y: 20, opacity: 0 });
      gsap.set(gridRef.current, { rotateX: 40, opacity: 0, y: 100, scale: 0.9 });
      gsap.set(badgeRef.current, { scale: 0, rotate: -180 });

      // 2. The Sequence
      tl.to(".hero-nav-item", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      })
        .to(
          ".hero-text-line",
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .to(
          ".hero-sub-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=1"
        )
        .to(
          gridRef.current,
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            ease: "expo.out",
          },
          "-=1"
        )
        .to(
          badgeRef.current,
          {
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1.2"
        );

      // 3. Interactive Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (!gridRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(gridRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          ease: "power2.out",
          duration: 1,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col pt-6 md:pt-8 px-4 md:px-8 overflow-hidden bg-brand-dark pb-20 md:pb-32 perspective-1000"
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center md:items-start mb-12 md:mb-16 z-50">
        <div className="flex flex-col hero-nav-item">
          <span className="font-display font-bold text-xl md:text-2xl tracking-tighter text-white">
            Layoutory.
          </span>
          <div className="text-[9px] md:text-[10px] text-gray-400 mt-1 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse shadow-[0_0_8px_#00ff41]"></span>
            Accepting Detailer Clients
          </div>
        </div>

        {/* TIME FIX APPLIED HERE */}
        <div className="hidden md:block text-xs font-mono text-gray-500 text-right hero-nav-item">
          LOCAL TIME <br /> {time}
        </div>

        <Link href="mailto:bhavyarathore575@gmail.com" className="hero-nav-item">
          <button className="group border border-white/20 px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <span className="hidden sm:inline">bhavyarathore575@gmail.com</span>
            <span className="sm:hidden">Email Me</span>
            <ArrowUpRight
              size={14}
              className="group-hover:rotate-45 transition-transform"
            />
          </button>
        </Link>
      </nav>

      {/* Main Hero Text */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mt-4">
        <div className="md:col-span-8 relative z-20 overflow-hidden">
          <h1
            ref={titleRef}
            className="font-display font-black text-[17vw] md:text-[14vw] lg:text-[12vw] leading-[0.8] tracking-tighter uppercase text-white text-center md:text-left"
          >
            <div className="overflow-hidden">
              <div className="hero-text-line block">Fully</div>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-700 hero-text-line block">Booked.</span>
            </div>
          </h1>
        </div>

        <div className="md:col-span-4 flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6 mt-10 md:mt-24 z-20 text-center md:text-left">
          <Globe
            className="w-6 h-6 md:w-8 md:h-8 text-white/80 hero-sub-item"
            strokeWidth={1}
          />
          <h2 className="font-display text-lg md:text-xl font-bold uppercase leading-tight text-white hero-sub-item">
            Automated Booking Systems for Mobile Car Detailers & Cafes
          </h2>
          <p className="text-xs text-gray-400 max-w-[280px] md:max-w-xs leading-relaxed hero-sub-item">
            Stop chasing clients. I build high-converting websites that automate
            your calendar, track revenue, and reduce no-shows so you can focus on detailing.
          </p>
          
          {/* --- NEW HERO CTA --- */}
          <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank" className="hero-sub-item mt-2">
            <button className="relative px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center gap-2">
                    Book Strategy Call <Calendar size={14} />
                </span>
                <div className="absolute inset-0 bg-brand-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
          </Link>

        </div>
      </div>

      {/* --- THE SKEWED WORK SHOWCASE --- */}
      <div className="relative w-full mt-20 md:mt-24 perspective-1000">
        {/* The Badge */}
        <div className="absolute left-1/2 -top-14 md:-top-24 -translate-x-1/2 z-30">
          <div
            ref={badgeRef}
            className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#111] border border-white/20 flex items-center justify-center relative shadow-2xl"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full absolute animate-spin-slow p-2"
            >
              <path
                id="curve"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text className="text-[12px] font-bold fill-white uppercase tracking-widest">
                <textPath href="#curve">
                  Auto Detailing Specialist • Cafe Design •
                </textPath>
              </text>
            </svg>
            <div className="text-2xl md:text-3xl font-bold text-white">D</div>
          </div>
        </div>

        {/* The Slanted Image Grid */}
        <div
          ref={gridRef}
          className="w-full h-[35vh] md:h-[60vh] overflow-hidden rounded-t-3xl border-t border-white/10 relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4 transform -skew-y-3 scale-110 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Image 1: Car Detailing Foam */}
            <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
            {/* Image 2: Cafe Interior */}
            <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mt-8 md:mt-12"></div>
            {/* Image 3: Car Polishing/Detailing */}
            <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
            {/* Image 4: Clean Car / Luxury */}
            <div className="h-40 md:h-64 bg-zinc-800 rounded-lg bg-[url('https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mt-8 md:mt-12"></div>
          </div>

          <div className="absolute bottom-0 w-full h-24 md:h-32 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
        </div>

        {/* Status Footer */}
        <div className="absolute bottom-0 w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0 text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 py-4 border-t border-white/5 bg-brand-dark z-20">
          <div className="flex items-center gap-2">
            Taking New Detailers{" "}
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full"></span>
          </div>
          <div className="hidden md:block">Automated Booking Setup</div>
          <div className="hidden md:block">Premium Dashboards Included</div>
          <div className="md:hidden flex gap-4">
            <span>Auto-Booking</span>
            <span>•</span>
            <span>Local SEO</span>
          </div>
        </div>
      </div>
    </section>
  );
}