"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight, Star, Zap, Clock } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // --- 1. TIME LOGIC ---
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. CUSTOM DOODLES ---
  const ScribbleUnderline = () => (
    <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6 text-blue-600" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );

  const MessyCircle = () => (
    <svg className="absolute -top-4 md:-top-6 -left-2 md:-left-4 w-[110%] md:w-[120%] h-[140%] md:h-[160%] text-red-500 pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M10,50 Q20,20 50,10 T90,50 T50,90 T10,50" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="8,4" />
    </svg>
  );

  useGSAP(() => {
    const tl = gsap.timeline();

    // Navbar Entrance
    tl.from(".nav-item", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });

    // Hero Text Entrance
    tl.from(".hero-word", {
      y: 100,
      opacity: 0,
      rotate: () => Math.random() * 15 - 7.5,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
    }, "-=0.5")
    .from(".sticker", {
      scale: 0,
      rotate: () => Math.random() * 40 - 20,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.2
    }, "-=0.5")
    .from(".cta-container", {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.5");

    // Interactive Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".parallax-bg", { x: x * 0.5, y: y * 0.5, duration: 1 });
      gsap.to(".parallax-fg", { x: -x, y: -y, duration: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col pt-4 md:pt-8 overflow-hidden text-ink"
    >
      {/* NOTE: No background grid div here anymore. 
          The texture is now on the body (globals.css), creating a seamless page look.
      */}

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 flex justify-between items-start px-4 md:px-12 w-full mb-8 md:mb-12">
        
        {/* Logo & Status */}
        <div className="flex flex-col nav-item">
          <span className="font-headline font-black text-2xl md:text-3xl tracking-tighter text-black uppercase">
            Layoutory.
          </span>
          <div className="text-[10px] md:text-xs font-mono text-gray-500 mt-1 flex items-center gap-2 uppercase tracking-wide border border-black/10 px-2 py-1 bg-white rotate-[-2deg] shadow-sm w-fit">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-green-700"></span>
            Accepting Clients
          </div>
        </div>

        {/* Time */}
        <div className="hidden md:flex flex-col items-end nav-item font-mono text-xs text-gray-500 rotate-1">
            <div className="flex items-center gap-1">
                LUDHIANA, IN <Clock size={12}/>
            </div>
             <span className="text-black font-bold text-lg">{time}</span>
        </div>

        {/* Email Button */}
        <div className="nav-item">
            <Link href="mailto:layoutoryy@gmail.com">
                <button className="group relative bg-white border-2 border-black px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-2 rotate-2">
                    <span className="hidden sm:inline">layoutoryy@gmail.com</span>
                    <span className="sm:hidden">Email Me</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform"/>
                </button>
            </Link>
        </div>
      </nav>

      {/* --- FLOATING STICKERS --- */}
      <div className="absolute top-[30%] left-[5%] sticker parallax-fg z-20 hidden md:block">
        <div className="font-hand text-gray-400 text-xl rotate-[-12deg] flex items-center gap-2">
          Speed matters! <Zap className="w-5 h-5 fill-yellow-400 text-black" />
        </div>
        <svg className="w-12 h-12 text-black mt-2 ml-4 rotate-90" viewBox="0 0 50 50">
           <path d="M10,0 Q20,25 40,40 M40,40 L25,35 M40,40 L35,20" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="absolute top-[25%] right-[8%] sticker parallax-bg z-10 hidden md:block">
        <div className="bg-white border-2 border-black px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-6">
          <span className="font-mono text-sm font-bold">CTR +40%</span>
        </div>
      </div>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 text-center max-w-[95vw] md:max-w-[95vw] mx-auto flex flex-col items-center flex-grow justify-center mt-[-20px] md:-mt-10 pb-20 md:pb-0">
        
        {/* Badge */}
        <div className="mb-4 md:mb-6 sticker parallax-fg">
           <div className="bg-white border-2 border-black rounded-full px-3 py-1 md:px-4 md:py-1.5 shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] rotate-[-2deg]">
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"/>
                Agency Mode: ON
              </span>
           </div>
        </div>

        {/* Headline */}
        <h1 className="flex flex-col items-center justify-center leading-[0.9] md:leading-[0.85] tracking-tighter uppercase w-full">
          
          {/* STOP */}
          <div className="hero-word relative z-20">
            <span className="text-[18vw] md:text-[11vw] font-black text-black drop-shadow-sm">
              STOP
            </span>
            <Star className="absolute -top-2 -left-4 md:-left-6 w-6 h-6 md:w-16 md:h-16 text-yellow-400 fill-yellow-400 animate-spin-slow border-black" />
          </div>
          
          {/* HAVING A */}
          <div className="hero-word flex flex-wrap justify-center gap-2 md:gap-4 items-center z-10 -mt-1 md:-mt-4 w-full">
            <span className="font-hand text-[6vw] md:text-[2.5vw] text-gray-500 lowercase rotate-[-4deg] mb-1 md:mb-0">
              having a
            </span>
            <span className="text-[18vw] md:text-[11vw] font-black text-black relative inline-block">
                BORING
                 {/* Tape/Strikethrough */}
                <div className="z-50 absolute top-1/2 left-[-2%] w-[104%] h-2 md:h-5 bg-red-500/90 -rotate-2 mix-blend-multiply"></div>
            </span>
          </div>

          {/* WEBSITE */}
          <div className="hero-word relative z-20 -mt-1 md:-mt-4">
            <div className="bg-yellow-400 px-2 md:px-8 transform -skew-x-6 inline-block border-2 border-transparent">
              <span className="text-[18vw] md:text-[11vw] font-black block transform skew-x-6 text-black">
                WEBSITE
              </span>
            </div>
            <ScribbleUnderline />
          </div>
        </h1>

        {/* Subtext */}
        <p className="mt-6 md:mt-12 max-w-[90%] md:max-w-xl font-hand text-lg md:text-2xl text-gray-700 leading-relaxed rotate-1 hero-word px-2 md:px-4">
          We kill generic templates and build <span className="relative inline-block text-blue-600 font-bold px-1 md:px-2 whitespace-nowrap">strategic chaos <MessyCircle/></span> that sells your vision.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 md:mt-14 flex flex-col md:flex-row items-center gap-4 md:gap-6 cta-container mb-12 md:mb-20">
          <Link href="/contact" className="group w-full md:w-auto px-6">
             <button className="w-full md:w-auto relative bg-pink-500 border-2 border-black px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 rounded-sm">
                Start The Chaos
                <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform" />
             </button>
          </Link>
          
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-gray-400">
             <span>( limited spots for March )</span>
          </div>
        </div>

      </div>

      {/* --- STATUS FOOTER --- */}
      <div className="absolute bottom-0 w-full flex flex-col md:flex-row justify-between items-center bg-white border-t-2 border-black py-2 md:py-3 px-4 md:px-12 z-40 gap-1 md:gap-0">
         <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-xs font-bold uppercase tracking-widest text-black">
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Taking New Clients
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline">Automated Booking Setup</span>
         </div>
         <div className="hidden md:block font-hand text-xs text-gray-500 rotate-[-1deg]">
            "Finally, a website that isn't boring."
         </div>
         <div className="md:hidden flex gap-3 text-[9px] font-bold uppercase text-gray-400">
            <span>Strategy</span> • <span>Design</span> • <span>Dev</span>
         </div>
      </div>
    </section>
  );
}