"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  Calculator,
  Layout,
  Calendar,
  CreditCard,
  FileText,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const BASE_PRICE = 299;
const MAX_PRICE = 1200;

const steps = [
  {
    id: "pages",
    title: "Website Scale",
    icon: <Layout className="text-brand-green" />,
    description: "How big does your digital shop need to be?",
    type: "radio",
    options: [
      { id: "p1", label: "Two-Page Landing", price: 0, desc: "Perfect for Ads & Bio Links" },
      { id: "p2", label: "3-5 Pages", price: 300, desc: "Home, Services, Gallery, About, etc." },
      { id: "p3", label: "5+ Pages (Empire)", price: 600, desc: "Full SEO Structure & Location Pages" },
    ],
  },
  {
    id: "booking",
    title: "Booking Engine",
    icon: <Calendar className="text-blue-400" />,
    description: "How should customers book an appointment?",
    type: "radio",
    options: [
      { id: "b1", label: "Call / Text Only", price: 0, desc: "Click-to-call buttons only" },
      { id: "b2", label: "Request Form", price: 150, desc: "Form sent to your email" },
      { id: "b3", label: "Full Auto-Booking", price: 200, desc: "Live Calendar Sync + Reminders" },
    ],
  },
  {
    id: "payments",
    title: "Payment Gateway",
    icon: <CreditCard className="text-purple-400" />,
    description: "Do you want to secure cash flow upfront?",
    type: "radio",
    options: [
      { id: "pay1", label: "No / Cash Only", price: 0, desc: "Pay in person" },
      { id: "pay2", label: "Deposits Only", price: 150, desc: "Take $30 to hold the slot (Stripe)" },
      { id: "pay3", label: "Full Pre-Payment", price: 250, desc: "Full checkout cart functionality" },
    ],
  },
  {
    id: "quoting",
    title: "Smart Quoting System",
    icon: <FileText className="text-amber-400" />,
    description: "Allow clients to get estimates based on vehicle size & condition.",
    type: "checkbox",
    options: [
      { id: "q1", label: "Interactive Quote Form", price: 250, desc: "Clients select SUV + condition and get price range" },
    ],
  },
  {
    id: "extras",
    title: "Growth Power-Ups",
    icon: <Sparkles className="text-pink-400" />,
    description: "Essential tools to rank higher and look better.",
    type: "checkbox",
    options: [
      { id: "x1", label: "Google Reviews Sync", price: 100, desc: "Showcase your 5-star rating live" },
      { id: "x2", label: "SEO Dominance Setup", price: 150, desc: "Rank for detailing near me" },
      { id: "x3", label: "Logo & Branding", price: 150, desc: "Optional branding addon" },
    ],
  },
];

