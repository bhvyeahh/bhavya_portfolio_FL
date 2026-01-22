"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowUpRight, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Stagger Entrance
      tl.from(".booking-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      // 2. Card Rotate/Fade In
      tl.from(cardRef.current, {
        x: 100,
        opacity: 0,
        rotateY: 20,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.8");

      // 3. 3D Tilt Effect on Mouse Move for the Card
      const card = cardRef.current;
      if (card) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
          const rotateY = ((x - centerX) / centerX) * 10;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[80vh] bg-[#050505] flex items-center justify-center py-20 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        
        {/* --- LEFT: SALES COPY --- */}
        <div>
          <div className="booking-text flex items-center gap-3 text-brand-green font-mono text-[10px] uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
            <span>Availability: Open for Feb 2026</span>
          </div>
          
          <h2 className="booking-text font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Stop Chasing <br />
            <span className="text-gray-600">Start working.</span>
          </h2>
          
          <p className="booking-text text-gray-400 text-sm md:text-base font-mono leading-relaxed max-w-md mb-10">
            You wash cars. I'll fill your calendar. Let's build a booking system that captures leads, takes deposits, and sends reminders while you sleep.
          </p>

          <div className="booking-text flex flex-col sm:flex-row gap-4">
            {/* Primary CTA: Calendly Link */}
            {/* Replace href with your actual Calendly Link */}
            <Link href="https://calendly.com/bhavyarathore575/30min" target="_blank">
                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                    Book Strategy Call
                    <ArrowUpRight size={16} />
                </span>
                <div className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </button>
            </Link>

            <Link href="mailto:bhavyarathore575@gmail.com">
                <button className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors flex items-center gap-2">
                <Mail size={16} />
                Email Me
                </button>
            </Link>
          </div>
        </div>

        {/* --- RIGHT: 3D INTERACTIVE CARD --- */}
        <div className="flex justify-center lg:justify-end perspective-1000">
          <div
            ref={cardRef}
            className="relative w-full max-w-md aspect-[4/5] bg-[#111] rounded-3xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl hover:border-white/30 transition-colors group cursor-pointer"
          >
            {/* Card Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none rounded-3xl"></div>
            
            {/* Top Row */}
            <div className="flex justify-between items-start z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all duration-500">
                    <Calendar size={24} className="text-white group-hover:text-brand-green transition-colors" />
                </div>
                <div className="px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">15 Min Discovery</span>
                </div>
            </div>

            {/* Middle Content */}
            <div className="z-10 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Free Consultation</h3>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">
                        We'll discuss your current booking process, pain points, and how a custom website can increase your revenue by 30%.
                    </p>
                </div>

                {/* Features List inside card */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                        <Clock size={14} className="text-brand-green" />
                        <span>Analysis of your current site</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                        <Phone size={14} className="text-brand-green" />
                        <span>Live demo of booking engine</span>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="z-10 mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                <div className="flex -space-x-2">
                    {/* Fake Avatars for social proof */}
                    <div className="w-8 h-8 rounded-full border border-black bg-gray-700"></div>
                    <div className="w-8 h-8 rounded-full border border-black bg-gray-600"></div>
                    <div className="w-8 h-8 rounded-full border border-black bg-gray-500 flex items-center justify-center text-[8px] font-bold text-white">+40</div>
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    Clients Booked
                </span>
            </div>

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
}