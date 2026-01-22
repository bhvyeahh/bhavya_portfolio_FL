"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";

// --- UPDATED FAQ DATA FOR DETAILER & CAFE NICHE ---
const faqs = [
  {
    question: "I'M NOT TECH SAVVY. IS THIS HARD TO MANAGE?",
    answer:
      "Not at all. I build the system to run on autopilot. Clients book online, the calendar updates itself, and you get a text notification with the job details. If you can use a smartphone, you can manage this site.",
  },
  {
    question: "CAN I TAKE DEPOSITS TO PREVENT NO-SHOWS?",
    answer:
      "Yes. This is a standard feature I build. We can require a partial deposit (e.g., $30) or full payment upfront via Stripe or Square. This drastically reduces last-minute cancellations and protects your time.",
  },
  {
    question: "DO I HAVE TO PAY MONTHLY FEES FOR BOOKING SOFTWARE?",
    answer:
      "No. Unlike generic apps like Calendly or Vagaro that charge monthly subscriptions, I build a custom booking solution that you own 100%. You avoid those recurring SaaS fees forever.",
  },
  {
    question: "WILL THIS HELP ME RANK ON GOOGLE MAPS?",
    answer:
      "Absolutely. I code your site with 'Local SEO' schemas. This tells Google exactly which cities you serve, helping you appear higher when customers search 'Mobile Detailing near me' or 'Cafe in [City]'.",
  },
  {
    question: "HOW LONG DOES IT TAKE TO LAUNCH?",
    answer:
      "A high-conversion Detailer Landing Page with booking is usually ready in 5-7 days. Larger sites for Cafes or Detail Shops with e-commerce products typically take about 2 weeks.",
  },
  {
    question: "I ALSO OWN A CAFE. CAN YOU DO DIGITAL MENUS?",
    answer:
      "Yes! For my cafe clients, I build fast-loading digital menus linked to QR codes. I can also set up simple online ordering systems for pickup, bypassing expensive delivery app fees.",
  },
  {
    question: "WHAT DO I NEED TO GET STARTED?",
    answer:
      "Just your service list, pricing, and photos of your work (cars or coffee). I handle the technical heavy lifting—from domain setup to writing the sales copy that converts visitors into bookers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);
  
  // Create refs array for the content divs so we can animate height
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleToggle = contextSafe((index: number) => {
    if (openIndex === index) {
      // CLOSING: Animate height to 0
      gsap.to(answerRefs.current[index], {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setOpenIndex(null), // Only update state after animation
      });
    } else {
      // SWITCHING or OPENING
      // If there's an open one, close it first
      if (openIndex !== null) {
        gsap.to(answerRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
      
      setOpenIndex(index);
      // Wait a tick for React to render the new state (if conditionally rendered) 
      // OR since we are just animating height, we trigger it immediately.
      
      // We animate FROM 0 to auto manually since we aren't unmounting with GSAP here for simplicity,
      // but to keep it "Awwwards" style, we animate the height property.
      
      gsap.fromTo(
        answerRefs.current[index],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.75)" }
      );
    }
  });

  // Staggered Entrance on Load
  useGSAP(() => {
    gsap.from(".faq-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-white/5 overflow-hidden">
      {/* --- Header --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-24 z-20 relative">
        <span>//</span>
        <span className="text-white font-bold tracking-widest">FAQ</span>
        <span>//</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-20">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item group border-b border-white/10 last:border-0 relative"
          >
            {/* --- Animated Neon Glow Line (Active State) --- */}
            {/* This creates a line that shoots across when active */}
            <div 
                className={`absolute bottom-0 left-0 h-[1px] bg-brand-green shadow-[0_0_10px_#00ff41] transition-all duration-700 ease-out z-30 ${openIndex === index ? "w-full opacity-100" : "w-0 opacity-0"}`}
            ></div>

            <button
              onClick={() => handleToggle(index)}
              className="w-full py-8 flex justify-between items-center text-left transition-all duration-300 hover:pl-4"
            >
              <div className="flex items-baseline gap-8">
                <span className={`font-mono text-xs transition-colors duration-300 ${openIndex === index ? "text-brand-green" : "text-gray-600 group-hover:text-white"}`}>
                  0{index + 1}
                </span>
                <h3
                  className={`font-display font-bold text-lg md:text-2xl uppercase tracking-tight transition-colors duration-300 ${
                    openIndex === index
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {faq.question}
                </h3>
              </div>

              <div className="relative w-6 h-6 flex items-center justify-center">
                 {/* Icon Rotation handled via CSS classes for performance or simple GSAP logic */}
                 <div className={`absolute transition-all duration-500 ${openIndex === index ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`}>
                    <Plus className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                 </div>
                 <div className={`absolute transition-all duration-500 ${openIndex === index ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
                    <Minus className="text-brand-green" size={20} />
                 </div>
              </div>
            </button>

            {/* Answer Wrapper with ref for GSAP height animation */}
            <div
              ref={(el) => {
                // Assign to refs array without returning anything
                answerRefs.current[index] = el;
              }}
              className="overflow-hidden h-0 opacity-0" // Start hidden
              style={openIndex === 0 && index === 0 ? { height: 'auto', opacity: 1 } : {}} // Hack to show first one initially if desired
            >
              <div className="pb-8 pl-12 md:pl-16 pr-4">
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-mono">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20 text-gray-500 text-[10px] font-mono uppercase tracking-widest">
        Can't find the answer?{" "}
        <a
          href="#"
          className="text-white underline hover:text-brand-green transition-colors"
        >
          Contact me directly
        </a>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}