"use client";

import Navigation from "@/components/Navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function InteriorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Overall scroll progress for the whole page
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Slow parallax for the main images
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <main ref={containerRef} className="bg-[#111111] min-h-[300vh] text-[#F7F5F2] overflow-hidden">
      <Navigation />
      
      {/* Editorial Header */}
      <section className="h-screen flex flex-col justify-end pb-32 px-6 md:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#D9D4CC] mb-8">
            Interior Architecture
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] tracking-tight">
            THE ART OF <br />
            <span className="italic font-light text-[#D9D4CC]">INTIMACY.</span>
          </h1>
        </motion.div>
      </section>

      {/* Large Slow-Moving Imagery Showcase */}
      <section className="relative w-full px-6 md:px-24 py-32 grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* Left Column Image */}
        <div className="relative h-[80vh] w-full overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute -top-[20%] w-full h-[140%]">
            <Image 
              src="/projects/interior_tactile.png" 
              alt="Material detail"
              fill
              className="object-cover object-center scale-110 sepia-[0.3] brightness-75"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute bottom-8 left-8 right-8 mix-blend-difference">
            <h2 className="font-serif text-3xl uppercase tracking-widest text-[#F7F5F2]">Tactile</h2>
            <p className="font-sans text-[10px] uppercase tracking-widest mt-4 opacity-70">Focus on materiality</p>
          </div>
        </div>

        {/* Right Column Image (Offset) */}
        <div className="relative h-[100vh] w-full md:-mt-48 overflow-hidden">
          <motion.div style={{ y: y2 }} className="absolute top-0 w-full h-[120%]">
            <Image 
              src="/projects/interior_light.png" 
              alt="Interior atmosphere"
              fill
              className="object-cover object-center scale-[1.15] brightness-50 contrast-125"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mix-blend-difference w-full">
            <h2 className="font-serif text-5xl lg:text-7xl uppercase tracking-tight text-[#F7F5F2]">Light</h2>
            <p className="font-sans text-[10px] uppercase tracking-widest mt-4 opacity-70">Shaping the invisible</p>
          </div>
        </div>

      </section>

      {/* Typography Overlay Statement */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="text-center z-10 mix-blend-difference px-6"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] max-w-6xl leading-[1.2] tracking-tight">
            "WE SCULPT THE VOID, FILLING IT WITH WARMTH, TEXTURE, AND SILENCE."
          </h2>
        </motion.div>
        
        {/* Deep background element */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) }}
            className="w-full h-full bg-[url('/projects/interior_light.png')] bg-cover bg-center opacity-10"
          />
        </div>
      </section>

    </main>
  );
}