export default function QuoteCalculator() {
  const containerRef = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLDivElement>(null);

  const [selections, setSelections] = useState({
    pages: "p1",
    booking: "b1",
    payments: "pay1",
    quoting: [] as string[],
    extras: [] as string[],
  });

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  useEffect(() => {
    let coreTotal = BASE_PRICE;
    let brandingAddon = 0;

    steps.forEach(step => {
      if (step.type === "radio") {
        const selected = step.options.find(
          o => o.id === selections[step.id as keyof typeof selections]
        );
        if (selected) coreTotal += selected.price;
      }

      if (step.type === "checkbox") {
        const active = selections[step.id as keyof typeof selections] as string[];
        step.options.forEach(opt => {
          if (active.includes(opt.id)) {
            if (opt.id === "x3") {
              brandingAddon += opt.price;
            } else {
              coreTotal += opt.price;
            }
          }
        });
      }
    });

    if (coreTotal > MAX_PRICE) coreTotal = MAX_PRICE;

    setTotalPrice(coreTotal + brandingAddon);
  }, [selections]);

  useEffect(() => {
    gsap.fromTo(
      totalRef.current,
      { scale: 1.2, color: "#4ade80" },
      { scale: 1, color: "#ffffff", duration: 0.4 }
    );
  }, [totalPrice]);

  const handleRadio = (cat: string, id: string) => {
    setSelections(prev => ({ ...prev, [cat]: id }));
  };

  const handleCheckbox = (cat: string, id: string) => {
    setSelections(prev => {
      const current = prev[cat as keyof typeof selections] as string[];
      return {
        ...prev,
        [cat]: current.includes(id)
          ? current.filter(x => x !== id)
          : [...current, id],
      };
    });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-24 px-4 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden font-sans">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.05),transparent_40%)] pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-brand-green mb-6">
            <Calculator size={14} /> Interactive Calculator
        </div>
        <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-6">
            Build Your <span className="text-gray-600">Perfect Setup</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            Don't pay for features you don't need. Select your requirements below to get an instant estimated investment range.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* --- LEFT COLUMN: STEPS --- */}
        <div className="lg:col-span-8 space-y-12">
            {steps.map((step, index) => (
                <div key={step.id} className="calc-step">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{step.title}</h3>
                            <p className="text-xs text-gray-500">{step.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {step.options.map((option) => {
                            // Determine selection state
                            const isRadio = step.type === "radio";
                            const isSelected = isRadio 
                                ? selections[step.id as keyof typeof selections] === option.id
                                : (selections[step.id as keyof typeof selections] as string[]).includes(option.id);

                            return (
                                <div 
                                    key={option.id}
                                    onClick={() => isRadio ? handleRadio(step.id, option.id) : handleCheckbox(step.id, option.id)}
                                    className={`
                                        relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 group
                                        ${isSelected 
                                            ? "bg-brand-green/10 border-brand-green" 
                                            : "bg-[#0a0a0a] border-white/10 hover:border-white/30"
                                        }
                                    `}
                                >
                                    {/* Selection Indicator */}
                                    <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? "bg-brand-green border-brand-green" : "border-white/20"}`}>
                                        {isSelected && <Check size={12} className="text-black" />}
                                    </div>

                                    <h4 className={`font-bold text-sm mb-2 ${isSelected ? "text-white" : "text-gray-300"}`}>
                                        {option.label}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 leading-tight min-h-[2.5em]">
                                        {option.desc}
                                    </p>
                                    
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className={`text-xs font-mono font-bold ${isSelected ? "text-brand-green" : "text-gray-600"}`}>
                                            {option.price === 0 ? "INCLUDED" : `+$${option.price}`}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>

        {/* --- RIGHT COLUMN: STICKY SUMMARY --- */}
        <div className="lg:col-span-4 relative">
            <div className="sticky-summary sticky top-32 bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8 pb-8 border-b border-white/10">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Estimated Investment</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl text-gray-500">$</span>
                        <span ref={totalRef} className="text-6xl font-black text-white tracking-tighter">
                            {totalPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">USD</span>
                    </div>
                    <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-2">
                        <Info size={12} /> Final price depends on complexity
                    </p>
                </div>

                {/* Summary List */}
                <div className="space-y-3 mb-10">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Selected Features</h4>
                    
                    {/* Render active selections dynamically */}
                    {Object.entries(selections).map(([key, value]) => {
                        // Flatten selections to find labels
                        const category = steps.find(s => s.id === key);
                        if (!category) return null;

                        if (Array.isArray(value)) {
                            // Checkboxes
                            return value.map(id => {
                                const opt = category.options.find(o => o.id === id);
                                return opt ? (
                                    <div key={id} className="flex justify-between text-xs text-gray-400">
                                        <span>+ {opt.label}</span>
                                        <span className="text-gray-600">${opt.price}</span>
                                    </div>
                                ) : null;
                            });
                        } else {
                            // Radios (only show if price > 0)
                            const opt = category.options.find(o => o.id === value);
                            if (opt && opt.price > 0) {
                                return (
                                    <div key={value} className="flex justify-between text-xs text-gray-400">
                                        <span>+ {opt.label}</span>
                                        <span className="text-gray-600">${opt.price}</span>
                                    </div>
                                );
                            }
                        }
                    })}
                    
                    <div className="flex justify-between text-xs text-brand-green pt-2">
                        <span>Base Package</span>
                        <span>${BASE_PRICE}</span>
                    </div>
                </div>

                <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank">
                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                        Book Call to Confirm
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
                <p className="text-[10px] text-center text-gray-600 mt-4">
                    No payment required to book call.
                </p>
            </div>
        </div>

      </div>


    </section>
  );
}