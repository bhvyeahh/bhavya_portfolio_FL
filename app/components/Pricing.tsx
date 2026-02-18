"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: CURRENCIES & RATES ---
const currencies = {
  USD: { symbol: "$", label: "USD ($)", rate: 1 },
  EUR: { symbol: "€", label: "EUR (€)", rate: 0.92 },
  GBP: { symbol: "£", label: "GBP (£)", rate: 0.78 },
  INR: { symbol: "₹", label: "India (₹)", rate: 45 },
};

// --- DATA: FEATURES MASTER LIST ---
// (Ensures strict alignment across all cards)
const featureList = [
  "Mobile-First Design (Ads Ready)",
  "Click-to-Call & SMS Buttons",
  "Services & Pricing Menu",
  "Google Maps Integration",
  "Contact Form & Lead Email",
  "Portfolio/Gallery Section",
  "Automated Booking System",
  "Accept Deposits (Stripe/Square)",
  "Advanced Quote Calculator",
  "Google Reviews Sync",
  "SEO 'Detailing near me'",
  "Admin Revenue Dashboard",
];

// --- DATA: PLANS ---
const plans = [
  {
    name: "STARTER WASH",
    basePriceUSD: 299,
    desc: "Perfect for new detailers. A professional 2-page site to replace your Linktree.",
    delivery: "3-5 days",
    revisions: "2 Rounds",
    pages: "2 Pages (Home + Services)",
    // 0-based indices from featureList
    includedFeatures: [0, 1, 2, 3, 4, 5], 
  },
  {
    name: "PRO DETAILER",
    basePriceUSD: 699,
    desc: "The growth engine. Automate bookings, take deposits, and stop no-shows.",
    delivery: "7-10 days",
    revisions: "3 Rounds",
    pages: "Up to 6 Pages",
    includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    name: "EMPIRE",
    basePriceUSD: 1199,
    desc: "Dominance package. Custom dashboards, SEO ranking, and full automation.",
    delivery: "2-3 Weeks",
    revisions: "Unlimited",
    pages: "Up to 12 Pages",
    includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All included
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
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "INR">("USD");
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const containerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isGlobal = currency !== "INR";

  // --- PRICING LOGIC (Restored) ---
  const calculatePrice = (baseUSD: number) => {
    if (currency === "USD") return baseUSD;

    const rate = currencies[currency].rate;
    const rawPrice = baseUSD * rate;

    // Logic: Round to nearest nice number ending in 49/99 or 00
    // If INR: Round to nearest 100 (e.g. 24800)
    if (currency === "INR") {
        return Math.ceil(rawPrice / 100) * 100;
    }

    // For EUR/GBP: Round to nearest 50, then subtract 1 to get "49" or "99"
    // Example: 643 -> 650 -> 649
    return Math.ceil(rawPrice / 50) * 50 - 1;
  };

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
          const rect = card.getBoundingClientRect();
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

  // Price Change Animation (Blur Swap)
  useGSAP(
    () => {
      gsap.fromTo(
        ".price-value",
        { filter: "blur(10px)", opacity: 0.5 },
        { filter: "blur(0px)", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    { dependencies: [currency], scope: containerRef }
  );

  // Dropdown Toggle Animation
  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(dropdownRef.current, {
          autoAlpha: 1,
          y: 0,
          display: "block",
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(dropdownRef.current, {
          autoAlpha: 0,
          y: 10,
          display: "none",
          duration: 0.2,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
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
      <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0 relative z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-brand-green">//</span>
          <span className="text-white font-bold tracking-widest">
            INVESTMENT PLANS
          </span>
          <span className="text-brand-green">//</span>
          {/* --- PASTE THIS CODE HERE --- */}
    <Link
      href="/pricing"
      className="ml-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 uppercase tracking-widest"
    >
      click here for pricing page
    </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-30 w-full md:w-auto">
          <div className="flex bg-[#111] px-2 py-1.5 rounded-full border border-white/10 shadow-xl items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <div className="relative w-full md:w-auto">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full md:w-auto px-5 py-2 rounded-full text-[10px] font-bold uppercase 
                    flex items-center justify-between md:justify-center gap-2 transition-all duration-300
                    ${isGlobal ? "bg-white text-black" : "text-gray-400 hover:text-white"}
                `}
              >
                {isGlobal ? currencies[currency].label : "Global"}
                <ChevronDown size={12} className={`${isOpen ? "rotate-180" : ""} transition-transform`} />
              </button>

              {/* Dropdown Menu */}
              <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 invisible opacity-0 origin-top">
                {(["USD", "EUR", "GBP"] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => { setCurrency(curr); setIsOpen(false); }}
                    className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white hover:text-black block"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* India Button */}
            <button
              onClick={() => { setCurrency("INR"); setIsOpen(false); }}
              className={`
                  px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 whitespace-nowrap
                  ${currency === "INR" ? "bg-brand-green text-black" : "text-gray-400 hover:text-white"}
              `}
            >
              India (₹)
            </button>
          </div>
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
            items-start /* Ensures alignment at top */
        "
      >
        {plans.map((plan) => {
          const finalPrice = calculatePrice(plan.basePriceUSD);

          return (
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
              {/* Highlight Border for Pro/Empire */}
              {plan.name !== "STARTER WASH" && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green/0 via-brand-green/50 to-brand-green/0"></div>
              )}

              {/* Spotlights */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100"
                style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15), transparent 40%)` }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 158, 11, 0.4), transparent 40%)`,
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
                    <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-wider">One-Time Pay</p>
                  </div>
                  {plan.name === "PRO DETAILER" && (
                    <span className="bg-white text-black px-2 py-1 rounded text-[9px] font-bold">POPULAR</span>
                  )}
                </div>

                {/* Price & Specs */}
                <div className="mb-6">
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter price-value">
                    <span className="text-gray-500 text-3xl align-top mr-1">{currencies[currency].symbol}</span>
                    {finalPrice.toLocaleString()}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 text-[9px] font-mono text-gray-400 uppercase">
                    <span className="border border-white/10 px-2 py-1 rounded bg-white/5">{plan.delivery}</span>
                    <span className="border border-white/10 px-2 py-1 rounded bg-white/5">{plan.revisions}</span>
                    <span className="border border-brand-green/20 text-brand-green px-2 py-1 rounded bg-brand-green/5 flex items-center gap-1">
                        <FileText size={10} /> {plan.pages}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-8 min-h-[40px]">{plan.desc}</p>

                {/* Features - Unified List for Perfect Alignment */}
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {featureList.map((featureText, idx) => {
                    const isIncluded = plan.includedFeatures.includes(idx);
                    return (
                        <li key={idx} className={`text-xs flex items-center gap-3 ${isIncluded ? "text-white" : "text-white/20"}`}>
                            {isIncluded ? <Check size={14} className="text-brand-green min-w-[14px]" /> : <X size={14} className="min-w-[14px]" />} 
                            <span className={isIncluded ? "" : "line-through decoration-white/20"}>{featureText}</span>
                        </li>
                    );
                  })}
                </ul>
                
                {/* CTA */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank">
                        <button className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                            plan.name === "PRO DETAILER" 
                            ? "bg-white text-black hover:bg-gray-200 border-transparent"
                            : "bg-white/5 text-white hover:bg-white hover:text-black border-white/10"
                        }`}>
                            Get Started
                        </button>
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
        {/* Mobile Spacer */}
        
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}