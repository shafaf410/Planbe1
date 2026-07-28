"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";

const videos = [
  "8X0102y00PkGKj7sQDkctWOiDb00PWWeetzD01JQFkuS4ds8", // Slide 1
  "Y3jwv3W6pJ7dLCK1J00Hlsp3382Pl6NFjME02edf3Yd84", // Slide 2
  "crlILe01v8dbg017P2xa00802XR8aC8U6cTbadtCRENZmSM", // Slide 3
  "o678pKt9uQE4rsjXj00N9m01vEpnK3QIc1pDDNvXX240000", // Slide 4
  "lwFzWGoXtLkUNTcMBT5gK600NY8urdDb02Xh242Rto4So", // Slide 5
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
  
  // State for the ping-pong architecture
  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A');
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);
  const [logicalIndex, setLogicalIndex] = useState(0); // The actual current video index

  // MuxPlayer forwards a ref to an HTMLMediaElement-like interface
  const playerARef = useRef<HTMLVideoElement>(null);
  const playerBRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Initial play
  useEffect(() => {
    if (playerARef.current) {
      playerARef.current.play().catch(e => console.log("Init play error:", e));
    }
  }, []);

  const transitionToSlide = (nextIndex: number) => {
    if (nextIndex === logicalIndex) return;

    const nextPlayer = activePlayer === 'A' ? 'B' : 'A';
    const activeRef = activePlayer === 'A' ? playerARef.current : playerBRef.current;

    // Set the source for the next player to the requested index. 
    // This triggers a React re-render.
    if (nextPlayer === 'A') setIndexA(nextIndex);
    else setIndexB(nextIndex);
    
    setLogicalIndex(nextIndex);
    setActivePlayer(nextPlayer);

    // Delay pausing the old video so the 1-second CSS crossfade completes smoothly
    setTimeout(() => {
      if (activeRef) {
        activeRef.pause();
        activeRef.currentTime = 0;
      }
      
      // Preload the *following* video in the background player
      const preloadIndex = (nextIndex + 1) % videos.length;
      if (nextPlayer === 'A') {
        setIndexB(preloadIndex);
      } else {
        setIndexA(preloadIndex);
      }
    }, 1000);
  };

  // Wait until React has actually updated the video src in the DOM, then force it to play.
  useEffect(() => {
    const activeRef = activePlayer === 'A' ? playerARef.current : playerBRef.current;
    if (activeRef) {
      activeRef.currentTime = 0;
      activeRef.play().catch(e => console.log("Play error:", e));
    }
  }, [activePlayer, logicalIndex]);

  const handleVideoEnded = () => {
    const nextIndex = (logicalIndex + 1) % videos.length;
    transitionToSlide(nextIndex);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#111111]"
    >
      {/* Full-Screen Blurred Video Background */}
      <div 
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-transparent mux-player-container">
          <style dangerouslySetInnerHTML={{__html: `
            .mux-player-container mux-player {
              --media-object-fit: cover;
              --media-object-position: center;
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
            }
          `}} />
          
          {/* Player A */}
          <MuxPlayer
            ref={playerARef as any}
            playbackId={videos[indexA]}
            streamType="on-demand"
            maxResolution="720p"
            muted
            autoPlay={indexA === 0}
            preload="auto"
            onEnded={activePlayer === 'A' ? handleVideoEnded : undefined}
            className={`transition-opacity duration-1000 ${
              activePlayer === 'A' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
          {/* Player B */}
          <MuxPlayer
            ref={playerBRef as any}
            playbackId={videos[indexB]}
            streamType="on-demand"
            maxResolution="720p"
            muted
            preload="auto"
            onEnded={activePlayer === 'B' ? handleVideoEnded : undefined}
            className={`transition-opacity duration-1000 ${
              activePlayer === 'B' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
        </div>
      </div>
 
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
