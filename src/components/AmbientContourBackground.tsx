"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientContourBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 6 concentric contour rings for a continuous flow, optimized for mobile
  const rings = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
      {/* Sticky container ensures the background stays visible while scrolling through the parent */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Soft center exclusion zone so it doesn't interfere heavily with central text */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,var(--bg-color)_5%,transparent_40%)]" style={{ '--bg-color': '#F7F5F2' } as any} />
        
        {/* Edge feathering to blend into the surrounding layout smoothly */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,#F7F5F2_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center blur-[0.5px]">
          {rings.map((_, i) => {
            const delay = i * -1.5; 
            // 18 second loop for a very slow breathing animation
            const duration = 18; 
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full border-[0.5px] border-[#111111] transform-gpu"
                style={{
                  width: 50,
                  height: 50,
                }}
                initial={{
                  scale: 0.1,
                  opacity: 0,
                }}
                animate={{
                  scale: [0.1, 20], // Expands massively to cover screen
                  opacity: [0, 0.03, 0.06, 0.03, 0], // Peaks at 6% opacity (ultra-thin/light gray feel)
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: delay,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
