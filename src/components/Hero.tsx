"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const videos = [
  "/new tensopix/TensorPix - Contemporary_house_architectural_202607151334_202607151339-ezremove.mp4",
  "/new tensopix/TensorPix - Video Project 8-ezremove.mp4",
  "/new tensopix/TensorPix - gemini_generated_video_1552f757-ezremove.mp4",
  "/new tensopix/TensorPix - Video Project 3-ezremove.mp4",
  "/new tensopix/TensorPix - gemini_generated_video_59f4f080-ezremove (1).mp4"
];

const heroTexts = [
  "Be Creative",
  "Be Different",
  "Be Sustainable",
  "Be Inspired",
  "Be Bold"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const videoRefABg = useRef<HTMLVideoElement>(null);
  const videoRefBBg = useRef<HTMLVideoElement>(null);

  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial load
  useEffect(() => {
    if (videoRefA.current) {
      videoRefA.current.src = videos[0];
      videoRefA.current.load();
      videoRefA.current.play().catch(err => console.log("Init play A error:", err));
    }
    if (videoRefB.current) {
      videoRefB.current.src = videos[1];
      videoRefB.current.load();
      videoRefB.current.pause();
    }
    
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const transitionToVideo = (nextIndex: number) => {
    if (nextIndex === currentVideoIndex) return;

    setCurrentVideoIndex(nextIndex);

    if (activePlayer === 'A') {
      const videoB = videoRefB.current;
      if (videoB) {
        if (videoB.src !== videos[nextIndex] && !videoB.src.endsWith(encodeURI(videos[nextIndex]))) {
          videoB.src = videos[nextIndex];
          videoB.load();
        }
        videoB.play().then(() => {
          setActivePlayer('B');
          if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
          transitionTimeoutRef.current = setTimeout(() => {
            const videoA = videoRefA.current;
            if (videoA) {
              videoA.pause();
              const nextPreloadIndex = (nextIndex + 1) % videos.length;
              videoA.src = videos[nextPreloadIndex];
              videoA.load();
            }
          }, 1000);
        }).catch(err => {
          console.log("Error transitioning to B:", err);
          setActivePlayer('B');
        });
      }
    } else {
      const videoA = videoRefA.current;
      if (videoA) {
        if (videoA.src !== videos[nextIndex] && !videoA.src.endsWith(encodeURI(videos[nextIndex]))) {
          videoA.src = videos[nextIndex];
          videoA.load();
        }
        videoA.play().then(() => {
          setActivePlayer('A');
          if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
          transitionTimeoutRef.current = setTimeout(() => {
            const videoB = videoRefB.current;
            if (videoB) {
              videoB.pause();
              const nextPreloadIndex = (nextIndex + 1) % videos.length;
              videoB.src = videos[nextPreloadIndex];
              videoB.load();
            }
          }, 1000);
        }).catch(err => {
          console.log("Error transitioning to A:", err);
          setActivePlayer('A');
        });
      }
    }
  };

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    transitionToVideo(nextIndex);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#F7F5F2]"
    >
      {/* Full-Screen Blurred Video Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-transparent">
          <video
            ref={videoRefA}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            onEnded={handleVideoEnded}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              activePlayer === 'A' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
          <video
            ref={videoRefB}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            onEnded={handleVideoEnded}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              activePlayer === 'B' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
          
          {/* Blueprint Overlay Effect */}
          <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-[0.06] pointer-events-none" />
          
          {/* Technical Annotations Overlay */}
          <div className="absolute inset-0 pointer-events-none m-4 md:m-8 hidden md:block">
            <div className="absolute top-32 right-12 font-mono text-[10px] text-[#111111]/30 tracking-widest">
              SEC. A-A&apos;
            </div>
            <div className="absolute bottom-12 right-12 font-mono text-[10px] text-[#111111]/30 tracking-widest flex items-center gap-2">
              <ArrowDownRight size={12} />
              ELEVATION 01
            </div>
            <div className="absolute top-1/2 right-4 w-[1px] h-32 bg-[#111111]/10" />
            <div className="absolute top-1/2 right-4 w-4 h-[1px] bg-[#111111]/10" />
            <div className="absolute top-1/2 right-4 translate-y-32 w-4 h-[1px] bg-[#111111]/10" />
            <div className="absolute top-1/2 right-10 translate-y-16 font-mono text-[10px] text-[#111111]/30 tracking-widest -rotate-90">
              3400MM
            </div>
          </div>
        </div>
      </motion.div>
 
      {/* Main Content Area */}
      <div className="absolute inset-0 w-full z-10 flex flex-col md:flex-row justify-between items-end px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-32 md:pt-0 pb-16 sm:pb-24 md:pb-28 lg:pb-32 pointer-events-none gap-4 md:gap-8">
        
        {/* Left Side: Static Text */}
        <div className="pointer-events-auto flex flex-col items-start text-left w-full md:w-auto">
          <h2 className="font-serif text-[2.5rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[4.5rem] text-white tracking-tight font-light mb-6 sm:mb-8 md:mb-0">
            Design your way<br />of being
          </h2>
        </div>

        {/* Right Side: Dynamic Text Above CTA Buttons */}
        <div className="pointer-events-auto flex flex-col justify-end items-start w-full md:w-auto mt-2 md:mt-0">
          
          <div className="w-full flex items-end justify-start overflow-hidden mb-3 sm:mb-4">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentVideoIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-light whitespace-nowrap"
              >
                {heroTexts[currentVideoIndex]}
              </motion.h3>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="bg-[#111111] text-[#F7F5F2] font-sans text-xs sm:text-sm px-6 py-3.5 min-h-[44px] flex items-center justify-between sm:justify-start gap-3 hover:bg-black transition-colors duration-300">
              View Projects <ArrowDownRight size={14} className="-rotate-90" />
            </button>
            <button className="bg-white text-[#111111] font-sans text-xs sm:text-sm px-6 py-3.5 min-h-[44px] flex items-center justify-between sm:justify-start gap-3 hover:bg-gray-50 transition-colors duration-300 shadow-sm border border-gray-100">
              Start Your Project <ArrowDownRight size={14} className="-rotate-90 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
        
        {/* Bottom Left Blueprint Overlay */}
        <div className="absolute bottom-8 left-16 md:left-24 lg:left-40 opacity-[0.04] w-64 h-64 pointer-events-none hidden sm:block">
           <img src="/blueprint-grid.svg" alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom Center Pagination & Floating Bars */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-20 pointer-events-auto">
          {videos.map((_, index) => {
            const isActive = index === currentVideoIndex;
            return (
              <button
                key={index}
                onClick={() => transitionToVideo(index)}
                className="group flex flex-col items-start gap-1 cursor-pointer focus:outline-none focus-visible:outline-none bg-transparent border-none p-0 transition-all duration-200 active:scale-95 select-none [-webkit-tap-highlight-color:transparent]"
                aria-label={`Go to video ${index + 1}`}
              >
                {/* Number Label */}
                <span className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                  isActive ? "text-white font-bold" : "text-white/40 group-hover:text-white/80"
                }`}>
                  {`0${index + 1}`}
                </span>
                
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
