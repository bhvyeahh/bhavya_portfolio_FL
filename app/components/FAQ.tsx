"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "WHAT DO I NEED TO GET STARTED?",
    answer: "To get started, simply share your project goals, any existing brand assets (logo, fonts), and examples of websites you like. I'll guide you through a simple onboarding process to extract your vision."
  },
  {
    question: "DO YOU PROVIDE HOSTING & DOMAIN SETUP?",
    answer: "Yes. I handle the entire technical setup. I will recommend the best hosting providers for your needs (like Vercel, AWS, or Hostinger) and configure your domain so your site is live and secure without you touching a line of code."
  },
  {
    question: "WILL MY WEBSITE BE MOBILE FRIENDLY?",
    answer: "Absolutely. Every website I build is 'Mobile-First'. I ensure your site looks and performs perfectly on all devices—from large desktop monitors to tablets and smartphones."
  },
  {
    question: "WHAT IF I NEED CHANGES AFTER THE PROJECT IS DONE?",
    answer: "I provide 1-2 week of complimentary support after launch to fix any bugs. For future updates, we can discuss a maintenance retainer or I can teach you how to make simple text/image edits yourself."
  },
  {
    question: "HOW LONG DOES A TYPICAL PROJECT TAKE?",
    answer: "A standard 5-page business website typically takes 1-2 weeks from start to finish, depending on how quickly you can provide feedback. E-commerce sites may take 3-4 weeks depending on complexity."
  },
  {
    question: "DO I OWN THE CODE AND DESIGN?",
    answer: "Yes! Once the final payment is made, you have 100% ownership of the website, the code, and all design assets. No hidden lock-in fees."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-white/5 overflow-hidden">
      
      {/* --- Header --- */}
      <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-24 z-20 relative">
        <span>//</span>
        <span className="text-white font-bold tracking-widest">FAQ</span>
        <span>//</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-20">
        {/* 'LayoutGroup' ensures all items slide smoothly when one opens */}
        {faqs.map((faq, index) => (
          <motion.div 
            layout 
            key={index} 
            className="border-b border-white/10 last:border-0 overflow-hidden"
          >
            <motion.button
              layout="position"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-8 flex justify-between items-center text-left group transition-colors hover:bg-white/5 px-4 rounded-lg"
            >
              <div className="flex items-baseline gap-8">
                  <span className="font-mono text-xs text-gray-600 group-hover:text-brand-green transition-colors">
                      0{index + 1}
                  </span>
                  <h3 className={`font-display font-bold text-lg md:text-2xl uppercase tracking-tight transition-colors duration-500 ${openIndex === index ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {faq.question}
                  </h3>
              </div>
              
              <div className="relative w-6 h-6 flex items-center justify-center">
                  <motion.div
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0, opacity: openIndex === index ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute"
                  >
                      <Plus className="text-gray-500 group-hover:text-white" size={20} />
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{ rotate: openIndex === index ? 0 : -90, opacity: openIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute"
                  >
                      <Minus className="text-white" size={20} />
                  </motion.div>
              </div>
            </motion.button>

            <AnimatePresence mode="sync">
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  // This ease curve is what makes it "buttery"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }} // Slight delay for the text
                    className="pb-8 pl-12 md:pl-16 pr-4"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-mono">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20 text-gray-500 text-[10px] font-mono uppercase tracking-widest">
         Can't find the answer? <a href="#" className="text-white underline hover:text-brand-green transition-colors">Contact me directly</a>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
    </section>
  );
}