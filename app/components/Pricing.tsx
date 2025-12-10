"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// Pricing Data
const plans = [
  {
    name: "BASIC",
    prices: { 
        USD: 250, 
        EUR: 235, // Adjusted for realistic exchange rate (rounded)
        GBP: 195, // Adjusted for realistic exchange rate (rounded)
        INR: 5000 // KEPT SAME
    },
    desc: "All Basic Stuff for simple websites. Up for Negotiation :)",
    delivery: "2-day delivery",
    revisions: "1 Revision",
    features: [
      "Functional website",
      "2 pages",
      "Content upload",
      "Speed optimization",
      "Hosting setup",
      "Social media icons",
    ],
  },
  {
    name: "STANDARD",
    prices: { 
        USD: 350, 
        EUR: 325, 
        GBP: 275, 
        INR: 9000 // KEPT SAME
    },
    desc: "Fulfilling your wants with Hosting - 1 Week Support after hosting.",
    delivery: "5-day delivery",
    revisions: "2 Revisions",
    features: [
      "Functional website",
      "4 pages",
      "Content upload",
      "E-commerce functionality",
      "8 products",
      "Payment Integration",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
    ],
  },
  {
    name: "PREMIUM",
    prices: { 
        USD: 500, 
        EUR: 465, 
        GBP: 395, 
        INR: 15000 // KEPT SAME
    },
    desc: "Full Product with Hosting - 2 Week Support after hosting.",
    delivery: "5-day delivery",
    revisions: "4 Revisions",
    features: [
      "Functional website",
      "7 pages",
      "Content upload",
      "E-commerce functionality",
      "8 products",
      "Payment Integration",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
      "Social media icons",
    ],
  },
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

  const isGlobal = currency !== "INR";

  return (
    <section className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-12 md:mb-16 gap-6 md:gap-0">

        <div className="flex items-center gap-3 md:gap-4">
          <span>//</span>
          <span className="text-white font-bold tracking-widest">PRICING & PACKAGES</span>
          <span>//</span>
        </div>

        {/* Currency Selector */}
        <div className="flex bg-[#111] px-2 py-1.5 rounded-full border border-white/10 shadow-xl items-center gap-2 w-full md:w-auto justify-between md:justify-start">

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
              <ChevronDown size={12} className={`${isOpen ? "rotate-180" : ""} transition-transform`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-full md:w-40 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                >
                  {(["USD", "EUR", "GBP"] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white hover:text-black flex justify-between"
                    >
                      {curr}
                      {currency === curr && <Check size={10} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* India Button */}
          <button
            onClick={() => {
              setCurrency("INR");
              setIsOpen(false);
            }}
            className={`
              px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 
              ${currency === "INR" ? "bg-brand-green text-white shadow-[0_0_15px_rgba(0,255,65,0.3)]" : "text-gray-400 hover:text-white"}
            `}
          >
            India (₹)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">

        {plans.map((plan) => (
          <div key={plan.name} className="flex flex-col group h-full">

            {/* Top Label */}
            <div className="flex justify-between items-start text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-6 border-t border-white/10 pt-6 group-hover:border-white/30 transition-colors">
              <div>
                <span className="text-white font-bold">{plan.name}</span>
                <p className="text-[7px] mt-1">ONE-TIME PAYMENT</p>
              </div>
              <span className="text-white/20 text-lg">"</span>
            </div>

            {/* Price */}
            <div className="mb-6 min-h-[140px] sm:min-h-[150px] md:min-h-[170px]">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currency}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter"
                >
                  {currencies[currency].symbol}
                  {plan.prices[currency].toLocaleString()}
                </motion.h3>
              </AnimatePresence>

              {/* Delivery + Revisions */}
              <div className="flex flex-wrap gap-4 mt-4 text-[9px] font-mono text-brand-green uppercase tracking-wide">
                <span>{plan.delivery}</span>
                <span>{plan.revisions}</span>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed mt-4">
                {plan.desc}
              </p>
            </div>

            {/* Features List */}
            <ul className="flex flex-col gap-3 mt-auto">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="text-white text-xs border-b border-white/5 pb-2 last:border-0 flex items-center gap-2"
                >
                  <span className="text-white/40">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
    </section>
  );
}
