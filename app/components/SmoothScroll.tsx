"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // Slightly higher than 0.07 prevents that "laggy" feeling
        wheelMultiplier: 1, // Keep this at 1 to prevent weird mousewheel acceleration
        smoothWheel: true,
        infinite: false,
        syncTouch: true, // Add this to make mobile scrolling feel native and sync with GSAP
      }}
    >
      {/* If you are on React 19, you might still need 'as any', but for React 18 this is cleaner */}
      {children as any}
    </ReactLenis>
  );
}