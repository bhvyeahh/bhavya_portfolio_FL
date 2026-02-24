"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlobalPreloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Lock the scroll while loading
    document.body.style.overflow = "hidden";

    // 2. The Premium Curtain Reveal
    gsap.to(preloaderRef.current, {
      yPercent: -100, // Slides up
      duration: 1,
      ease: "power4.inOut",
      delay: 0.5, // Hydration buffer
      onComplete: () => {
        // Unlock scroll after the preloader is gone
        document.body.style.overflow = "";
        // Completely hide it from the DOM so it doesn't block clicks
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      }
    });
  }, { scope: preloaderRef });

  return (
    <div 
      ref={preloaderRef} 
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-white font-sans font-bold text-lg tracking-tight">Layoutory.</span>
        <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white origin-left animate-[pulse_1s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}