"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AntiGravityBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 4 concentric rings for better performance instead of 8
  const rings = Array.from({ length: 4 });

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-transparent">
      {/* Central perspective container for floating illusion */}
      <div className="absolute inset-0 flex items-center justify-center">
        {rings.map((_, i) => {
          const delay = i * -2.5; 
          const duration = 15 + (i % 2); // Slower, more performant duration
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full border-[0.5px] border-[#999999]/30 transform-gpu"
              style={{
                width: 200,
                height: 200,
              }}
              initial={{
                scale: 0.1,
                opacity: 0,
              }}
              animate={{
                scale: [0.1, 4], // Expanding, not reverting back in keyframes to avoid complex path
                opacity: [0, 0.05, 0], 
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear", // linear is much easier to compute
                delay: delay,
              }}
            />
          );
        })}

        {/* Outer ambient energy field */}
        <motion.div
          className="absolute rounded-full w-[40vw] h-[40vw] opacity-[0.03] transform-gpu"
          style={{
            background: "radial-gradient(circle, #EAEAEA 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
