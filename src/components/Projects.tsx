"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  { id: 11, name: "DESERT OASIS", type: "Architecture", location: "Jodhpur, India", year: "2026", image: "/projects/img1.png" },
  { id: 12, name: "SKY PENTHOUSE", type: "Interiors", location: "Delhi, India", year: "2024", image: "/projects/img2.png" },
  { id: 13, name: "URBAN LOFT", type: "Interiors", location: "Mumbai, India", year: "2025", image: "/projects/img1.png" },
  { id: 14, name: "FOREST RETREAT", type: "Architecture", location: "Coorg, India", year: "2023", image: "/projects/img2.png" },
  { id: 15, name: "MODERN VILLA", type: "Architecture", location: "Goa, India", year: "2024", image: "/projects/img1.png" },
  { id: 16, name: "ARTISAN STUDIO", type: "Interiors", location: "Jaipur, India", year: "2025", image: "/projects/img2.png" }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !trackRef.current) return;

    // The track needs to move far enough left so the last card reaches the center.
    // Calculate total scrollable width.
    const getScrollAmount = () => {
      if (!trackRef.current) return 0;
      return -(trackRef.current.scrollWidth - window.innerWidth);
    };

    // Calculate spacing dynamically based on card size
    // We want the layout to curve based on distance from center
    const updateCards = () => {
      if (!cardsRef.current) return;
      
      const windowCenterX = window.innerWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      // Card width + margin approx. Assuming ~800px total stride
      const stride = 800; 

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = cardCenterX - windowCenterX;
        
        // Track active card
        if (Math.abs(distance) < minDistance) {
          minDistance = Math.abs(distance);
          closestIndex = index;
        }

        // Normalized distance: 0 is center, 1 is 1 card away, 2 is 2 cards away, etc.
        const normalizedDist = distance / stride;
        const absDist = Math.abs(normalizedDist);

        // 3D CSS Math per user requirements:
        // Center: 100% scale (700-800px base size).
        // Adjacent (dist=1): 65% scale.
        // Edge (dist=2): ~40% visible/scale.
        
        let scale = 1;
        if (absDist <= 1) {
          // Interpolate from 1 to 0.65
          scale = 1 - (absDist * 0.35); 
        } else if (absDist <= 2) {
          // Interpolate from 0.65 to 0.4
          scale = 0.65 - ((absDist - 1) * 0.25);
        } else {
          // Beyond edge, keep scaling down gently
          scale = Math.max(0.2, 0.4 - ((absDist - 2) * 0.1));
        }

        // Rotation: Curve inwards.
        // Right side (positive distance) rotates negative (left-facing).
        // Left side (negative distance) rotates positive (right-facing).
        let rotateY = normalizedDist * -35; 
        rotateY = Math.max(-50, Math.min(50, rotateY)); // Cap at 50deg
        
        // Opacity: Center is 1. Non-active cards drop subtly.
        // User requested "very subtle opacity reduction" for non-active.
        let opacity = 1;
        if (absDist > 0.3) { // Start fading out slightly off-center
          opacity = Math.max(0.4, 1 - (absDist * 0.3));
        }

        // Depth
        const z = -absDist * 200; 

        // Apply transforms immediately
        gsap.set(card, {
          scale,
          rotateY,
          z,
          opacity,
          transformOrigin: "center center",
          zIndex: Math.round(100 - absDist * 10)
        });
      });

      // Safely update the DOM text for the progress indicator
      if (activeIndexRef.current) {
        activeIndexRef.current.innerText = String(closestIndex + 1).padStart(2, '0');
      }
    };

    // Main ScrollTrigger
    const scrollTween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.5, // 1.5s smoothing for luxurious feel
        end: () => `+=${trackRef.current?.scrollWidth || 0}`,
        invalidateOnRefresh: true,
        onUpdate: updateCards,
      }
    });

    // Run once on mount
    updateCards();
    window.addEventListener("resize", updateCards);

    // Force GSAP to recalculate everything after a tiny delay
    // This solves the issue where it calculates the width before all images/items fully render
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  return (
    <>
      {/* 
        HEADER SECTION
        Completely isolated from the scrolling gallery to guarantee absolutely no overlap.
        Generous spacing (py-32 or greater) ensures it breathes. 
      */}
      <section className="pt-32 pb-24 flex flex-col justify-center items-center relative z-10 w-full bg-[#F7F5F2]">
        <h1 className="font-serif text-6xl md:text-[8rem] leading-none tracking-tight text-[#111111] uppercase font-light">
          PROJECTS
        </h1>
        <p className="font-sans text-sm md:text-base text-[#6A6A6A] mt-8 max-w-xl text-center leading-relaxed px-6">
          A collection of spaces thoughtfully designed from concept to reality.
        </p>
      </section>

      {/* 
        GALLERY SECTION
        Pinned horizontal scrolling area. 
      */}
      <section 
        ref={containerRef} 
        className="h-screen relative flex flex-col justify-center bg-[#F7F5F2] w-full overflow-hidden"
        style={{ perspective: "2500px" }}
      >
        
        {/* The Track with 3D Perspective */}
        <div 
          ref={trackRef} 
          className="flex items-center h-full w-max py-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Spacers ensure first and last items can reach exact center */}
          <div className="w-[50vw] shrink-0" />
          
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="relative w-[90vw] max-w-[750px] aspect-[4/5] md:aspect-[3/2] shrink-0 mx-6 cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full bg-[#E8E6E1] overflow-hidden relative shadow-2xl">
                
                {/* Full-bleed photography */}
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                
                {/* Subtle protective gradient for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Editorial Information Overlay (Bottom Left) */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-[#F7F5F2] w-full flex flex-col items-start transform transition-transform duration-700">
                  <h2 className="font-serif text-3xl md:text-5xl mb-4 tracking-tight">{project.name}</h2>
                  
                  <div className="flex flex-col gap-1 mb-8 font-sans text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#D9D4CC]/90">
                    <span>{project.type}</span>
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest border-b border-transparent group-hover:border-[#F7F5F2] pb-1 transition-all duration-500">
                    View Project <ArrowRight size={14} className="transform transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          <div className="w-[50vw] shrink-0" />
        </div>

        {/* Progress Indicator (Positioned safely below cards) */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-50 pointer-events-none">
          <div className="flex items-center gap-4 text-xs font-mono text-[#111111] tracking-widest">
            <span ref={activeIndexRef}>01</span>
            <span className="text-[#111111]/30">/</span>
            <span className="text-[#111111]/30">{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

      </section>

      {/* Extra space below gallery to continue scrolling naturally */}
      <section className="h-[20vh] bg-[#F7F5F2] w-full" />
    </>
  );
}
