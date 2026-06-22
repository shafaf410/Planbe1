"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { StaggerText } from "@/components/ui/stagger-text";
import Image from "next/image";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F2] w-full font-sans text-[#111111] overflow-hidden">
      
      {/* 1. Hero Section (AECOM Style: Full width, striking image, large title) */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-12 md:pb-24 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/projects/long_view.png" 
            alt="About PlanBē"
            fill
            className="object-cover brightness-[0.85]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-white/70 tracking-[0.2em] uppercase text-xs md:text-sm mb-4">The Studio</p>
            <StaggerText
              className="font-serif text-4xl sm:text-5xl md:text-7xl leading-none text-white tracking-tight"
              text="About Us"
              direction="bottom"
              stagger={0.1}
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Our Approach Section (Side-by-side) */}
      <section className="w-full py-24 md:py-40 px-4 sm:px-6 md:px-12 bg-[#F7F5F2]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full aspect-square md:aspect-[4/5] bg-[#EAE8E4] relative overflow-hidden sticky top-24"
          >
            <Image 
              src="/projects/akhil.png" 
              alt="Our Approach" 
              fill
              className="object-cover transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col gap-10 lg:pl-10"
          >
            <div>
              <p className="text-[#6A6A6A] tracking-[0.2em] uppercase text-xs mb-4">Philosophy</p>
              <h3 className="font-serif text-4xl md:text-6xl text-[#111111] mb-6">Our Approach</h3>
              <p className="text-[#6A6A6A] leading-relaxed md:text-lg">
                We seek inspiration in simplicity, finding harmony between architecture, nature, and everyday life.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-xl md:text-2xl font-medium text-[#111111]">Timeless Aesthetics</h4>
                <p className="text-[#6A6A6A] leading-relaxed md:text-lg">
                  Guided by a thoughtful design approach, we create spaces that balance beauty, functionality, and individuality.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-xl md:text-2xl font-medium text-[#111111]">Meticulous Detail</h4>
                <p className="text-[#6A6A6A] leading-relaxed md:text-lg">
                  Each project is an exploration of light, material, proportion, and context—carefully crafted to reflect aspirations.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-xl md:text-2xl font-medium text-[#111111]">Meaningful Design</h4>
                <p className="text-[#6A6A6A] leading-relaxed md:text-lg">
                  From elegant residences to contemporary villas, our work is driven by a commitment to finding environmental harmony.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
