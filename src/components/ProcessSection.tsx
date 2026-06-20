"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, PenTool, LayoutTemplate, Ruler, Home } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: MessageSquare,
    title: "Let's Connect",
    description: "We begin by understanding your lifestyle, aspirations, and the way you want to live."
  },
  {
    id: "02",
    icon: PenTool,
    title: "Dream Together",
    description: "Through collaboration and exploration, we shape ideas into a clear design vision."
  },
  {
    id: "03",
    icon: LayoutTemplate,
    title: "Shape & Design",
    description: "Layouts, materials, and visual concepts come together to bring your vision to life."
  },
  {
    id: "04",
    icon: Ruler,
    title: "Build With Care",
    description: "Every detail is thoughtfully executed with precision, quality, and attention."
  },
  {
    id: "05",
    icon: Home,
    title: "Live Your Way",
    description: "A home designed around your story, ready to be experienced and enjoyed every day."
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden font-sans"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs tracking-[0.2em] text-[#6E6155] uppercase mb-4 block"
          >
            Plan Bē Design Studio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3A2B22] mb-6 font-light tracking-tight"
          >
            How Your Home Comes Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6E6155] text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl font-light"
          >
            A thoughtful design journey shaped by collaboration, creativity, and craftsmanship — transforming ideas into spaces that truly belong to you.
          </motion.p>
        </div>

        {/* Process Journey */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Animated Dotted Line Background (Desktop) */}
          <div className="absolute top-0 bottom-0 left-[50%] hidden md:block w-px -translate-x-1/2 overflow-visible z-0">
             <div className="h-full w-full border-l-2 border-dashed border-[#C5A26A]/30" />
             <motion.div 
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#C5A26A] to-transparent"
               style={{
                 height: "100%",
                 scaleY: scrollYProgress,
                 transformOrigin: "top"
               }}
             />
             <motion.div
               className="absolute left-[0.5px] -translate-x-1/2 w-5 h-5 rounded-full bg-[#F7F3ED] border-[4px] border-[#C5A26A] shadow-[0_0_15px_rgba(197,162,106,0.6)] z-30"
               style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
             />
          </div>

          {/* Animated Dotted Line Background (Mobile) */}
          <div className="absolute top-0 bottom-0 left-[28px] md:hidden w-px overflow-visible z-0">
             <div className="h-full w-full border-l-2 border-dashed border-[#C5A26A]/30" />
             <motion.div 
               className="absolute top-0 left-0 w-full bg-[#C5A26A]"
               style={{
                 height: "100%",
                 scaleY: scrollYProgress,
                 transformOrigin: "top"
               }}
             />
             <motion.div
               className="absolute left-[0.5px] -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F3ED] border-[3px] border-[#C5A26A] shadow-[0_0_15px_rgba(197,162,106,0.6)] z-30"
               style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
             />
          </div>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div 
                  key={step.id} 
                  className={`flex flex-col md:flex-row items-start md:items-center w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Icon Center Point (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-4 h-4 rounded-full bg-[#F7F3ED] border-[3px] border-[#C5A26A] z-20 shadow-[0_0_15px_rgba(197,162,106,0.3)]"
                    />
                  </div>

                  {/* Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`w-full md:w-1/2 flex ${isEven ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"} relative`}
                  >
                    
                    <div className="group relative w-full md:w-[90%] bg-[#F3EEE7] p-8 md:p-10 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-white/40 overflow-hidden">
                      
                      {/* Mobile Icon Point */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-[2px] w-3 h-3 rounded-full bg-[#C5A26A] md:hidden z-20" />

                      {/* Number Watermark */}
                      <div className="absolute -right-4 -top-8 text-[120px] font-serif text-[#3A2B22]/5 font-bold select-none pointer-events-none transition-transform duration-700 group-hover:scale-110">
                        {step.id}
                      </div>

                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center mb-6 text-[#C5A26A] shadow-sm group-hover:bg-[#C5A26A] group-hover:text-white transition-colors duration-500">
                          <Icon strokeWidth={1.5} size={24} />
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-serif text-[#3A2B22] mb-3">
                          {step.title}
                        </h3>
                        
                        <p className="text-[#6E6155] leading-relaxed font-light text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tagline & Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-6 mb-12 w-full justify-center opacity-80">
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-[#C5A26A]" />
            <span className="font-serif text-xl md:text-2xl text-[#3A2B22] italic tracking-wide">
              Design Your Way of Being.
            </span>
            <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-[#C5A26A]" />
          </div>

          <button className="relative overflow-hidden group bg-gradient-to-r from-[#C5A26A] to-[#B38D56] text-white px-8 py-4 rounded-full font-sans text-sm tracking-widest uppercase hover:shadow-[0_8px_30px_rgba(197,162,106,0.3)] transition-all duration-500 hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center gap-2">
              Request a Consultation
              <motion.span 
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#B38D56] to-[#C5A26A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
