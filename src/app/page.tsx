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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative w-32 md:w-48 lg:w-56 h-32 md:h-48 lg:h-56"
        >
          <Image 
            src="/logo1.png" 
            alt="PLAN Bë Logo" 
            fill
            className="object-contain" 
            priority
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 224px"
          />
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
