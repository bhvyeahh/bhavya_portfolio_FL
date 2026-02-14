"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        // Lower lerp = smoother/slower follow. 0.05 - 0.08 is the sweet spot for "buttery".
        lerp: 0.07, 
        // Duration of the scroll animation in seconds.
        duration: 1.8, 
        // Higher touch multiplier makes mobile/trackpad feel more responsive.
        touchMultiplier: 1.5,
        wheelMultiplier: 1.1,
        infinite: false,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}