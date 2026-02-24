"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ContactCTA from "./components/ContactCTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import PricingBanner from "./components/PricingBanner";
import FeaturedWorks from "./components/ProjectCard";
// import ServiceList from "./components/ServiceList";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhoAmI from "./components/WhoAmI";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Lock the scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll after the preloader is gone
        document.body.style.overflow = "";
      }
    });

    // 2. The Premium Curtain Reveal
    tl.to(preloaderRef.current, {
      yPercent: -100, // Slides the entire black screen up and out of the way
      duration: 1,
      ease: "power4.inOut",
      delay: 0.5, // Gives Next.js a half-second to paint everything perfectly underneath
    });

  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="relative w-full min-h-screen bg-brand-dark selection:bg-brand-green selection:text-black">
      
      {/* --- THE PRELOADER OVERLAY --- */}
      <div 
        ref={preloaderRef} 
        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-white font-sans font-bold text-lg tracking-tight">Layoutory.</span>
          {/* Simple animated loading line */}
          <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-white origin-left animate-[pulse_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
      {/* ----------------------------- */}

      <Hero />
      <Services />
      <WhoAmI />
      <FeaturedWorks />
      {/* <ServiceList /> */}
      <Testimonials />
      <Pricing  />
      <PricingBanner  />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}