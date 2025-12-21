"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "WHAT DO I NEED TO GET STARTED?",
    answer:
      "To get started, simply share your project goals, any existing brand assets (logo, fonts), and examples of websites you like. I'll guide you through a simple onboarding process to extract your vision.",
  },
  {
    question: "DO YOU PROVIDE HOSTING & DOMAIN SETUP?",
    answer:
      "Yes. I handle the entire technical setup. I will recommend the best hosting providers for your needs (like Vercel, AWS, or Hostinger) and configure your domain so your site is live and secure without you touching a line of code.",
  },
  {
    question: "WILL MY WEBSITE BE MOBILE FRIENDLY?",
    answer:
      "Absolutely. Every website I build is 'Mobile-First'. I ensure your site looks and performs perfectly on all devices—from large desktop monitors to tablets and smartphones.",
  },
  {
    question: "WHAT IF I NEED CHANGES AFTER THE PROJECT IS DONE?",
    answer:
      "I provide 1-2 week of complimentary support after launch to fix any bugs. For future updates, we can discuss a maintenance retainer or I can teach you how to make simple text/image edits yourself.",
  },
  {
    question: "HOW LONG DOES A TYPICAL PROJECT TAKE?",
    answer:
      "A standard 5-page business website typically takes 1-2 weeks from start to finish, depending on how quickly you can provide feedback. E-commerce sites may take 3-4 weeks depending on complexity.",
  },
  {
    question: "DO I OWN THE CODE AND DESIGN?",
    answer:
      "Yes! Once the final payment is made, you have 100% ownership of the website, the code, and all design assets. No hidden lock-in fees.",
  },
  {
    question: "WILL THERE BE INVOICES AND AGREEMENT?",
    answer:
      "Absolutely. We sign a transparent Service Agreement to lock in the scope and price before starting. You also receive formal invoices for all payments, suitable for your business tax and accounting records.",
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