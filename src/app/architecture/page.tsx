"use client";

import Navigation from "@/components/Navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ArchitecturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Overall page scroll
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  // Subtle parallax for the main hero image
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);
  // Subtle parallax for the secondary images
  const resImageY = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-10%"]);
  const scaleImageY = useTransform(scrollYProgress, [0.6, 1], ["0%", "-10%"]);

  return (
    <main ref={containerRef} className="bg-[#F7F5F2] min-h-screen text-[#111111] overflow-hidden">
      <Navigation />
      
      {/* 1. Header Section (Increased Top Padding to avoid Navigation clash) */}
      <section className="pt-[20vh] md:pt-[25vh] pb-16 px-6 flex flex-col justify-center items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-[#6A6A6A] mb-8"
        >
          Discipline
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tight uppercase"
        >
          Architecture
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#6A6A6A] mt-8"
        >
          From mind to matter
        </motion.p>
      </section>

      {/* 2. Hero Image Section (Replaces the buggy wipe animation) */}
      <section className="px-6 md:px-12 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative rounded-sm shadow-2xl"
        >
          <motion.div style={{ y: heroImageY }} className="absolute -top-[10%] w-full h-[120%]">
            <Image 
              src="/projects/amal.png" 
              alt="Architectural Render" 
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 3. The Approach (Typography Focus) */}
      <section className="py-24 md:py-32 px-6 md:px-24 bg-[#E8E6E1]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#6A6A6A] mb-12">
            01 / The Approach
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#111111]">
            We operate at the exact intersection of form, function, and the human environment.
          </h2>
          <p className="font-sans text-[#6A6A6A] mt-12 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Architecture is the silent language of space. We don’t just build structures; we sculpt environments that respond to their context and climate. Our approach relies on rigorous geometry, material honesty, and an obsessive attention to light and shadow.
          </p>
        </motion.div>
      </section>

      {/* 4. Residential Mastery Section */}
      <section className="py-32 px-6 md:px-24 bg-[#F7F5F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#6A6A6A]">02 / Residential Mastery</p>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">Bespoke Living Spaces</h3>
            <p className="font-sans text-[#6A6A6A] leading-relaxed">
              A home should be tailored perfectly to the unique rhythms of your life. We design residential spaces that balance utter privacy with vastness, creating warm, tactile sanctuaries that elevate the daily human experience.
            </p>
          </motion.div>
          {/* Image */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-sm shadow-xl">
            <motion.div style={{ y: resImageY }} className="absolute -top-[10%] w-full h-[120%]">
              <Image 
                src="/projects/akhil.png" 
                alt="Residential Architecture" 
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Grand Scale Section */}
      <section className="py-32 px-6 md:px-24 bg-[#E8E6E1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image (Order 1 on Desktop) */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-sm shadow-xl order-2 lg:order-1">
            <motion.div style={{ y: scaleImageY }} className="absolute -top-[10%] w-full h-[120%]">
              <Image 
                src="/projects/rajasthan.png" 
                alt="Commercial Architecture" 
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          {/* Text (Order 2 on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8 order-1 lg:order-2"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#6A6A6A]">03 / Grand Scale</p>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">Master Planning</h3>
            <p className="font-sans text-[#6A6A6A] leading-relaxed">
              When dealing with commercial spaces and grand scale developments, our vision shifts to strategy. We craft dynamic environments that foster innovation, shape corporate culture, and project a powerful brand identity across massive footprints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-48 px-6 text-center bg-[#111111] text-[#F7F5F2]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-12"
        >
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight">Ready to build your vision?</h2>
          <a href="/contact" className="group flex items-center gap-4 border-b border-[#F7F5F2]/30 pb-2 hover:border-[#F7F5F2] transition-colors duration-300">
            <span className="font-sans text-xs tracking-widest uppercase">Start a Conversation</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </section>

    </main>
  );
}
