"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CircularGalleryComponent from "./CircularGallery";
const CircularGallery = CircularGalleryComponent as any;

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
  const galleryRef = useRef<any>(null);

  const galleryItems = projects.map(p => ({
    image: p.image,
    text: p.name
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500", // Scroll duration for the gallery
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (galleryRef.current?.app) {
            const app = galleryRef.current.app;
            if (!app.medias || app.medias.length === 0) return;
            const itemWidth = app.medias[0].width;
            const totalScroll = itemWidth * app.medias.length * 2;
            app.scroll.target = self.progress * totalScroll;
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 flex flex-col justify-center items-center relative z-10 w-full bg-[#F7F5F2] px-4">
        <h1 className="font-serif text-5xl md:text-[8rem] leading-none tracking-tight text-[#111111] uppercase font-light">
          PROJECTS
        </h1>
        <p className="font-sans text-xs md:text-base text-[#6A6A6A] mt-6 md:mt-8 max-w-xl text-center leading-relaxed px-6">
          A collection of spaces thoughtfully designed from concept to reality.
        </p>
      </section>

      <section ref={containerRef} className="h-screen w-full bg-[#F7F5F2] relative">
        <CircularGallery
          ref={galleryRef}
          bend={3}
          textColor="#111111"
          borderRadius={0.05}
          scrollEase={0.05}
          items={galleryItems}
        />
      </section>

      <section className="h-[20vh] bg-[#F7F5F2] w-full" />
    </>
  );
}
