"use client";

import Navigation from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="bg-[#F7F5F2] min-h-screen text-[#111111] overflow-hidden">
      <Navigation />
      
      {/* Hero Statement */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32">
        {/* Subtle blueprint overlay */}
        <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-[0.03] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center z-10 max-w-5xl"
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#6A6A6A] mb-12">
            The Studio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight text-[#111111]">
            WE DON&apos;T JUST<br />DESIGN BUILDINGS.<br />
            <span className="text-[#6A6A6A]">WE DESIGN<br />EXPERIENCES.</span>
          </h1>
        </motion.div>
        
        {/* Architectural drafting marks */}
        <div className="absolute top-1/4 left-12 w-16 h-[1px] bg-[#111111]/20 hidden md:block" />
        <div className="absolute top-1/4 left-12 w-[1px] h-16 bg-[#111111]/20 hidden md:block" />
        <div className="absolute bottom-1/4 right-12 w-16 h-[1px] bg-[#111111]/20 hidden md:block" />
        <div className="absolute bottom-1/4 right-12 w-[1px] h-16 bg-[#111111]/20 hidden md:block" />
      </section>

      {/* Editorial Layout: Philosophy & Masks */}
      <section ref={containerRef} className="relative py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Our Philosophy is rooted in contextual harmony and timeless materiality.
            </h2>
            <div className="font-sans text-[#6A6A6A] text-sm md:text-base leading-relaxed space-y-6">
              <p>
                At PLAN Bë, we believe that architecture is a profound expression of human potential. Every line drawn is an intention; every material chosen is a narrative. 
              </p>
              <p>
                From the initial blueprint sketch to the final concrete pour, our process is an obsessive pursuit of perfection. We blend Swiss minimalism with warm, organic textures to create living spaces that elevate the human experience.
              </p>
            </div>
            
            <div className="border-t border-[#111111]/10 pt-8 mt-4">
              <div className="grid grid-cols-2 gap-8 font-sans text-[10px] uppercase tracking-widest text-[#111111]">
                <div>
                  <span className="block text-[#6A6A6A] mb-2">Established</span>
                  <span>2015</span>
                </div>
                <div>
                  <span className="block text-[#6A6A6A] mb-2">Location</span>
                  <span>Kochi, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Masked Image Reveal */}
          <div className="relative h-[80vh] w-full flex items-center justify-center">
            {/* Architectural Mask (Diagonal/Geometric) */}
            <motion.div 
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full h-full overflow-hidden"
              style={{ clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0 100%)" }}
            >
              <motion.img 
                style={{ y }}
                src="/projects/ai_copy.png" 
                alt="Studio process" 
                className="w-full h-[120%] object-cover object-center absolute -top-[10%]"
              />
            </motion.div>
            
            {/* Outline box to emphasize the mask */}
            <div className="absolute w-full h-full border border-[#111111]/10 pointer-events-none" style={{ clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0 100%)", transform: "translate(-20px, 20px)" }} />
          </div>

        </div>
      </section>

    </main>
  );
}
