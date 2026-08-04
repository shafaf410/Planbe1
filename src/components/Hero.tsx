"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const videos = [
  { mp4: "/videos/slide1.mp4", webm: "/videos/slide1.webm" },
  { mp4: "/videos/slide2.mp4", webm: "/videos/slide2.webm" },
  { mp4: "/videos/slide3.mp4", webm: "/videos/slide3.webm" },
  { mp4: "/videos/slide4.mp4", webm: "/videos/slide4.webm" },
];

const heroTexts = [
  "Be Creative",
  "Be Different",
  "Be Sustainable",
  "Be Inspired"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logicalIndex, setLogicalIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Slideshow auto-rotation timer (resets when logicalIndex changes)
  useEffect(() => {
    const timer = setInterval(() => {
      setLogicalIndex((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [logicalIndex]);

  const transitionToSlide = (nextIndex: number) => {
    setLogicalIndex(nextIndex);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#111111]"
    >
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={logicalIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            muted
            autoPlay
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videos[logicalIndex].webm} type="video/webm" />
            <source src={videos[logicalIndex].mp4} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
      </div>
 
      {/* Main Content Area */}
      <div className="absolute inset-0 w-full z-10 flex flex-col md:flex-row justify-between items-end px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-32 md:pt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-16 pointer-events-none gap-4 md:gap-8">
        
        {/* Left Side: Static Text */}
        <div className="pointer-events-auto flex flex-col items-start text-left w-full md:w-auto">
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[4.5rem] text-white tracking-tight font-light mb-6 sm:mb-8 md:mb-0">
            Design your way<br />of being
          </h2>
        </div>

        {/* Right Side: Dynamic Text */}
        <div className="pointer-events-auto flex flex-col justify-end items-start md:items-end w-full md:w-auto mt-2 md:mt-0">
          <div className="w-full flex items-end justify-start md:justify-end overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={logicalIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-light whitespace-nowrap"
              >
                {heroTexts[logicalIndex]}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>
      </div>
        

      
      {/* Bottom Center Pagination & Floating Bars */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-20 pointer-events-auto">
        {heroTexts.map((_, index) => {
          const isActive = index === logicalIndex;
          return (
            <button
              key={index}
              onClick={() => transitionToSlide(index)}
              className="group flex flex-col items-start gap-1 cursor-pointer focus:outline-none focus-visible:outline-none bg-transparent border-none p-0 transition-all duration-200 active:scale-95 select-none [-webkit-tap-highlight-color:transparent]"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Horizontal Bar */}
              <div className={`w-10 sm:w-20 h-[3px] rounded-full transition-colors duration-300 ${
                isActive ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "bg-white/30"
              }`} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
