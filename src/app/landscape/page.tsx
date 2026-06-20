"use client";

import Navigation from "@/components/Navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandscapePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Overall page scroll
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Hero Parallax
  const heroBgY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Section Parallax
  const floraImageY = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-10%"]);
  const waterImageY = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "-10%"]);

  return (
    <main ref={containerRef} className="bg-[#F7F5F2] min-h-screen text-[#111111] overflow-hidden">
      <Navigation />
      
      {/* 1. HERO SECTION (Clean, Bright, Architectural) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Clean without heavy muddy filters */}
        <motion.div 
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/projects/long_view.png" 
            alt="Landscape Architecture Overview"
            className="w-full h-[120%] object-cover brightness-[0.85] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/40 via-transparent to-[#F7F5F2]" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 mt-24"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-[#F7F5F2] mb-6 drop-shadow-md"
          >
            Context & Terrain
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight text-[#F7F5F2] drop-shadow-lg"
          >
            ROOTED IN <br />
            <span className="italic font-light">THE EARTH.</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* 2. THE PHILOSOPHY */}
      <section className="relative py-32 md:py-48 px-6 md:px-24 bg-[#F7F5F2] z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-[#111111]">
            Landscape architecture is the vital bridge between the built environment and the natural world.
          </h2>
          <p className="font-sans text-[#6A6A6A] mt-10 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            We don't just decorate the spaces around our buildings. We design living ecosystems that breathe, evolve, and ground our architecture deeply into its true context, creating seamless transitions from indoors to out.
          </p>
        </motion.div>
      </section>

      {/* 3. FLORA & TERRAIN SECTION */}
      <section className="py-24 px-6 md:px-24 bg-[#E8E6E1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-sm shadow-xl">
            <motion.img 
              style={{ y: floraImageY }}
              src="/projects/landscape_flora.png" 
              alt="Curated Native Flora" 
              className="absolute -top-[10%] w-full h-[120%] object-cover object-center"
            />
          </div>
          {/* Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#6A6A6A]">01 / Botanical Selection</p>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">Native Curation</h3>
            <p className="font-sans text-[#6A6A6A] leading-relaxed">
              True luxury in landscape lies in harmony. We meticulously select native species that naturally thrive in the local climate. This approach requires minimal artificial intervention while offering maximum visual and ecological impact, ensuring the landscape matures beautifully over decades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. WATER & ELEMENTS SECTION */}
      <section className="py-24 px-6 md:px-24 bg-[#F7F5F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text (Order reversed on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8 lg:order-1 order-2"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#6A6A6A]">02 / Elemental Integration</p>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">Fluidity & Reflection</h3>
            <p className="font-sans text-[#6A6A6A] leading-relaxed">
              Water acts as the dynamic counterpoint to the static permanence of stone and concrete. We integrate minimalist water features to introduce movement, acoustic calm, and striking reflections that multiply the architectural beauty of the space.
            </p>
          </motion.div>
          {/* Image */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-sm shadow-xl lg:order-2 order-1">
            <motion.img 
              style={{ y: waterImageY }}
              src="/projects/landscape_water.png" 
              alt="Minimalist Water Feature" 
              className="absolute -top-[10%] w-full h-[120%] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-48 px-6 text-center bg-[#111111] text-[#F7F5F2]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-12"
        >
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight">Ready to transform your environment?</h2>
          <a href="/contact" className="group flex items-center gap-4 border-b border-[#F7F5F2]/30 pb-2 hover:border-[#F7F5F2] transition-colors duration-300">
            <span className="font-sans text-xs tracking-widest uppercase">Start a Conversation</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </section>

    </main>
  );
}
