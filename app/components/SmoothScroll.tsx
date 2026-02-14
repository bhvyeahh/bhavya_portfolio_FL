"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.07, 
        duration: 1.8, 
        touchMultiplier: 1.5,
        wheelMultiplier: 1.1,
        infinite: false,
        smoothWheel: true,
      }}
    >
      {/* Cast to any to fix React 18/19 Type Mismatch */}
      {children as any}
    </ReactLenis>
  );
}