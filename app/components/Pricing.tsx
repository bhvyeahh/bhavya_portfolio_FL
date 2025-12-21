"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Check, X } from "lucide-react";

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

// Type definition for snowflakes
type Snowflake = {
  left: string;
  fontSize: string;
  animationDuration: string;
  animationDelay: string;
};

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "INR">("USD");
  const [isOpen, setIsOpen] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  
  const containerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const santaRef = useRef<HTMLDivElement>(null);

  const isGlobal = currency !== "INR";
  const DISCOUNT_PERCENTAGE = 0.25; // 25% Discount

  // --- 0. HYDRATION FIX: Generate Snowflakes on Mount ---
  useEffect(() => {
    const generatedFlakes = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setSnowflakes(generatedFlakes);
  }, []);

  // --- 1. Currency Switch Animation (Blur Swap) ---
  useGSAP(() => {
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

  // --- 3. SANTA FLYING ANIMATION 🎅 ---
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    tl.fromTo(santaRef.current, 
      { x: "-20vw", y: "10vh", rotation: 5, opacity: 0 },
      { 
        x: "120vw", 
        y: "-10vh", 
        rotation: -5, 
        opacity: 1,
        duration: 15, 
        ease: "linear"
      }
    );

    gsap.to(santaRef.current, {
        y: "+=20",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

  }, { scope: containerRef });

  // --- 4. Spotlight & Entrance Animations ---
  useGSAP(() => {
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden font-sans">

      {/* --- CHRISTMAS THEME ASSETS --- */}
      
      {/* 1. Falling Snow Overlay (CSS Animation) */}
      <style jsx>{`
        @keyframes snow {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .snowflake {
          position: absolute;
          top: -10px;
          color: white;
          opacity: 0.8;
          animation: snow linear infinite;
        }
      `}</style>
      
      {/* FIXED: Hydration safe snow rendering */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((flake, i) => (
          <div 
            key={i} 
            className="snowflake text-white/10"
            style={{
              left: flake.left,
              fontSize: flake.fontSize,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* 2. Flying Santa */}
      <div 
        ref={santaRef} 
        className="absolute top-20 z-0 pointer-events-none text-6xl md:text-8xl opacity-0 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
      >
        🎅🦌🦌
      </div>

      {/* 3. Theme Banner */}
      <div className="relative z-20 mb-10 w-full max-w-4xl mx-auto">
        <div className="w-full bg-gradient-to-r from-red-900/40 via-red-600/20 to-red-900/40 border border-red-500/30 rounded-xl p-4 text-center backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-30"></div>
            <p className="text-red-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">Seasonal Offer</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex justify-center items-center gap-4">
                <span>🎄</span>
                <span className="tracking-tighter">CHRISTMAS & NEW YEAR SALE</span>
                <span>🔔</span>
            </h2>
            <p className="text-white/60 text-xs mt-2 font-mono">25% OFF ON ALL PACKAGES TILL JANUARY 4TH</p>
        </div>
      </div>


      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0 relative z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-red-500">//</span>
          <span className="text-white font-bold tracking-widest">PRICING & PACKAGES</span>
          <span className="text-red-500">//</span>
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
              ${currency === "INR" ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-white"}
            `}
          >
            India (₹)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 relative group/grid">

        {plans.map((plan) => {
          // --- CALCULATE DISCOUNT & ROUNDING ---
          const originalPrice = plan.prices[currency as keyof typeof plan.prices];
          const rawDiscount = originalPrice * (1 - DISCOUNT_PERCENTAGE);
          // ROUND UP to nearest 50
          const discountedPrice = Math.ceil(rawDiscount / 50) * 50;

          return (
            <div 
              key={plan.name} 
              className="pricing-card flex flex-col h-full relative z-10 p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] overflow-hidden transition-transform duration-500 hover:-translate-y-2"
            >
              {/* SPOTLIGHT GRADIENT OVERLAY - Red Tinted */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.1), transparent 40%)`
                }}
              />
               {/* SPOTLIGHT BORDER OVERLAY - Red Tinted */}
               <div 
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.4), transparent 40%)`,
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
                  <p className="text-[9px] mt-1 text-red-500 flex items-center gap-1">
                    ❄️ ONE-TIME PAYMENT
                  </p>
                </div>
                {/* Sale Tag */}
                <span className="bg-red-600 text-white px-2 py-1 rounded text-[9px] font-bold animate-pulse">
                    -25% OFF
                </span>
              </div>

              {/* Price Area */}
              <div className="relative z-20 mb-6 min-h-[140px] sm:min-h-[150px] md:min-h-[170px]">
                
                {/* Old Price Crossed Out */}
                <div className="text-white/40 text-lg font-mono line-through mb-1 decoration-red-500/50">
                    {currencies[currency].symbol}{originalPrice.toLocaleString()}
                </div>

                <h3 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter price-value will-change-transform">
                  <span className="text-red-500 text-3xl md:text-5xl align-top mr-1">
                    {currencies[currency].symbol}
                  </span>
                  {discountedPrice.toLocaleString()}
                </h3>

                {/* Delivery + Revisions */}
                <div className="flex flex-wrap gap-4 mt-6 text-[9px] font-mono text-red-400 uppercase tracking-wide">
                  <span className="border border-red-900/50 px-2 py-1 rounded bg-red-900/10">
                    {plan.delivery}
                  </span>
                  <span className="border border-red-900/50 px-2 py-1 rounded bg-red-900/10">
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
                      <span className="text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.4)] rounded-full">✓</span>
                    ) : (
                      <span className="text-white/20"><X size={10} /></span>
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
            
            </div>
          )
        })}
      </div>

      {/* Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
      <br />
      <br />
    </section>
    
  );
}