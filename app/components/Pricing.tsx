"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, X, Info } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- ASSETS: Scribbles & Tape ---
const Tape = ({ className, rotation }: { className?: string, rotation?: string }) => (
  <div className={`absolute h-8 w-32 bg-yellow-100/90 shadow-sm border-l-2 border-r-2 border-dashed border-white/40 backdrop-blur-sm z-30 ${className} ${rotation}`}
       style={{ clipPath: "polygon(2% 0, 98% 2%, 100% 95%, 0% 100%)" }}>
  </div>
);

const ScribbleCheck = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-600 overflow-visible">
    <path d="M5 12l5 5l10 -10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
          className="draw-check" strokeDasharray="30" strokeDashoffset="30" />
  </svg>
);

const ScribbleX = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400/50 overflow-visible">
    <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" 
          className="draw-x opacity-60" />
  </svg>
);

// --- DATA ---
const features = [
  "Mobile-First Design (Ads Ready)",    // 0
  "Click-to-Call & SMS Buttons",        // 1
  "Services & Pricing Menu",            // 2
  "Google Maps Integration",            // 3
  "Contact Form & Lead Email",          // 4
  "Portfolio/Gallery Section",          // 5
  "Automated Booking System",           // 6
  "Accept Deposits (Stripe/Square)",    // 7
  "Google Reviews Sync",                // 8
  "Advanced Quote Calculator",          // 9
  "SEO 'Detailing near me'",            // 10
  "Admin Revenue Dashboard",            // 11
];

const plans = [
  {
    name: "The Sketch",
    price: 899,
    desc: "Get on the map. Professionalize your brand.",
    includes: [0, 1, 2, 3, 4, 5], 
    roi: "Upto 3 pages",
    color: "bg-white",
    tape: "rotate-[-3deg]",
  },
  {
    name: "The Build",
    price: 1199,
    desc: "Stop no-shows. Automate your calendar.",
    includes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    roi: "Upto 6 pages",
    color: "bg-yellow-50",
    tape: "rotate-[2deg]",
    popular: true,
  },
  {
    name: "The Empire",
    price: 1499,
    desc: "Dominance. Full SEO & Revenue tracking.",
    includes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All
    roi: "Upto 10 pages",
    color: "bg-black text-white",
    tape: "rotate-[-2deg]",
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null);

  // Safety Refresh
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // 1. Header Pop
    tl.to(".pricing-header", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.5)"
    });

    // 2. Cards Slam Down
    tl.to(".pricing-card", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "bounce.out"
    });

    // 3. Scribble Animation (Checkmarks drawing themselves)
    tl.to(".draw-check", {
      strokeDashoffset: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out"
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-1 px-4 md:px-8 overflow-hidden">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-50" 
           style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* --- HEADER --- */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10 pricing-header opacity-0 translate-y-12">
         <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-400 px-3 py-1 rounded-full bg-white mb-6 inline-block transform rotate-[-2deg]">
            High ROI Investment
         </span>
         <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] text-black">
            Price vs. <span className="text-green-600 bg-green-100 px-2 transform -skew-x-6 inline-block">Value</span>
         </h2>
         <p className="font-hand text-xl md:text-2xl mt-8 text-gray-600 rotate-1 max-w-lg mx-auto">
            "Expensive? Only if it doesn't make you money. <br/>
            <span className="underline decoration-wavy decoration-red-500">Our sites pay for themselves in weeks.</span>"
         </p>
      </div>

      {/* --- PRICING GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20 items-start">
         
         {plans.map((plan, i) => (
           <div 
             key={i}
             className={`pricing-card relative flex flex-col p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-2 transition-all duration-300 opacity-0 -translate-y-24 ${plan.color} ${i === 1 ? 'z-30 scale-105 md:-mt-4' : 'z-20'}`}
           >
              {/* TAPE EFFECT */}
              <Tape className="-top-4 left-1/2 -translate-x-1/2" rotation={plan.tape} />

              {/* POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute -right-6 top-10 rotate-45 bg-red-500 text-white font-black text-xs py-1 px-8 shadow-md border border-black z-40">
                   MOST POPULAR
                </div>
              )}

              {/* HEADER */}
              <div className="text-center mb-8 border-b-2 border-current pb-6 border-dashed">
                 <h3 className="font-headline font-black text-3xl uppercase mb-2">{plan.name}</h3>
                 <div className="flex items-center justify-center gap-1">
                    <span className="font-hand text-2xl opacity-60">$</span>
                    <span className="font-black text-6xl tracking-tighter">{plan.price}</span>
                 </div>
                 <p className="font-mono text-xs mt-4 opacity-70 leading-relaxed px-4">
                    {plan.desc}
                 </p>
                 
                 {/* ROI STAMP */}
                 <div className="mt-6 inline-block transform rotate-[-3deg] border-2 border-current px-3 py-1 rounded opacity-80">
                    <span className="font-hand font-bold text-xs flex items-center gap-2">
                       <Info size={14}/> {plan.roi}
                    </span>
                 </div>
              </div>

              {/* FEATURES LIST (The Checklist) */}
              <div className="flex-grow space-y-4 mb-10">
                 {features.map((feature, idx) => {
                    const included = plan.includes.includes(idx);
                    return (
                       <div key={idx} className={`flex items-start gap-3 text-sm ${included ? 'opacity-100 font-bold' : 'opacity-40 line-through'}`}>
                          <div className="shrink-0 w-6 mt-[-2px]">
                             {included ? <ScribbleCheck /> : <ScribbleX />}
                          </div>
                          <span className={included ? '' : 'decoration-2 decoration-red-400'}>
                             {feature}
                          </span>
                       </div>
                    );
                 })}
              </div>

              {/* CTA BUTTON */}
              <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank" className="mt-auto">
                 <button className={`w-full py-4 border-2 border-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group ${plan.name === 'The Empire' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    Start Project 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </Link>
              
              {/* Limited Spots Note */}
              <div className="text-center mt-3">
                 <span className="font-hand text-[10px] opacity-60">
                    Only 2 spots left for this plan
                 </span>
              </div>

           </div>
         ))}

      </div>

      {/* --- FINAL GUARANTEE --- */}
      <div className="max-w-2xl mx-auto text-center mt-24 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-black/10 -rotate-2"></div>
         <p className="font-hand text-xl bg-white relative z-10 inline-block px-4 rotate-2 border-2 border-black shadow-sm p-4">
            "If our code breaks, we fix it for free.  <span className="text-red-600 font-bold">No expiration date</span>"
         </p>
      </div>

    </section>
  );
}