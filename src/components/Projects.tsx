"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import CircularGalleryComponent from "./CircularGallery";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const CircularGallery = CircularGalleryComponent as any;

const projects = [
  { id: 11, name: "AKHIL RESIDENCE", type: "Architecture", location: "Kerala, India", year: "2024", image: "/projects/akhil.png" },
  { id: 12, name: "AMAL VILLA", type: "Interiors", location: "Kerala, India", year: "2025", image: "/projects/amal.png" },
  { id: 13, name: "JOSEPH HOUSE", type: "Architecture", location: "Kerala, India", year: "2023", image: "/projects/joseph.png" },
  { id: 14, name: "RAJASTHAN RETREAT", type: "Architecture", location: "Rajasthan, India", year: "2026", image: "/projects/rajasthan.png" },
  { id: 15, name: "UNNIKRISHNAN ESTATE", type: "Architecture", location: "Kerala, India", year: "2024", image: "/projects/unnikrishnan.png" },
  { id: 16, name: "LONG VIEW", type: "Landscape", location: "India", year: "2025", image: "/projects/long_view.png" },
  { id: 17, name: "CONCEPTUAL SPACE", type: "Design", location: "Virtual", year: "2026", image: "/projects/ai_2.png" },
  { id: 18, name: "VIRTUAL STUDIO", type: "Design", location: "Virtual", year: "2026", image: "/projects/ai_copy.png" }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<any>(null);

  const galleryItems = projects.map(p => ({
    // Use Next.js image optimization endpoint to compress massive images before WebGL loads them
    image: `/_next/image?url=${encodeURIComponent(p.image)}&w=1080&q=75`,
    text: p.name
  }));

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // Shorter scroll duration
        pin: true,
        scrub: true, // Immediate scrub with no time lag
        onUpdate: (self) => {
          if (galleryRef.current?.app) {
            const app = galleryRef.current.app;
            if (!app.medias || app.medias.length === 0) return;
            const itemWidth = app.medias[0].width;
            // Limit the total scroll movement to exactly 5 images
            const totalScroll = itemWidth * 5;
            app.scroll.target = self.progress * totalScroll;
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 flex flex-col justify-center items-center relative z-10 w-full bg-transparent px-4 sm:px-6">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[8rem] leading-none tracking-tight text-[#111111] uppercase font-light">
          PROJECTS
        </h1>
        <p className="font-sans text-sm md:text-base text-[#6A6A6A] mt-4 sm:mt-6 md:mt-8 max-w-xl text-center leading-relaxed px-4 sm:px-6">
          A collection of spaces thoughtfully designed from concept to reality.
        </p>
      </section>

      {/* Desktop Circular WebGL Gallery */}
      <section ref={containerRef} className="h-screen w-full bg-transparent relative hidden md:block">
        <CircularGallery
          ref={galleryRef}
          bend={3}
          textColor="#111111"
          borderRadius={0.05}
          scrollEase={0.05}
          items={galleryItems}
        />
      </section>

      {/* Mobile Stacked Card Layout */}
      <section className="w-full bg-transparent block md:hidden px-4 pb-24 space-y-10 sm:space-y-16">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#EAE8E4] mb-4">
              <Image 
                src={project.image} 
                alt={project.name} 
                fill
                className="object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <h2 className="font-serif text-2xl text-[#111111] uppercase tracking-wide">{project.name}</h2>
              <div className="flex items-center gap-3 font-sans text-xs text-[#6A6A6A] tracking-wider uppercase">
                <span>{project.type}</span>
                <span className="w-1 h-1 rounded-full bg-[#111111]/20" />
                <span>{project.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="h-[20vh] bg-transparent w-full hidden md:block" />
    </>
  );
}
