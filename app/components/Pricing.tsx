"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Check, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA (Unchanged) ---
const plans = [
  {
    name: "BASIC",
    prices: {
      USD: 1000,
      EUR: 850,
      GBP: 700,
      INR: 25000,
    },
    desc: "A static portfolio or landing page to get your presence online.",
    delivery: "5-7 days delivery",
    revisions: "1 Revision",
    features: [
      { text: "Functional Static Website", included: true },
      { text: "2 Pages (Home + About)", included: true },
      { text: "Mobile Responsive", included: true },
      { text: "Social Media Links", included: true },
      { text: "CMS (Easy Admin Panel)", included: false },
      { text: "Premium Animations", included: false },
      { text: "Contact Forms", included: false },
      { text: "E-commerce / Payments", included: false },
    ],
  },
  {
    name: "STANDARD",
    prices: {
      USD: 1850,
      EUR: 1550,
      GBP: 1400,
      INR: 40000,
    },
    desc: "Dynamic site with animations and admin panel for growing businesses.",
    delivery: "10-14 days delivery",
    revisions: "3 Revisions",
    features: [
      { text: "Functional Dynamic Website", included: true },
      { text: "5 Pages (Services, Blog, etc)", included: true },
      { text: "Mobile Responsive", included: true },
      { text: "Social Media Links", included: true },
      { text: "CMS (You can edit text)", included: true },
      { text: "Premium Animations", included: true },
      { text: "Contact Forms + Database", included: true },
      { text: "E-commerce / Payments", included: false },
    ],
  },
  {
    name: "PREMIUM",
    prices: {
      USD: 3000,
      EUR: 2550,
      GBP: 2250,
      INR: 65000,
    },
    desc: "Full-scale solution with online store, payments, and 24/7 support.",
    delivery: "3-4 Weeks delivery",
    revisions: "Unlimited",
    features: [
      { text: "Full Custom Platform", included: true },
      { text: "Unlimited Pages", included: true },
      { text: "Mobile Responsive", included: true },
      { text: "Social Media Links", included: true },
      { text: "Advanced CMS Dashboard", included: true },
      { text: "Premium Animations", included: true },
      { text: "Advanced Forms (Logic)", included: true },
      { text: "E-commerce & Payments", included: true },
    ],
  },
];

const currencies = {
  USD: { symbol: "$", label: "USD ($)" },
  EUR: { symbol: "€", label: "EUR (€)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  INR: { symbol: "₹", label: "India (₹)" },
};

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "INR">("USD");
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isGlobal = currency !== "INR";

  // --- 1. Currency Switch Animation (Blur Swap) ---
  useGSAP(() => {
    // When currency changes, we 're-enter' the numbers with a blur effect
    gsap.fromTo(".price-value", 
      { filter: "blur(10px)", opacity: 0, y: 20, scale: 0.9 },
      { filter: "blur(0px)", opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
    );
  }, { dependencies: [currency], scope: containerRef });

  // --- 2. Dropdown Animation ---
  useGSAP(() => {
    if (isOpen) {
      gsap.to(dropdownRef.current, { 
        autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" 
      });
    } else {
      gsap.to(dropdownRef.current, { 
        autoAlpha: 0, y: 10, scale: 0.95, duration: 0.2, ease: "power2.in" 
      });
    }
  }, { dependencies: [isOpen] });

  // --- 3. Spotlight & Entrance Animations ---
  useGSAP(() => {
    // Entrance Stagger
    gsap.from(".pricing-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // Spotlight Effect Logic
    const cards = document.querySelectorAll(".pricing-card");
    
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Apply spotlight to border via CSS variable
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0">
        <div className="flex items-center gap-3 md:gap-4">
          <span>//</span>
          <span className="text-white font-bold tracking-widest">PRICING & PACKAGES</span>
          <span>//</span>
        </div>

        {/* Currency Selector */}
        <div className="flex bg-[#111] px-2 py-1.5 rounded-full border border-white/10 shadow-xl items-center gap-2 w-full md:w-auto justify-between md:justify-start relative z-30">
          
          {/* Global Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                w-full md:w-auto px-5 py-2 rounded-full text-[10px] font-bold uppercase 
                flex items-center justify-between md:justify-center gap-2 transition-all duration-300
                ${isGlobal ? "bg-white text-black" : "text-gray-400 hover:text-white"}
              `}
            >
              {isGlobal ? currencies[currency].label : "Global"}
              <ChevronDown size={12} className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`} />
            </button>

            {/* GSAP Controlled Dropdown Menu */}
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

          {/* India Button */}
          <button
            onClick={() => {
              setCurrency("INR");
              setIsOpen(false);
            }}
            className={`
              px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 whitespace-nowrap
              ${currency === "INR" ? "bg-brand-green text-white shadow-[0_0_15px_rgba(0,255,65,0.3)]" : "text-gray-400 hover:text-white"}
            `}
          >
            India (₹)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 relative group/grid">

        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className="pricing-card flex flex-col h-full relative z-10 p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] overflow-hidden transition-transform duration-500 hover:-translate-y-2"
          >
            {/* SPOTLIGHT GRADIENT OVERLAY */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)`
              }}
            />
             {/* SPOTLIGHT BORDER OVERLAY */}
             <div 
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3), transparent 40%)`,
                maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                maskClip: 'content-box, border-box',
                maskComposite: 'exclude',
                padding: '1px', 
              }}
            />

            {/* Top Label */}
            <div className="relative z-20 flex justify-between items-start text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-6 border-b border-white/5 pb-6">
              <div>
                <span className="text-white font-bold text-base md:text-lg">{plan.name}</span>
                <p className="text-[9px] mt-1 text-brand-green">ONE-TIME PAYMENT</p>
              </div>
              <span className="text-white/10 text-4xl font-serif">"</span>
            </div>

            {/* Price Area */}
            <div className="relative z-20 mb-6 min-h-[140px] sm:min-h-[150px] md:min-h-[170px]">
              <h3 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter price-value will-change-transform">
                <span className="text-white/50 text-3xl md:text-5xl align-top mr-1">
                  {currencies[currency].symbol}
                </span>
                {plan.prices[currency as keyof typeof plan.prices].toLocaleString()}
              </h3>

              {/* Delivery + Revisions */}
              <div className="flex flex-wrap gap-4 mt-6 text-[9px] font-mono text-brand-green uppercase tracking-wide">
                <span className="border border-brand-green/30 px-2 py-1 rounded bg-brand-green/10">
                  {plan.delivery}
                </span>
                <span className="border border-brand-green/30 px-2 py-1 rounded bg-brand-green/10">
                  {plan.revisions}
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
                    feature.included ? "text-white" : "text-white/20 line-through decoration-white/20"
                  }`}
                >
                  {feature.included ? (
                    <span className="text-brand-green shadow-[0_0_10px_rgba(0,255,65,0.4)] rounded-full">✓</span>
                  ) : (
                    <span className="text-white/20"><X size={10} /></span>
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
          
          </div>
        ))}
      </div>

      {/* Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}