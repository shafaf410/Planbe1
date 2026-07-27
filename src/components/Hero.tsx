"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

const videos = [
  "https://res.cloudinary.com/ntliyhwb/video/upload/q_auto,f_auto/v1785004665/TensorPix_-_Contemporary_house_architectural_202607151334_202607151339-ezremove_o7zkhw.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/q_auto,f_auto/v1785004912/TensorPix_-_Video_Project_3-ezremove_mnjmnw.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/q_auto,f_auto/v1785005827/TensorPix_-_gemini_generated_video_1552f757-ezremove_rophuf.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/q_auto,f_auto/v1785005078/TensorPix_-_Video_Project_8-ezremove_uyq2ym.mp4",
  "https://res.cloudinary.com/ntliyhwb/video/upload/q_auto,f_auto/v1785006719/TensorPix_-_gemini_generated_video_59f4f080-ezremove_1_qsfhjp.mp4"
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

  // Handle playing/pausing when the index changes
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentVideoIndex) {
        vid.currentTime = 0;
        vid.play().catch(e => console.log("Play error:", e));
      } else {
        vid.pause();
      }
    });
  }, [currentVideoIndex]);

  const transitionToVideo = (nextIndex: number) => {
    if (nextIndex === currentVideoIndex) return;
    setCurrentVideoIndex(nextIndex);
  };

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
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
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={src}
              muted
              playsInline
              disablePictureInPicture
              preload="auto"
              onEnded={handleVideoEnded}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            />
          ))}
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
        </div>
      </motion.div>
 
      {/* Main Content Area */}
      <div className="absolute inset-0 w-full z-10 flex flex-col md:flex-row justify-between items-end px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-32 md:pt-0 pb-16 sm:pb-24 md:pb-28 lg:pb-32 pointer-events-none gap-4 md:gap-8">
        
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
