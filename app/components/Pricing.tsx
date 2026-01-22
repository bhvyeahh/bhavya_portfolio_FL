"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Check, X, ArrowRight, Sparkles, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const plans = [
  {
    name: "BASIC",
    prices: {
      USD: 1000,
      EUR: 850,
      GBP: 750,
      INR: 20000,
    },
    desc: "A professional static presence to get your business online.",
    delivery: "5-7 days delivery",
    revisions: "2 Rounds of Revisions",
    pages: "Single Page / Landing",
    features: [
      { text: "Mobile Responsive Design", included: true },
      { text: "Social Media Integration", included: true },
      { text: "Google Maps & Business Setup", included: true },
      { text: "Functional Static Website", included: true },
      { text: "CMS (Edit text & images yourself)", included: false },
      { text: "Contact Forms & Lead Database", included: false },
      { text: "Basic SEO Optimization", included: false },
      { text: "Premium Animations", included: false },
      { text: "E-commerce & Online Payments", included: false },
      { text: "30 Days Priority Support", included: false },
    ],
  },
  {
    name: "STANDARD",
    prices: {
      USD: 1850,
      EUR: 1575,
      GBP: 1385,
      INR: 40000,
    },
    desc: "Dynamic site with a CMS for businesses that update content often.",
    delivery: "10-14 days delivery",
    revisions: "3 Rounds of Revisions",
    pages: "Up to 7 Pages",
    features: [
      { text: "Mobile Responsive Design", included: true },
      { text: "Social Media Integration", included: true },
      { text: "Google Maps & Business Setup", included: true },
      { text: "Functional Dynamic Website", included: true },
      { text: "CMS (Edit text & images yourself)", included: true },
      { text: "Contact Forms & Lead Database", included: true },
      { text: "Basic SEO Optimization", included: true },
      { text: "Premium Animations", included: false },
      { text: "E-commerce & Online Payments", included: false },
      { text: "30 Days Priority Support", included: false },
    ],
  },
  {
    name: "PREMIUM",
    prices: {
      USD: 3000,
      EUR: 2550,
      GBP: 2250,
      INR: 70000,
    },
    desc: "Full-scale E-commerce solution with payments and advanced logic.",
    delivery: "3-4 Weeks delivery",
    revisions: "5 Rounds of Revisions",
    pages: "Up to 15 Pages",
    features: [
      { text: "Mobile Responsive Design", included: true },
      { text: "Social Media Integration", included: true },
      { text: "Google Maps & Business Setup", included: true },
      { text: "Functional Dynamic Website", included: true },
      { text: "CMS (Edit text & images yourself)", included: true },
      { text: "Contact Forms & Lead Database", included: true },
      { text: "Basic SEO Optimization", included: true },
      { text: "Premium Animations", included: true },
      { text: "E-commerce & Online Payments", included: true },
      { text: "30 Days Priority Support", included: true },
    ],
  },
];

