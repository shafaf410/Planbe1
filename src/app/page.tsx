"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-[#111111] overflow-hidden">
      
      {/* We don't include Navigation here because the user hasn't "entered" yet. */}
      {/* The AntiGravityBackground is in layout.tsx, so it will show up perfectly here! */}

      <div className="z-10 flex flex-col items-center justify-center space-y-12">
        {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.9, 1, 1], 
              opacity: [0, 1, 1],
              y: [0, -5, 0] // extremely subtle floating for the whole logo
            }}
            transition={{ 
              duration: 3, 
              ease: "easeOut",
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="mb-12 relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80"
          >
            {/* Base Logo (Everything except 'e') */}
            <Image 
              src="/logo_base.png" 
              alt="PLAN B Logo Base" 
              fill
              className="object-contain z-10"
              priority
            />
            
            {/* The Animated 'e' Layer */}
            <motion.div
              animate={{
                rotate: [0, 15, -10, 5, 0],
                y: [0, -10, 0, -5, 0]
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5
              }}
              className="absolute inset-0 z-20"
              style={{ originX: 0.818, originY: 0.637 }}
            >
              <Image 
                src="/logo_e.png" 
                alt="Animated 'e'" 
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

        {/* Enter Site Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link 
            href="/home"
            className="group relative flex items-center justify-center px-12 py-4 overflow-hidden rounded-full border border-[#111111]/20 hover:border-[#111111]/40 transition-colors duration-500 bg-white/10 backdrop-blur-sm"
          >
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#111111] z-10 transition-colors duration-500 group-hover:text-white">
              Enter Studio
            </span>
            <div className="absolute inset-0 bg-[#111111] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
        </motion.div>
      </div>

    </main>
  );
}
