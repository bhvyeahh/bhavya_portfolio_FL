"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Check,
  X,
  Plus,
  Star,
  Zap,
  Calendar,
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
  INR: { symbol: "₹", label: "India (₹)", rate: 84 },
};

// --- DATA: FEATURES MASTER LIST ---
// (Ensures strict alignment across all cards - 12 Rows total)
const featureList = [
  "Mobile-First Design (Ads Ready)",
  "Click-to-Call & SMS Buttons",
  "Services & Pricing Menu",
  "Google Maps Integration",
  "Contact Form & Lead Email",
  "Portfolio/Gallery Section",
  "Automated Booking System",
  "Accept Deposits (Stripe/Square)",
  "Google Reviews Sync",
  "Advanced Quote Calculator",
  "SEO 'Detailing near me'",
  "Admin Revenue Dashboard",
];

// --- DATA: MAIN PLANS ---
const plans = [
  {
    name: "STARTER WASH",
    basePriceUSD: 299,
    desc: "Perfect for new detailers. A professional 2-page site to replace your Linktree.",
    delivery: "3-5 days",
    revisions: "2 Rounds",
    pages: "2 Pages (Home + Services)",
    // Indices from featureList to include
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

// --- DATA: ADD-ONS (A La Carte) ---
const addOns = [
  {
    name: "Extra Page",
    basePrice: 100,
    desc: "Per additional page (About, FAQ, etc).",
  },
  {
    name: "Extra Revision Round",
    basePrice: 50,
    desc: "Per round of design changes.",
  },
  {
    name: "Urgent Delivery",
    basePrice: 300,
    desc: "Jump the queue (48hr turnaround).",
  },
  {
    name: "Professional Copywriting",
    basePrice: 150,
    desc: "We write sales-focused text for you.",
  },
];

// --- DATA: MONTHLY SERVICES ---
const monthlyServices = [
  {
    name: "Basic Maintenance",
    basePrice: 20,
    icon: <Zap className="text-amber-400" />,
    features: ["Hosting Included", "Security Patches", "Monthly Backups"],
  },
  {
    name: "Growth Partner",
    basePrice: 150,
    icon: <Calendar className="text-amber-400" />,
    features: [
      "2 SEO Blog Posts / mo",
      "Seasonal Banner Updates",
      "Priority Support",
    ],
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

  // --- PRICING LOGIC ---
  // Calculates main plan prices (ending in 99 or 00)
  const calculatePrice = (baseUSD: number) => {
    if (currency === "USD") return baseUSD;

    const rate = currencies[currency].rate;
    const rawPrice = baseUSD * rate;

    // If INR: Round to nearest 100 (e.g. 24800)
    if (currency === "INR") {
        return Math.ceil(rawPrice / 100) * 100;
    }

    // For EUR/GBP: Round to nearest 50, then subtract 1 (e.g. 649)
    return Math.ceil(rawPrice / 50) * 50 - 1;
  };

  // Calculates Add-on prices (simpler rounding)
  const getAddonPrice = (base: number) => {
    const rate = currencies[currency].rate;
    if (currency === "INR") return Math.ceil((base * rate) / 100) * 100;
    return Math.ceil(base * rate);
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

      // Add-ons Entrance
      gsap.from(".interactive-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".addons-section", start: "top 85%" },
      });

      // Mouse Spotlight Logic
      const cards = document.querySelectorAll(".pricing-card, .interactive-card");
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
      href="/"
      className="ml-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 uppercase tracking-widest"
    >
      Home
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
            pricing-grid max-w-7xl mx-auto relative group/grid mb-24
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
                <div className="mb-6 h-[140px] flex flex-col justify-start">
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
                    <Link href="https://calendly.com/" target="_blank">
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
        <div className="min-w-[4vw] md:hidden"></div>
      </div>

      {/* --- EXTRA SERVICES SECTION (ADD-ONS) --- */}
      <div className="addons-section max-w-7xl mx-auto relative z-20 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: A LA CARTE EXTRAS */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="text-brand-green" /> Additional Services
            </h3>
            <div className="flex flex-col gap-4">
              {addOns.map((addon, i) => (
                <div
                  key={i}
                  className="interactive-card group relative bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex justify-between items-center overflow-hidden hover:border-brand-green/30 transition-colors"
                >
                  <div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <h4 className="text-white font-medium text-sm">
                      {addon.name}
                    </h4>
                    <p className="text-white/40 text-[10px]">{addon.desc}</p>
                  </div>
                  <div className="text-right relative z-10">
                    <span className="text-brand-green font-bold font-mono block price-value">
                      +{currencies[currency].symbol}
                      {getAddonPrice(addon.basePrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: MONTHLY RETAINERS */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="text-brand-green" /> Monthly Care Plans
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {monthlyServices.map((service, i) => (
                <div
                  key={i}
                  className="interactive-card relative bg-[#0a0a0a] border border-white/5 p-6 rounded-xl flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors"
                >
                  <div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.05), transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-white/10">
                      {service.icon}
                    </div>
                    <h4 className="text-white font-bold text-sm mb-2">
                      {service.name}
                    </h4>
                    <ul className="text-[10px] text-white/50 space-y-1 mb-4">
                      {service.features.map((f, idx) => (
                        <li key={idx}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-white/5 pt-4 relative z-10">
                    <span className="text-white font-bold font-mono text-lg price-value">
                      {currencies[currency].symbol}
                      {getAddonPrice(service.basePrice).toLocaleString()}
                    </span>
                    <span className="text-white/30 text-[10px] ml-1">
                      /month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl text-center">
              <p className="text-brand-green text-xs">
                <span className="font-bold">✨ Pro Tip:</span> Buy the{" "}
                <span className="text-white font-bold">EMPIRE</span> package
                and get 1 month of Maintenance for FREE!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}