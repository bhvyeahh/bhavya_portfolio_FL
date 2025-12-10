"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// Pricing Data with clean Round Figures
const plans = [
  {
    name: "BASIC",
    prices: { USD: 150, EUR: 140, GBP: 120, INR: 4000 },
    desc: "All Basic Stuff for simple websites. Up for Negotiation :)",
    delivery: "2-day delivery",
    revisions: "1 Revision",
    features: [
      "Functional website", "2 pages", "Content upload", 
      "Speed optimization", "Hosting setup", "Social media icons"
    ]
  },
  {
    name: "STANDARD",
    prices: { USD: 250, EUR: 230, GBP: 200, INR: 8000 },
    desc: "Fulfilling your wants with Hosting - 1 Week Support after hosting.",
    delivery: "5-day delivery",
    revisions: "2 Revisions",
    features: [
      "Functional website", "4 pages", "Content upload", "E-commerce functionality",
      "8 products", "Payment Integration", "Opt-in form", "Autoresponder integration",
      "Speed optimization", "Hosting setup"
    ]
  },
  {
    name: "PREMIUM",
    prices: { USD: 300, EUR: 275, GBP: 235, INR: 15000 },
    desc: "Full Product with Hosting - 2 Week Support after hosting.",
    delivery: "5-day delivery",
    revisions: "4 Revisions",
    features: [
      "Functional website", "7 pages", "Content upload", "E-commerce functionality",
      "8 products", "Payment Integration", "Opt-in form", "Autoresponder integration",
      "Speed optimization", "Hosting setup", "Social media icons"
    ]
  }
];

// Currency Config
const currencies = {
  USD: { symbol: "$", label: "USD ($)" },
  EUR: { symbol: "€", label: "EUR (€)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  INR: { symbol: "₹", label: "India (₹)" },
};

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "INR">("USD");
  const [isOpen, setIsOpen] = useState(false);

  // Helper to check if current selection is Global (USD/EUR/GBP)
  const isGlobal = currency !== "INR";

  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-white/5 overflow-hidden">
      
      {/* --- Header & Controls --- */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-16 z-50 relative gap-8">
        <div className="flex items-center gap-4">
            <span>//</span>
            <span className="text-white font-bold tracking-widest">PRICING & PACKAGES</span>
            <span>//</span>
        </div>

        {/* --- SLEEK CURRENCY CONTROLLER --- */}
        <div className="flex bg-[#111] p-1.5 rounded-full border border-white/10 relative z-50 shadow-2xl">
            
            {/* 1. Global Dropdown Button */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        relative px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2
                        ${isGlobal ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "text-gray-500 hover:text-white"}
                    `}
                >
                    {isGlobal ? currencies[currency].label : "Global"}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Custom Dropdown Menu (No more disappearing text!) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-0 mt-3 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                        >
                            {(["USD", "EUR", "GBP"] as const).map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => {
                                        setCurrency(curr);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white hover:text-black transition-colors flex justify-between items-center"
                                >
                                    {curr}
                                    {currency === curr && <Check size={10} />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 2. India Button (Distinct Style) */}
            <button 
                onClick={() => {
                    setCurrency("INR");
                    setIsOpen(false);
                }}
                className={`
                    px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ml-2 relative overflow-hidden
                    ${currency === "INR" ? "bg-brand-green text-white shadow-[0_0_20px_rgba(0,255,65,0.4)]" : "text-gray-500 hover:text-white"}
                `}
            >
                <span className="relative z-10">India (₹)</span>
            </button>
        </div>
      </div>

      {/* --- Pricing Cards Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
        {plans.map((plan) => (
          <div key={plan.name} className="flex flex-col justify-between group h-full relative">
             
             {/* Card Top */}
             <div className="flex justify-between items-start text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-8 border-t border-white/10 pt-8 group-hover:border-white/30 transition-colors">
                 <div className="flex flex-col">
                     <span className="text-white font-bold mb-1">{plan.name}</span>
                     <span className="text-[8px]">ONE-TIME PAYMENT</span>
                 </div>
                 <span className="text-white/20 text-xl font-serif">"</span>
             </div>

             {/* Price Display */}
             <div className="mb-10 min-h-[160px]">
                 <AnimatePresence mode="wait">
                    <motion.h3 
                        key={currency} 
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className="font-display font-black text-6xl md:text-7xl text-white mb-2 tracking-tighter"
                    >
                        {currencies[currency].symbol}{plan.prices[currency as keyof typeof plan.prices].toLocaleString()}
                    </motion.h3>
                 </AnimatePresence>
                 
                 {/* Meta Details */}
                 <div className="flex gap-4 mb-6 text-[9px] font-mono text-brand-green uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        {plan.delivery}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
                        {plan.revisions}
                    </span>
                 </div>

                 <p className="text-gray-400 text-xs leading-relaxed max-w-[90%]">
                    {plan.desc}
                 </p>
             </div>

             {/* Features List */}
             <div className="flex-grow">
                 <ul className="flex flex-col gap-3 mb-12">
                    {plan.features.map((feature) => (
                        <li key={feature} className="text-white text-xs font-medium border-b border-white/5 pb-2 last:border-0 flex items-center gap-3">
                            <span className="text-white/40">✓</span> {feature}
                        </li>
                    ))}
                 </ul>
             </div>

          </div>
        ))}
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}