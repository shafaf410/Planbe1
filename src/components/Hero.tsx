"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

const videos = [
  "https://res.cloudinary.com/ntliyhwb/video/upload/v1785004665/TensorPix_-_Contemporary_house_architectural_202607151334_202607151339-ezremove_o7zkhw.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/v1785004912/TensorPix_-_Video_Project_3-ezremove_mnjmnw.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/v1785005827/TensorPix_-_gemini_generated_video_1552f757-ezremove_rophuf.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/v1785005078/TensorPix_-_Video_Project_8-ezremove_uyq2ym.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/v1785006719/TensorPix_-_gemini_generated_video_59f4f080-ezremove_1_qsfhjp.mp4"
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingVideoIndex = useRef<number | null>(null);

  // Initial load
  useEffect(() => {
    // Attempt to auto-play the first video on mount
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(err => console.log("Init play error:", err));
    }
    
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const transitionToVideo = (nextIndex: number) => {
    if (nextIndex === currentVideoIndex) return;
    
    pendingVideoIndex.current = nextIndex;
    const oldIndex = currentVideoIndex;
    const nextVideo = videoRefs.current[nextIndex];
    
    if (nextVideo) {
      // If the video already has enough data to play, transition immediately
      if (nextVideo.readyState >= 3) {
        executeTransition(nextIndex, oldIndex, nextVideo);
      } else {
        // Otherwise, wait for it to buffer
        nextVideo.load();
        
        const handleCanPlay = () => {
          nextVideo.removeEventListener("canplay", handleCanPlay);
          // Only execute if the user hasn't rapidly clicked another slide while we were waiting
          if (pendingVideoIndex.current !== nextIndex) return;
          
          executeTransition(nextIndex, oldIndex, nextVideo);
        };
        
        nextVideo.addEventListener("canplay", handleCanPlay);
      }
    }
  };

  const executeTransition = (nextIndex: number, oldIndex: number, nextVideo: HTMLVideoElement) => {
    nextVideo.currentTime = 0;
    nextVideo.play().catch(e => console.log("Transition play error:", e));
    
    setCurrentVideoIndex(nextIndex);

    // Preload the upcoming video metadata if needed
    const nextPreloadIndex = (nextIndex + 1) % videos.length;
    const nextPreloadVideo = videoRefs.current[nextPreloadIndex];
    if (nextPreloadVideo && nextPreloadVideo.readyState === 0) {
      nextPreloadVideo.load();
    }

    // Clear previous timeout and set new one to pause old video after crossfade
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      const oldVideo = videoRefs.current[oldIndex];
      if (oldVideo) {
        oldVideo.pause();
      }
    }, 1000);
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
          {videos.map((src, index) => (
            <video
              key={src}
              ref={(el) => { videoRefs.current[index] = el; }}
              src={src}
              muted
              playsInline
              disablePictureInPicture
              preload={index === 0 ? "auto" : "none"}
              onEnded={handleVideoEnded}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                currentVideoIndex === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            />
          ))}
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
          

          
          {/* Technical Annotations Overlay */}
          <div className="absolute inset-0 pointer-events-none m-4 md:m-8 hidden md:block z-20">
            <div className="absolute top-32 right-12 font-mono text-[10px] text-white/50 tracking-widest">
              SEC. A-A&apos;
            </div>
            <div className="absolute bottom-12 right-12 font-mono text-[10px] text-white/50 tracking-widest flex items-center gap-2">
              <ArrowDownRight size={12} />
              ELEVATION 01
            </div>
            <div className="absolute top-1/2 right-4 w-[1px] h-32 bg-white/20" />
            <div className="absolute top-1/2 right-4 w-4 h-[1px] bg-white/20" />
            <div className="absolute top-1/2 right-4 translate-y-32 w-4 h-[1px] bg-white/20" />
            <div className="absolute top-1/2 right-10 translate-y-16 font-mono text-[10px] text-white/50 tracking-widest -rotate-90">
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