const currencies = {
  USD: { symbol: "$", label: "USD ($)" },
  EUR: { symbol: "€", label: "EUR (€)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  INR: { symbol: "₹", label: "India (₹)" },
};

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
  const DISCOUNT_PERCENTAGE = 0.10;

  useEffect(() => {
    // Generate particles only on client-side to prevent hydration mismatches
    const generatedParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(generatedParticles);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".price-value",
        { filter: "blur(10px)", opacity: 0, y: 20, scale: 0.9 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    },
    { dependencies: [currency], scope: containerRef }
  );

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(dropdownRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(dropdownRef.current, {
          autoAlpha: 0,
          y: 10,
          scale: 0.95,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen] }
  );

  useGSAP(
    () => {
      // Desktop Entrance Animation
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        gsap.from(".pricing-card", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
      });

      // Mobile Entrance (Simpler fade in)
      mm.add("(max-width: 767px)", () => {
        gsap.from(".pricing-card", {
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
      });

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

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] py-20 md:py-32 border-t border-white/5 overflow-hidden font-sans"
    >
      {/* 1. Background Particles (CSS Animations via style tag to allow keyframes without jsx error) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          20% { opacity: 1; transform: translateY(80vh) scale(1); }
          100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
        }
        .particle {
          position: absolute;
          bottom: -20px;
          background: radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          animation: floatUp linear infinite;
        }
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

      {/* 2. Theme Banner */}
      <div className="relative z-20 mb-10 w-full max-w-4xl mx-auto px-6">
        <div className="w-full bg-gradient-to-r from-amber-900/40 via-amber-600/20 to-amber-900/40 border border-amber-500/30 rounded-xl p-4 text-center backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          
          <p className="text-amber-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
            2026 KICKOFF OFFER
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex justify-center items-center gap-4">
            <Sparkles className="text-amber-400 w-6 h-6" />
            <span className="tracking-tighter">NEW YEAR SPECIAL</span>
            <Sparkles className="text-amber-400 w-6 h-6" />
          </h2>
          <p className="text-white/60 text-xs mt-2 font-mono uppercase">
            Start 2026 Strong • 10% Off All Packages
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-8 md:mb-16 gap-6 md:gap-0 relative z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-amber-500">//</span>
          <span className="text-white font-bold tracking-widest">
            PRICING & PACKAGES
          </span>
          <span className="text-amber-500">//</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-30 w-full md:w-auto">
          <a
            href="/pricing"
            className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
          >
            View Full Page
            <span className="bg-white/10 p-1 rounded-full text-white/50 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
              <ArrowRight size={10} />
            </span>
          </a>

          <div className="flex bg-[#111] px-2 py-1.5 rounded-full border border-white/10 shadow-xl items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full md:w-auto px-5 py-2 rounded-full text-[10px] font-bold uppercase 
                    flex items-center justify-between md:justify-center gap-2 transition-all duration-300
                    ${
                      isGlobal
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-white"
                    }
                `}
              >
                {isGlobal ? currencies[currency].label : "Global"}
                <ChevronDown
                  size={12}
                  className={`${
                    isOpen ? "rotate-180" : ""
                  } transition-transform duration-300`}
                />
              </button>

              <div
                ref={dropdownRef}
                className="absolute top-full left-0 mt-2 w-full md:w-40 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 invisible opacity-0 origin-top"
              >
                {(["USD", "EUR", "GBP"] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white hover:text-black flex justify-between transition-colors duration-200"
                  >
                    {curr}
                    {currency === curr && <Check size={10} />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setCurrency("INR");
                setIsOpen(false);
              }}
              className={`
                px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 whitespace-nowrap
                ${
                  currency === "INR"
                    ? "bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                    : "text-gray-400 hover:text-white"
                }
                `}
            >
              India (₹)
            </button>
          </div>
        </div>
      </div>

      {/* --- PRICING CARDS SCROLLER ---
        Mobile: Flex + Overflow-x-auto + Snap
        Desktop: Grid
      */}
      <div
        ref={cardsRef}
        className="
          max-w-7xl mx-auto 
          relative group/grid
          
          /* MOBILE: Horizontal Scroll */
          flex flex-nowrap overflow-x-auto snap-x snap-mandatory 
          gap-4 px-6 pb-12
          
          /* SCROLLBAR HIDING (Tailwind Arbitrary Syntax) */
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]

          /* DESKTOP: Grid Layout */
          md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-12 md:px-12 lg:px-20 md:overflow-visible md:pb-0
        "
      >
        {plans.map((plan) => {
          const originalPrice = plan.prices[currency as keyof typeof plan.prices];
          const rawDiscount = originalPrice * (1 - DISCOUNT_PERCENTAGE);
          const discountedPrice = Math.ceil(rawDiscount / 50) * 50;

          return (
            <div
              key={plan.name}
              className="
                pricing-card 
                flex flex-col h-full relative z-10 
                p-6 md:p-8 
                rounded-3xl border border-white/5 bg-[#0a0a0a] 
                overflow-hidden transition-transform duration-500 hover:-translate-y-2
                
                /* MOBILE SIZE: 85% width so next card peeks out */
                min-w-[85vw] sm:min-w-[60vw] md:min-w-0
                snap-center
              "
            >
              {/* SPOTLIGHTS (Subtle on mobile, stronger on hover/desktop) */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, 0.15), transparent 40%)`,
                }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, 0.4), transparent 40%)`,
                  maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
                  maskClip: "content-box, border-box",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              {/* Top Label */}
              <div className="relative z-20 flex justify-between items-start text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-6 border-b border-white/5 pb-6">
                <div>
                  <span className="text-white font-bold text-base md:text-lg">
                    {plan.name}
                  </span>
                  <p className="text-[9px] mt-1 text-amber-500 flex items-center gap-1">
                    ✨ ONE-TIME PAYMENT
                  </p>
                </div>
                <span className="bg-amber-600 text-white px-2 py-1 rounded text-[9px] font-bold animate-pulse">
                  -10% OFF
                </span>
              </div>

              {/* Price Area */}
              <div className="relative z-20 mb-6 min-h-[140px] sm:min-h-[150px] md:min-h-[170px]">
                <div className="text-white/40 text-lg font-mono line-through mb-1 decoration-amber-500/50">
                  {currencies[currency].symbol}
                  {originalPrice.toLocaleString()}
                </div>

                <h3 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter price-value will-change-transform">
                  <span className="text-amber-500 text-3xl md:text-5xl align-top mr-1">
                    {currencies[currency].symbol}
                  </span>
                  {discountedPrice.toLocaleString()}
                </h3>

                <div className="flex flex-wrap gap-2 mt-6 text-[9px] font-mono text-amber-400 uppercase tracking-wide">
                  <span className="border border-amber-900/50 px-2 py-1 rounded bg-amber-900/10">
                    {plan.delivery}
                  </span>
                  <span className="border border-amber-900/50 px-2 py-1 rounded bg-amber-900/10">
                    {plan.revisions}
                  </span>
                  <span className="border border-amber-500/40 px-2 py-1 rounded bg-amber-500/10 text-white font-bold flex items-center gap-1">
                    <FileText size={10} className="text-amber-500" />
                    {plan.pages}
                  </span>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mt-6">
                  {plan.desc}
                </p>
              </div>

              {/* Features List */}
              <ul className="relative z-20 flex flex-col gap-3 mt-auto">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`text-xs border-b border-white/5 pb-2 last:border-0 flex items-center gap-3 ${
                      feature.included
                        ? "text-white"
                        : "text-white/20 line-through decoration-white/20"
                    }`}
                  >
                    {feature.included ? (
                      <span className="text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)] rounded-full">
                        ✓
                      </span>
                    ) : (
                      <span className="text-white/20">
                        <X size={10} />
                      </span>
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        
        {/* Mobile Spacer (Allows seeing the last card fully) */}
        <div className="min-w-[4vw] md:hidden"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}