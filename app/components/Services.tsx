"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowUpRight, Clock, Smartphone, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse Spotlight Logic (Local to this section)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = document.querySelectorAll(".glass-card-surface");
      
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Stagger Entrance
      tl.from(".booking-text", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      // 2. Card Reveal
      tl.from(cardRef.current, {
        x: 50,
        opacity: 0,
        rotateY: 15,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1.0");

      // 3. 3D Tilt Effect Logic
      const card = cardRef.current;
      if (card) {
        const handleCardMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calculate tilt
          const rotateX = ((y - centerY) / centerY) * -8; 
          const rotateY = ((x - centerX) / centerX) * 8;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleCardLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleCardMove);
        card.addEventListener("mouseleave", handleCardLeave);

        return () => {
          card.removeEventListener("mousemove", handleCardMove);
          card.removeEventListener("mouseleave", handleCardLeave);
        };
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-[#030303] text-white flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* --- LEFT: SALES COPY --- */}
        <div className="flex flex-col items-start">
          <div className="booking-text inline-flex items-center gap-3 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Limited Availability: Feb 2026</span>
          </div>
          
          <h2 className="booking-text font-sans font-medium text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
            <span className="block text-white">Stop Chasing.</span>
            <span className="block text-white/40 font-serif italic">Start Building.</span>
          </h2>
          
          <p className="booking-text text-white/50 text-base font-light leading-relaxed max-w-md mb-10">
            You handle the construction. We build the digital infrastructure that fills your calendar with high-value contracts while you sleep.
          </p>

          <div className="booking-text flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Primary Glass Button */}
            <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank" className="w-full sm:w-auto">
                <button className="glass-card-surface group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-[1.02]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Book Strategy Call <ArrowUpRight size={14} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </Link>

            <Link href="mailto:bhavyarathore575@gmail.com" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs text-white transition-colors flex items-center justify-center gap-2">
                    <Mail size={14} /> Email Direct
                </button>
            </Link>
          </div>
        </div>

        {/* --- RIGHT: 3D INTERACTIVE GLASS CARD --- */}
        <div className="flex justify-center lg:justify-end perspective-[1200px]">
          <div
            ref={cardRef}
            className="glass-card-surface relative w-full max-w-md aspect-[4/5] bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between shadow-2xl group cursor-default overflow-hidden"
          >
            {/* --- SPOTLIGHT BORDER EFFECT --- */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{ 
                   background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`,
                   maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                   maskClip: 'content-box, border-box',
                   maskComposite: 'exclude',
                   WebkitMaskComposite: 'xor'
                 }}>
            </div>

            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
            
            {/* Card Content Top */}
            <div className="flex justify-between items-start z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <Calendar size={20} className="text-white" />
                </div>
                <div className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Consultation</span>
                </div>
            </div>

            {/* Card Content Middle */}
            <div className="z-10 space-y-8">
                <div className="space-y-3">
                    <h3 className="text-3xl font-light text-white leading-tight">
                        Pipeline <br/> Architecture
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light border-l border-white/10 pl-4">
                        We analyze your current lead flow and demonstrate how our automated system creates qualified project inquiries.
                    </p>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {[
                        { icon: Clock, text: "System Audit (15 mins)" },
                        { icon: Smartphone, text: "Live Automation Demo" },
                        { icon: CheckCircle2, text: "Revenue Projection" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group/item">
                             <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-white group-hover/item:text-black transition-colors duration-300">
                                <item.icon size={10} />
                             </div>
                             <span className="text-xs text-white/60 uppercase tracking-wider">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card Content Bottom */}
            <div className="z-10 mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex -space-x-3">
                    {[1,2,3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border border-[#0a0a0a] bg-zinc-800 flex items-center justify-center text-[9px] text-white">
                           {i === 3 ? '+40' : ''}
                        </div>
                    ))}
                </div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    Systems Deployed
                </span>
            </div>

            {/* Inner Glow Gradient */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
}