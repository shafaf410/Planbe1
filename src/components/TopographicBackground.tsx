"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TopographicBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#FAFAFA]">
      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-[130%] h-[130%] absolute top-[-15%] left-[-15%] opacity-[0.35]"
        initial={{ x: "0%", y: "0%", scale: 1 }}
        animate={{
          x: ["0%", "-4%", "0%", "4%", "0%"],
          y: ["0%", "4%", "0%", "-4%", "0%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25, // Noticeable continuous floating motion
          ease: "linear", // Linear keeps it constantly moving without pausing
          repeat: Infinity,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft, warm architectural gray/terracotta blend */}
        <g stroke="#8B6B5D" strokeWidth="1.5" fill="none"> {/* Slightly darker terracotta and slightly thicker lines for visibility */}
          
          {/* Main Flowing Topographic Curves */}
          <path d="M-200,200 C300,300 600,-50 1000,350 C1400,750 1600,550 1800,950" />
          <path d="M-200,250 C300,350 600,0 1000,400 C1400,800 1600,600 1800,1000" />
          <path d="M-200,300 C300,400 600,50 1000,450 C1400,850 1600,650 1800,1050" />
          <path d="M-200,350 C300,450 600,100 1000,500 C1400,900 1600,700 1800,1100" />
          <path d="M-200,400 C300,500 600,150 1000,550 C1400,950 1600,750 1800,1150" />
          <path d="M-200,450 C300,550 600,200 1000,600 C1400,1000 1600,800 1800,1200" />
          
          {/* Subtle dashed guide line embedded within main flow */}
          <path d="M-200,275 C300,375 600,25 1000,425 C1400,825 1600,625 1800,1025" strokeDasharray="5,5" strokeOpacity="0.8" />
          
          {/* Secondary Cross-Flow Group */}
          <path d="M-200,800 C400,700 800,1000 1200,600 C1600,200 1800,400 2000,-50" />
          <path d="M-200,850 C400,750 800,1050 1200,650 C1600,250 1800,450 2000,0" />
          <path d="M-200,900 C400,800 800,1100 1200,700 C1600,300 1800,500 2000,50" />
          <path d="M-200,950 C400,850 800,1150 1200,750 C1600,350 1800,550 2000,100" />
          <path d="M-200,1000 C400,900 800,1200 1200,800 C1600,400 1800,600 2000,150" />
          
          {/* Long dashed line emphasizing architectural drafting */}
          <path d="M-200,875 C400,775 800,1075 1200,675 C1600,275 1800,475 2000,25" strokeDasharray="15,10" strokeOpacity="0.6" />
          
          {/* High Elevation Loop */}
          <path d="M1000,-100 C1200,100 1500,50 1700,250 C1900,450 2000,300 2200,600" />
          <path d="M1050,-100 C1250,150 1550,100 1750,300 C1950,500 2050,350 2250,650" />
          <path d="M1100,-100 C1300,200 1600,150 1800,350 C2000,550 2100,400 2300,700" />
        </g>
      </motion.svg>
      
      {/* Soft gradient wash lowered so it doesn't completely hide the lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#FAFAFA_100%)] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-transparent to-[#FAFAFA] opacity-30" />
    </div>
  );
}
