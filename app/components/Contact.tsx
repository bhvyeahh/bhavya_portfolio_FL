"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Paperclip, Eraser, PenTool } from "lucide-react";
import { submitProjectPermit } from "@/app/actions";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- ASSETS ---
const CoffeeRing = ({ className }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-20 mix-blend-multiply ${className}`} width="200" height="200" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="#5a3a2a" strokeWidth="8" fill="none" strokeDasharray="80, 40" />
    <circle cx="50" cy="50" r="35" stroke="#5a3a2a" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);

const Tape = ({ className, rotation }: { className?: string, rotation?: string }) => (
  <div className={`absolute w-32 h-8 bg-blue-600/20 shadow-sm border-l border-r border-dashed border-white/40 backdrop-blur-sm z-30 ${className} ${rotation}`}
       style={{ clipPath: "polygon(2% 0, 98% 5%, 100% 95%, 0% 100%)" }}>
  </div>
);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // --- FIX: HANDLE DATE HYDRATION ---
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Only set the date once we are on the client
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // --- FORM HANDLER ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await submitProjectPermit(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      gsap.fromTo(".success-stamp", 
        { scale: 3, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: -5, duration: 0.5, ease: "bounce.out" }
      );
    } else {
      alert("Permit Denied (Error sending email). Please try again.");
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    tl.from(".contact-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    tl.from(".clipboard", {
      y: 200,
      opacity: 0,
      rotate: -5,
      duration: 1,
      ease: "back.out(1.2)"
    }, "-=0.4");

    tl.from(".urgent-stamp", {
      scale: 3,
      opacity: 0,
      rotate: 45,
      duration: 0.4,
      ease: "power4.in"
    }, "-=0.2");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 overflow-hidden min-h-screen flex flex-col items-center">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-0">
          <div className="absolute top-20 left-10 w-64 h-[1px] bg-gray-300 rotate-[-15deg]"></div>
          <div className="absolute top-40 right-20 w-96 h-[1px] bg-gray-300 rotate-[5deg]"></div>
      </div>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10 contact-header">
         <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] text-black mix-blend-multiply">
            Break <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-black">Ground</span>.
         </h2>
         <p className="font-hand text-xl md:text-2xl mt-8 text-gray-600 rotate-1 max-w-lg mx-auto bg-white border border-black p-2 shadow-[4px_4px_0px_#000]">
            Ready to demolish the competition? <br/> Fill out the permit below.
         </p>
      </div>

      {/* THE FORM */}
      <div className="clipboard relative w-full max-w-2xl bg-[#f8f8f8] border-2 border-black p-8 md:p-12 shadow-[15px_15px_0px_rgba(0,0,0,0.8)] rotate-[-1deg] z-20">
         
         <Tape className="-top-4 left-1/2 -translate-x-1/2" rotation="rotate-[-2deg]" />
         <CoffeeRing className="-bottom-10 -right-10 z-0" />

         {!isSuccess && (
             <div className="urgent-stamp absolute -top-6 -right-6 md:-right-10 w-32 h-32 border-4 border-red-600 rounded-full flex items-center justify-center rotate-12 opacity-80 z-30 bg-white/50 backdrop-blur-sm pointer-events-none">
                <span className="font-black text-red-600 text-xl uppercase text-center leading-none">
                   High<br/>Priority
                </span>
             </div>
         )}

         {isSuccess && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <div className="success-stamp border-8 border-green-600 text-green-600 p-8 rotate-[-5deg] rounded-lg bg-white shadow-2xl text-center">
                    <span className="block font-black text-5xl md:text-6xl uppercase tracking-tighter mb-2">
                        PERMIT<br/>GRANTED
                    </span>
                    <span className="font-mono text-sm bg-green-600 text-white px-2 py-1">
                        Application ID: #{Math.floor(Math.random() * 9000) + 1000}
                    </span>
                    <p className="font-hand text-black mt-4 text-lg">
                        We'll be in touch within 24hrs!
                    </p>
                </div>
            </div>
         )}

         <div className="absolute -left-4 top-20 z-30 hidden md:block">
            <Paperclip className="w-12 h-12 text-gray-400 rotate-[-45deg] absolute -top-4 -right-2" />
            <div className="bg-yellow-200 p-4 w-40 shadow-sm text-xs font-hand rotate-[-5deg] text-black">
               <span className="font-bold block mb-1">NOTE:</span>
               Current lead time is 3 weeks. Book ASAP.
            </div>
         </div>

         <div className={`relative z-10 transition-opacity duration-500 ${isSuccess ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
            
            <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
               <div>
                  <h3 className="font-headline font-black text-3xl uppercase">Work Order</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Ref: 2024-WEB-BUILD</p>
               </div>
               <div className="font-hand text-gray-400 text-sm">
                  {/* FIX APPLIED HERE: Using state variable instead of direct Date() call */}
                  Date: {currentDate}
               </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 font-hand text-lg md:text-xl">
               
               <div className="group relative">
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1 group-focus-within:text-blue-600">
                     Project Owner / Name
                  </label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="e.g. John Builder" 
                    className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 transition-colors placeholder:text-gray-300"
                  />
                  <PenTool className="absolute right-0 bottom-2 w-4 h-4 text-gray-300 opacity-0 group-focus-within:opacity-100 transition-opacity" />
               </div>

               <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-3">
                     Project Type (Check One)
                  </label>
                  <div className="flex flex-wrap gap-4 text-base">
                     {["Custom Builder", "Showroom", "Outdoor/Pool", "Other"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                           <input 
                                type="radio" 
                                name="type"
                                value={type}
                                className="accent-black w-5 h-5" 
                                defaultChecked={type === "Custom Builder"}
                           />
                           <span className="group-hover:underline decoration-wavy decoration-blue-500">{type}</span>
                        </label>
                     ))}
                  </div>
               </div>

               <div className="group">
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1 group-focus-within:text-blue-600">
                     Estimated Budget
                  </label>
                  <select 
                    name="budget"
                    className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 transition-colors cursor-pointer appearance-none"
                  >
                     <option value="1k-3k">$899(The Sketch)</option>
                     <option value="3k-5k">$1199 (The Build)</option>
                     <option value="5k+">$1499 (The Empire)</option>
                  </select>
               </div>

               <div className="group">
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1 group-focus-within:text-blue-600">
                     Project Specs / Notes
                  </label>
                  <textarea 
                    name="specs"
                    rows={3} 
                    placeholder="Tell me about the project..." 
                    className="w-full bg-transparent border-2 border-dashed border-gray-300 focus:border-blue-600 outline-none p-4 rounded-sm transition-colors placeholder:text-gray-300 resize-none"
                  ></textarea>
               </div>

               <div className="pt-6 flex items-center justify-between gap-4">
                  <div className="hidden md:block font-mono text-[10px] text-gray-400 max-w-[150px] leading-tight">
                     *By clicking, you agree to build something awesome.
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group bg-black text-white px-8 py-4 font-headline font-black uppercase text-xl tracking-wider shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isSubmitting ? (
                        <span className="flex items-center gap-2">Processing... <Eraser className="animate-spin" size={18}/></span>
                     ) : (
                        <>
                           Authorize Build <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                  </button>
               </div>

            </form>
         </div>
      </div>

    </section>
  );
}