"use client";

import Navigation from "@/components/Navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ArchitecturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // Calculate the wipe effect for the image reveal
  // 0% at start of scroll, 100% at end of scroll
  const clipPath = useTransform(scrollYProgress, [0, 1], [
    "polygon(0 0, 0% 0, 0% 100%, 0 100%)", 
    "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  ]);

  return (
    <main className="bg-[#F7F5F2] min-h-screen text-[#111111]">
      <Navigation />
      
      {/* Introduction Header */}
      <section className="pt-48 pb-24 px-6 md:px-24 flex flex-col justify-center items-center text-center">
        <h1 className="font-serif text-5xl md:text-[6rem] leading-none tracking-tight uppercase">
          Architecture
        </h1>
        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#6A6A6A] mt-8">
          From mind to matter
        </p>
      </section>

      {/* Timeline Drawing Transformation Section */}
      <section ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#E8E6E1]">
          
          <div className="absolute top-24 left-12 z-20 hidden md:block">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#111111]">The Process</h2>
            <p className="font-serif text-2xl mt-4 max-w-xs leading-snug">
              Every masterpiece begins with a single, deliberate line.
            </p>
          </div>

          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] mx-6 shadow-2xl overflow-hidden">
            
            {/* Base Image: Simulated "Sketch" using CSS filters */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/photo_2026-06-15_22-34-14.jpg" 
                alt="Architectural Sketch" 
                className="w-full h-full object-cover grayscale contrast-150 brightness-110 sepia-[0.2]"
              />
              {/* Pencil grain overlay */}
              <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-20 mix-blend-multiply" />
            </div>

            {/* Reveal Image: Photorealistic Render */}
            <motion.div 
              style={{ clipPath }}
              className="absolute inset-0 z-10 border-r-2 border-white/50"
            >
              <img 
                src="/photo_2026-06-15_22-34-14.jpg" 
                alt="Photorealistic Render" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Drag Line Indicator */}
            <motion.div 
              style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              className="absolute top-0 bottom-0 w-[1px] bg-white z-20 drop-shadow-lg flex items-center justify-center -translate-x-1/2"
            >
              <div className="w-8 h-8 rounded-full border border-white bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 text-center w-full z-20">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#111111]/60">
              Scroll to reveal reality
            </p>
          </div>

        </div>
      </section>
      
      {/* Extra space below to breathe */}
      <div className="h-screen bg-[#F7F5F2]" />
    </main>
  );
}
