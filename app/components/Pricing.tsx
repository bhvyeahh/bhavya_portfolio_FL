"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, FileText, ArrowUpRight, Crown, Zap, Shield } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: FEATURES MASTER LIST ---
// (Tailored for High-Ticket Construction/Contractors)
const featureList = [
  "Mobile-First & Speed Optimized",
  "Lead Qualification Form", // Replaced Booking
  "Click-to-Call & SMS Buttons",
  "Google Maps & Local SEO Setup",
  "Project Gallery Showcase", // Crucial for contractors
  "Trust Signals & Badges", // Trust is key for high ticket
  "Testimonial/Review Section",
  "Services & Pricing Menu",
  "Contact Form to Email",
  "Admin Revenue Dashboard",
  "CRM Integration Ready",
  "Priority Support",
];

// --- DATA: PLANS ---
const plans = [
  {
    name: "ESSENTIAL BUILD",
    price: 899,
    desc: "Perfect for independent contractors. A professional digital presence to build trust and capture leads.",
    delivery: "5-7 days",
    revisions: "2 Rounds",
    pages: "Up to 3 Pages",
    // 0-based indices from featureList
    includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8], 
    highlight: false,
    icon: Shield
  },
  {
    name: "GROWTH ",
    price: 1199,
    desc: "The standard for growing firms. Enhanced portfolio showcases and SEO structure to dominate local search.",
    delivery: "10-14 days",
    revisions: "Unlimited",
    pages: "Up to 6 Pages",
    includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    highlight: true, // Popular
    icon: Zap
  },
  {
    name: "EMPIRE SCALE",
    price: 1499,
    desc: "Complete digital dominance. Full-scale site with advanced integrations and priority handling.",
    delivery: "2-3 Weeks",
    revisions: "Unlimited",
    pages: "Up to 10 Pages",
    includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All included
    highlight: false,
    icon: Crown
  },
];

type Particle = {
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
};

export default function Pricing() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedParticles = [...Array(35)].map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      animationDuration: `${Math.random() * 15 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.1,
    }));
    setParticles(generatedParticles);
  }, []);

  // --- GSAP ANIMATIONS ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      
      // Desktop: Staggered Entrance
      mm.add("(min-width: 768px)", () => {
        gsap.from(".pricing-card", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" },
        });
      });

      // Mobile: Slide Entrance
      mm.add("(max-width: 767px)", () => {
        gsap.from(".pricing-card", {
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: ".pricing-grid", start: "top 85%" },
        });
      });

      // Mouse Spotlight Logic
      const cards = document.querySelectorAll(".pricing-card");
      const handleMouseMove = (e: MouseEvent) => {
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
          (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        });
      };

      if (cardsRef.current) {
        cardsRef.current.addEventListener("mousemove", handleMouseMove);
      }
      return () => {
        if (cardsRef.current) {
          cardsRef.current.removeEventListener("mousemove", handleMouseMove);
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] py-20 md:py-32 border-t border-white/5 overflow-hidden font-sans"
    >
      {/* 1. Background Particles & Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
          animation: floatUp linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row justify-between items-start md:items-end text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0 relative z-20">
        <div className="max-w-xl">
           <div className="flex items-center gap-3 mb-4">
             <span className="text-cyan-400">//</span>
             <span className="text-white font-bold tracking-widest">
               INVESTMENT PLANS
             </span>
             <span className="text-cyan-400">//</span>
           </div>
           <h2 className="text-3xl md:text-5xl font-sans font-medium text-white tracking-tight leading-none mb-4">
              Transparent Pricing. <br/> <span className="text-white/40">High-ROI Systems.</span>
           </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-30">
           <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank">
             <button className="px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2">
                Book Strategy Call <ArrowUpRight size={14}/>
             </button>
           </Link>
        </div>
      </div>

      {/* --- MAIN PRICING GRID --- */}
      <div
        ref={cardsRef}
        className="
            pricing-grid max-w-7xl mx-auto relative group/grid
            /* Mobile: Horizontal Snap Scroll */
            flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-12 scrollbar-hide
            /* Desktop: Strict Grid */
            md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-10 md:pb-0 md:px-12 lg:px-20 md:overflow-visible
            items-start
        "
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="
                pricing-card 
                relative z-10 flex flex-col h-full
                p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] 
                overflow-hidden transition-transform duration-500 hover:-translate-y-2
                min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center
            "
          >
              {/* Highlight Border for Popular Plan */}
              {plan.highlight && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0"></div>
              )}

              {/* Spotlights */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100"
                style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)` }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 40%)`, // Cyan glow
                  maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                  maskClip: "content-box, border-box",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              <div className="relative z-20 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                       <plan.icon size={16} className={plan.highlight ? "text-cyan-400" : "text-white/40"} />
                       {plan.name}
                    </h3>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-wider">One-Time Investment</p>
                  </div>
                  {plan.highlight && (
                    <span className="bg-cyan-950/50 border border-cyan-400/30 text-cyan-400 px-2 py-1 rounded text-[9px] font-bold">MOST POPULAR</span>
                  )}
                </div>

                {/* Price & Specs */}
                <div className="mb-6">
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter price-value">
                    <span className="text-gray-500 text-3xl align-top mr-1">$</span>
                    {plan.price}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 text-[9px] font-mono text-gray-400 uppercase">
                    <span className="border border-white/10 px-2 py-1 rounded bg-white/5">{plan.delivery}</span>
                    <span className="border border-white/10 px-2 py-1 rounded bg-white/5">{plan.revisions}</span>
                    <span className={`border px-2 py-1 rounded flex items-center gap-1 font-bold ${plan.highlight ? "border-cyan-400/30 text-cyan-400 bg-cyan-950/20" : "border-white/10 bg-white/5"}`}>
                        <FileText size={10} /> {plan.pages}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-8 min-h-[40px]">{plan.desc}</p>

                {/* Features - Unified List */}
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {featureList.map((featureText, idx) => {
                    const isIncluded = plan.includedFeatures.includes(idx);
                    return (
                        <li key={idx} className={`text-xs flex items-center gap-3 ${isIncluded ? "text-white" : "text-white/20"}`}>
                            {isIncluded ? <Check size={14} className="text-cyan-400 min-w-[14px]" /> : <X size={14} className="min-w-[14px]" />} 
                            <span className={isIncluded ? "" : "line-through decoration-white/20"}>{featureText}</span>
                        </li>
                    );
                  })}
                </ul>
                
                {/* CTA */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank">
                        <button className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                            plan.highlight 
                            ? "bg-white text-black hover:bg-gray-200 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "bg-white/5 text-white hover:bg-white hover:text-black border-white/10"
                        }`}>
                            Choose Plan
                        </button>
                    </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}