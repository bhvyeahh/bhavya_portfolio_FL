"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Check, X, Plus, Star, Zap, Calendar, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA: CURRENCIES ---
const currencies = {
  USD: { symbol: "$", label: "USD ($)", rate: 1 },
  EUR: { symbol: "€", label: "EUR (€)", rate: 0.85 },
  GBP: { symbol: "£", label: "GBP (£)", rate: 0.75 },
  INR: { symbol: "₹", label: "India (₹)", rate: 25 }, // Custom rate for Add-ons to match your PPP (20k/1k ratio)
};

// --- DATA: MAIN PLANS (RESTORED ORIGINAL STRUCTURE) ---
const plans = [
  {
    name: "BASIC",
    // Restored specific pricing object
    prices: { USD: 1000, EUR: 850, GBP: 750, INR: 20000 },
    desc: "A professional static presence to get your business online.",
    delivery: "5-7 days",
    revisions: "2 Rounds",
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
    prices: { USD: 1850, EUR: 1575, GBP: 1385, INR: 40000 },
    desc: "Dynamic site with a CMS for businesses that update content often.",
    delivery: "10-14 days",
    revisions: "3 Rounds",
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
    prices: { USD: 3000, EUR: 2550, GBP: 2250, INR: 70000 },
    desc: "Full-scale E-commerce solution with payments and advanced logic.",
    delivery: "3-4 Weeks",
    revisions: "5 Rounds",
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

// --- DATA: ADD-ONS (Base prices in USD) ---
const addOns = [
  { name: "Extra Page", basePrice: 150, desc: "Per additional page beyond package limit." },
  { name: "Extra Revision Round", basePrice: 100, desc: "Per round of design changes." },
  { name: "Urgent Delivery", basePrice: 500, desc: "Jump the queue (48hr turnaround)." },
  { name: "Copywriting", basePrice: 200, desc: "Professional text content per page." },
];

// --- DATA: MONTHLY SERVICES ---
const monthlyServices = [
  { 
    name: "Basic Maintenance", 
    basePrice: 50, 
    icon: <Zap className="text-yellow-400" />,
    features: ["Server Monitoring", "Security Patches", "Monthly Backups"] 
  },
  { 
    name: "Seasonal Theme Support", 
    basePrice: 150, 
    icon: <Calendar className="text-red-400" />,
    features: ["Site changes for Xmas, Halloween, etc.", "Holiday Banners", "Festive Animations"] 
  },
];

// --- DATA: PREMIUM FREEBIES ---
const premiumFreebies = [

  "10% Discount on Future Add-Ons",

];

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
  const santaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isGlobal = currency !== "INR";
  const DISCOUNT_PERCENTAGE = 0.25; // 25% Discount

  // Helper for ADD-ONS only (Calculates rate based on selection)
  const getAddonPrice = (base: number) => {
    const rate = currencies[currency].rate;
    // Round UP to nearest 10
    return Math.ceil((base * rate) / 10) * 10;
  };

  // --- 0. HYDRATION FIX ---
  useEffect(() => {
    const generatedFlakes = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setSnowflakes(generatedFlakes);
  }, []);

  // --- 1. ENTRANCE ANIMATIONS (Runs ONCE) ---
  useGSAP(() => {
    // Cards Entrance
    gsap.from(".pricing-card", {
      y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" }
    });

    // Add-ons Entrance
    gsap.from(".interactive-card", {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: ".addons-section", start: "top 85%" }
    });

    // Money Assets Floating Animation
    gsap.to(".floating-asset", {
      y: -20, rotation: 5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.5, from: "random" }
    });

    // Santa Animation
    const santaTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    santaTl.fromTo(santaRef.current, 
      { x: "-20vw", y: "10vh", rotation: 5, opacity: 0 },
      { x: "120vw", y: "-10vh", rotation: -5, opacity: 1, duration: 15, ease: "linear" }
    );
    gsap.to(santaRef.current, { y: "+=20", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

  }, { scope: containerRef });

  // --- 2. PRICE CHANGE ANIMATION (Runs on Currency Change) ---
  useGSAP(() => {
    gsap.fromTo(".price-value", 
      { filter: "blur(10px)", opacity: 0.5 },
      { filter: "blur(0px)", opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, { dependencies: [currency], scope: containerRef });

  // --- 3. DROPDOWN ANIMATION (Runs on Open/Close) ---
  useGSAP(() => {
    if (isOpen) {
        gsap.to(dropdownRef.current, { autoAlpha: 1, y: 0, display: "block", duration: 0.2, ease: "power2.out" });
    } else {
        gsap.to(dropdownRef.current, { autoAlpha: 0, y: 10, display: "none", duration: 0.2, ease: "power2.in" });
    }
  }, { dependencies: [isOpen], scope: containerRef });

  // Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const cards = document.querySelectorAll(".interactive-card, .pricing-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden font-sans"
    >

      {/* --- ASSETS: FLOATING MONEY/COINS --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
            src="https://cdn-icons-png.flaticon.com/512/2529/2529396.png" // Coin
            alt="coin"
            className="floating-asset absolute top-20 left-10 w-16 opacity-20 blur-[2px]"
        />
        <img 
            src="https://cdn-icons-png.flaticon.com/512/536/536054.png" // Money Bag
            alt="money"
            className="floating-asset absolute bottom-40 right-10 w-24 opacity-20 blur-[1px]"
        />
        <img 
            src="https://cdn-icons-png.flaticon.com/512/9498/9498226.png" // Diamond
            alt="diamond"
            className="floating-asset absolute top-1/2 left-20 w-12 opacity-10"
        />
      </div>

      {/* --- CHRISTMAS SNOW & SANTA --- */}
      <style jsx>{`
        @keyframes snow {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .snowflake { position: absolute; top: -10px; color: white; opacity: 0.8; animation: snow linear infinite; }
      `}</style>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((flake, i) => (
          <div key={i} className="snowflake text-white/10" style={{...flake}}>❄</div>
        ))}
      </div>
      <div ref={santaRef} className="absolute top-20 z-0 pointer-events-none text-6xl md:text-8xl opacity-0 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">🎅🦌🦌</div>

      {/* --- HEADER --- */}
      <div className="relative z-20 mb-10 w-full max-w-4xl mx-auto text-center">
        <div className="inline-block bg-gradient-to-r from-red-900/40 via-red-600/20 to-red-900/40 border border-red-500/30 rounded-xl p-4 backdrop-blur-md relative overflow-hidden mb-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-30"></div>
            <p className="text-red-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">Seasonal Offer</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex justify-center items-center gap-4">
                <span>🎄</span><span className="tracking-tighter">CHRISTMAS SALE</span><span>🔔</span>
            </h2>
            <p className="text-white/60 text-xs mt-2 font-mono">25% OFF PACKAGES • ENDS JAN 4TH</p>
        </div>
      </div>

      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0 relative z-20">
        
        {/* Left: Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-red-500">//</span>
          <span className="text-white font-bold tracking-widest">PRICING & PACKAGES</span>
          <span className="text-red-500">//</span>
        </div>

        {/* Right: Controls (Currency + Redirect Button) */}
        <div className="flex flex-col md:flex-row items-center gap-4 relative z-30 w-full md:w-auto">
            
            {/* View Full Page Button */}

            {/* Currency Selector */}
            <div className="flex bg-[#111] px-2 py-1.5 rounded-full border border-white/10 shadow-xl items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            
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

                    <div 
                        ref={dropdownRef}
                        className="absolute top-full right-0 mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 invisible opacity-0"
                    >
                        {(["USD", "EUR", "GBP"] as const).map((curr) => (
                            <button
                                key={curr}
                                onClick={() => {
                                    setCurrency(curr);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white hover:text-black block"
                            >
                                {curr}
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
                    ${currency === "INR" ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-white"}
                    `}
                >
                    India (₹)
                </button>
            </div>
        </div>
      </div>

      {/* --- MAIN PRICING GRID --- */}
      <div ref={cardsRef} className="pricing-grid max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 relative group/grid mb-24">
        {plans.map((plan) => {
          // --- FIXED: USE HARDCODED PRICES ---
          const originalPrice = plan.prices[currency as keyof typeof plan.prices];
          
          // Apply discount and round up to nearest 50
          const discountedPrice = Math.ceil((originalPrice * (1 - DISCOUNT_PERCENTAGE)) / 50) * 50;

          return (
            <div key={plan.name} className="pricing-card flex flex-col h-full relative z-10 p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] overflow-hidden transition-transform duration-500 hover:-translate-y-2">
              {/* Spotlight Gradients */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100" style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.1), transparent 40%)` }} />
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/grid:opacity-100 z-30" style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.4), transparent 40%)`, maskImage: 'linear-gradient(black, black), linear-gradient(black, black)', maskClip: 'content-box, border-box', maskComposite: 'exclude', padding: '1px' }} />

              {/* Card Content */}
              <div className="relative z-20">
                  <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                    <div>
                        <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                        <p className="text-[9px] text-red-500 mt-1">❄️ ONE-TIME</p>
                    </div>
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-[9px] font-bold">-25%</span>
                  </div>
                  
                  <div className="mb-6 h-[140px]">
                    <div className="text-white/40 text-lg font-mono line-through decoration-red-500/50">{currencies[currency].symbol}{originalPrice.toLocaleString()}</div>
                    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter price-value">
                        <span className="text-red-500 text-3xl align-top mr-1">{currencies[currency].symbol}</span>{discountedPrice.toLocaleString()}
                    </div>
                    <div className="flex gap-2 mt-4 text-[9px] font-mono text-red-400 uppercase">
                        <span className="border border-red-900/50 px-2 py-1 rounded bg-red-900/10">{plan.delivery}</span>
                        <span className="border border-red-900/50 px-2 py-1 rounded bg-red-900/10">{plan.revisions}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f, i) => (
                        <li key={i} className={`text-xs flex gap-3 ${f.included ? "text-white" : "text-white/20 line-through"}`}>
                            {f.included ? <Check size={14} className="text-red-500" /> : <X size={14} />} {f.text}
                        </li>
                    ))}
                  </ul>

                  {/* Premium Freebies Highlight */}
                  {plan.name === "PREMIUM" && (
                    <div className="mt-8 bg-gradient-to-b from-yellow-900/20 to-transparent border border-yellow-600/30 p-4 rounded-xl">
                        <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Star size={12} fill="currentColor"/> Premium Bonuses</p>
                        <ul className="space-y-1">
                            {premiumFreebies.map((freebie, i) => (
                                <li key={i} className="text-[10px] text-yellow-200/80 flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-yellow-500"></span> {freebie}
                                </li>
                            ))}
                        </ul>
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- EXTRA SERVICES SECTION (ADD-ONS) --- */}
      <div className="addons-section max-w-7xl mx-auto relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT: A LA CARTE EXTRAS */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus className="text-red-500" /> Additional Services
                </h3>
                <div className="flex flex-col gap-4">
                    {addOns.map((addon, i) => (
                        <div key={i} className="addon-row interactive-card group relative bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex justify-between items-center overflow-hidden hover:border-red-500/30 transition-colors">
                            {/* Spotlight for Addons */}
                            <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.1), transparent 40%)` }} />
                            
                            <div className="relative z-10">
                                <h4 className="text-white font-medium text-sm">{addon.name}</h4>
                                <p className="text-white/40 text-[10px]">{addon.desc}</p>
                            </div>
                            <div className="text-right relative z-10">
                                <span className="text-red-400 font-bold font-mono block price-value">
                                    {/* FIXED: USE HELPER FOR ADD-ONS */}
                                    +{currencies[currency].symbol}{getAddonPrice(addon.basePrice).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: MONTHLY RETAINERS */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="text-red-500" /> Monthly Care Plans
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {monthlyServices.map((service, i) => (
                        <div key={i} className="interactive-card relative bg-[#0a0a0a] border border-white/5 p-6 rounded-xl flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors">
                             {/* Spotlight for Monthly */}
                             <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.05), transparent 40%)` }} />
                            
                            <div className="relative z-10">
                                <div className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-white/10">
                                    {service.icon}
                                </div>
                                <h4 className="text-white font-bold text-sm mb-2">{service.name}</h4>
                                <ul className="text-[10px] text-white/50 space-y-1 mb-4">
                                    {service.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                                </ul>
                            </div>
                            <div className="border-t border-white/5 pt-4 relative z-10">
                                <span className="text-white font-bold font-mono text-lg price-value">
                                    {/* FIXED: USE HELPER FOR MONTHLY */}
                                    {currencies[currency].symbol}{getAddonPrice(service.basePrice).toLocaleString()}
                                </span>
                                <span className="text-white/30 text-[10px] ml-1">/month</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Note about Premium */}
                <div className="mt-6 p-4 bg-red-900/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-red-200 text-xs">
                        <span className="font-bold">✨ Pro Tip:</span> Buy the <span className="text-white font-bold">PREMIUM</span> package and get 1 month of Maintenance for FREE!
                    </p>
                </div>
            </div>

        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
    </section>
  );
}