"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Architecture",
    description: "Bespoke architectural design focusing on spatial purity, material honesty, and seamless integration with the surrounding environment.",
    href: "/architecture",
    image: "/projects/akhil.png"
  },
  {
    id: "02",
    title: "Interiors",
    description: "Curated interior spaces that balance aesthetics and function, creating environments of quiet luxury and timeless elegance.",
    href: "/interiors",
    image: "/projects/amal.png"
  },
  {
    id: "03",
    title: "Landscape",
    description: "Holistic landscape design that blurs the boundaries between the built structure and the natural world.",
    href: "/landscape",
    image: "/projects/long_view.png"
  },
  {
    id: "04",
    title: "Urban Planning",
    description: "Comprehensive masterplanning strategies designed to foster community, sustainability, and forward-thinking development.",
    href: "/studio", // Pointing to studio as a fallback
    image: "/projects/rajasthan.png"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#111111]">
      <Navigation />
      
      <section className="pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6">
            Our Services
          </h1>
          <p className="font-sans text-sm md:text-base max-w-xl text-[#111111]/70 leading-relaxed">
            We provide a comprehensive suite of design disciplines, united by a singular vision: to create spaces of profound resonance and enduring quality.
          </p>
        </motion.div>

        <div className="flex flex-col border-t border-[#111111]/10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={service.href} className="group block border-b border-[#111111]/10 py-10 md:py-16 hover:bg-white/30 transition-colors duration-500 px-4 -mx-4 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Number & Image */}
                  <div className="md:col-span-4 flex items-center gap-6">
                    <span className="font-sans text-xs font-medium tracking-widest text-[#111111]/40 group-hover:text-[#111111] transition-colors duration-500">
                      {service.id}
                    </span>
                    <div className="relative w-32 h-20 md:w-48 md:h-32 overflow-hidden rounded-lg">
                      <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4 relative overflow-hidden">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                      {service.title}
                    </h2>
                  </div>

                  {/* Description & Arrow */}
                  <div className="md:col-span-4 flex flex-col justify-between h-full">
                    <p className="font-sans text-sm leading-relaxed text-[#111111]/60 mb-8 md:mb-0 max-w-xs ml-auto">
                      {service.description}
                    </p>
                    
                    <div className="flex justify-end mt-4 md:mt-0">
                      <div className="w-12 h-12 rounded-full border border-[#111111]/20 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#F7F5F2] transition-all duration-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-45 transition-transform duration-500">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
