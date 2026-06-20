"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#F7F5F2]"
    >
      {/* Right Video Area with Diagonal Cut */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 origin-right"
      >
        <div 
          className="absolute inset-0 bg-transparent md:[clip-path:polygon(50%_0,100%_0,100%_100%,35%_100%)]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            className="w-full h-full object-cover opacity-95 object-center scale-[1.2]"
          >
            <source src="/projects/TensorPix%20-%20video_2026-06-15_22-34-28.mp4" type="video/mp4" />
          </video>
          
          {/* Mobile Background Wash for Text Readability */}
          <div className="absolute inset-0 bg-[#F7F5F2]/30 md:hidden pointer-events-none" />
          
          {/* Blueprint Overlay Effect */}
          <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-[0.04] pointer-events-none" />
          
          {/* Technical Annotations Overlay */}
          <div className="absolute inset-0 pointer-events-none m-4 md:m-8 hidden md:block md:[clip-path:polygon(50%_0,100%_0,100%_100%,35%_100%)]">
            <div className="absolute top-12 right-12 font-mono text-[10px] text-white/40 tracking-widest">
              SEC. A-A&apos;
            </div>
            <div className="absolute bottom-12 right-12 font-mono text-[10px] text-white/40 tracking-widest flex items-center gap-2">
              <ArrowDownRight size={12} />
              ELEVATION 01
            </div>
            <div className="absolute top-1/2 right-4 w-[1px] h-32 bg-white/20" />
            <div className="absolute top-1/2 right-4 w-4 h-[1px] bg-white/20" />
            <div className="absolute top-1/2 right-4 translate-y-32 w-4 h-[1px] bg-white/20" />
            <div className="absolute top-1/2 right-10 translate-y-16 font-mono text-[10px] text-white/40 tracking-widest -rotate-90">
              3400MM
            </div>
          </div>
        </div>
      </motion.div>

      {/* Left Content Area */}
      <div className="absolute inset-0 w-full md:w-[85%] lg:w-[90%] z-10 flex flex-col justify-start items-start text-left pl-4 sm:pl-6 md:pl-12 lg:pl-16 pr-4 sm:pr-6 md:pr-8 pt-24 sm:pt-[15vh] md:pt-[25vh] pointer-events-none">
        
        <div className="pointer-events-auto w-full max-w-xl lg:max-w-2xl relative flex flex-col items-start">
          <motion.div className="flex flex-col items-start w-full">
            <h1 className="font-serif text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-[4.5rem] md:leading-[1.05] mb-4 sm:mb-6 text-[#111111] tracking-tight font-light text-left">
              Designing<br />
              Spaces Beyond<br />
              Blueprints
            </h1>
            

            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-3 sm:gap-4 w-full sm:max-w-none pointer-events-auto pr-8 sm:pr-0 mt-4 sm:mt-8">
              <button className="bg-[#111111] text-[#F7F5F2] font-sans text-xs sm:text-sm px-6 py-3.5 min-h-[44px] flex items-center justify-between sm:justify-start gap-3 hover:bg-black transition-colors duration-300 w-full sm:w-auto">
                View Projects <ArrowDownRight size={14} className="-rotate-90" />
              </button>
              <button className="bg-white text-[#111111] font-sans text-xs sm:text-sm px-6 py-3.5 min-h-[44px] flex items-center justify-between sm:justify-start gap-3 hover:bg-gray-50 transition-colors duration-300 w-full sm:w-auto shadow-sm border border-gray-100">
                Start Your Project <ArrowDownRight size={14} className="-rotate-90 text-gray-400" />
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Left Blueprint Overlay */}
        <div className="absolute bottom-8 left-16 md:left-24 lg:left-40 opacity-[0.04] w-64 h-64 pointer-events-none">
           <img src="/blueprint-grid.svg" alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom Center Pagination */}
        <div className="absolute bottom-6 sm:bottom-10 left-[45%] md:left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-mono text-[#111111]/80 z-20 pointer-events-none">
          <span className="text-[#111111] font-bold">01</span> / 05
          <div className="w-12 h-[1px] bg-[#111111]/30" />
        </div>
      </div>
    </section>
  );
}
