"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const videos = [
  "/new tensopix/TensorPix - Contemporary_house_architectural_202607151334_202607151339-ezremove.mp4",
  "/new tensopix/TensorPix - Video Project 3-ezremove.mp4",
  "/new tensopix/TensorPix - Video Project 8-ezremove.mp4",
  "/new tensopix/TensorPix - gemini_generated_video_1552f757-ezremove.mp4",
  "/new tensopix/TensorPix - gemini_generated_video_59f4f080-ezremove (1).mp4"
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

  // Initial load: Player A plays video 0, Player B preloads video 1
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
  }, []);

  // Preload effect: whenever active video index or visible player changes,
  // preload the NEXT video index in sequence on the hidden/inactive player
  useEffect(() => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    if (activePlayer === 'A') {
      const videoB = videoRefB.current;
      if (videoB && !videoB.src.endsWith(encodeURI(videos[nextIndex]))) {
        videoB.src = videos[nextIndex];
        videoB.load();
        videoB.pause();
      }
    } else {
      const videoA = videoRefA.current;
      if (videoA && !videoA.src.endsWith(encodeURI(videos[nextIndex]))) {
        videoA.src = videos[nextIndex];
        videoA.load();
        videoA.pause();
      }
    }
  }, [currentVideoIndex, activePlayer]);

  const transitionToVideo = (nextIndex: number) => {
    if (nextIndex === currentVideoIndex) return;

    if (activePlayer === 'A') {
      const videoB = videoRefB.current;
      if (videoB) {
        if (videoB.src !== videos[nextIndex] && !videoB.src.endsWith(encodeURI(videos[nextIndex]))) {
          videoB.src = videos[nextIndex];
          videoB.load();
        }
        videoB.play().then(() => {
          setActivePlayer('B');
          setTimeout(() => {
            videoRefA.current?.pause();
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
          setTimeout(() => {
            videoRefB.current?.pause();
          }, 1000);
        }).catch(err => {
          console.log("Error transitioning to A:", err);
          setActivePlayer('A');
        });
      }
    }
    setCurrentVideoIndex(nextIndex);
  };

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    transitionToVideo(nextIndex);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#F7F5F2]"
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
          
          {/* Mobile Background Wash for Text Readability */}
          <div className="absolute inset-0 bg-[#F7F5F2]/30 backdrop-blur-[1px] md:hidden pointer-events-none" />
          
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
 
      {/* Left Content Area */}
      <div className="absolute inset-0 w-full md:w-[85%] lg:w-[90%] z-10 flex flex-col justify-end items-start text-left pl-4 sm:pl-6 md:pl-12 lg:pl-16 pr-4 sm:pr-6 md:pr-8 pb-16 sm:pb-24 md:pb-28 lg:pb-32 pointer-events-none">
        
        <div className="pointer-events-auto w-full max-w-xl lg:max-w-2xl relative flex flex-col items-start">
          <motion.div className="flex flex-col items-start w-full">
            <h1 className="font-serif text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-[4.5rem] md:leading-[1.05] mb-4 sm:mb-6 text-white tracking-tight font-light text-left">
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
      </div>
    </section>
  );
}
