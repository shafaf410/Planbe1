"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random progress increments for realistic loading
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Short delay after 100% before redirect
      const redirectTimer = setTimeout(() => {
        router.push("/home");
      }, 600);
      return () => clearTimeout(redirectTimer);
    }
  }, [progress, router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] text-[#111111] overflow-hidden">
      {/* Eagerly preload the first video of the home page so it's ready the instant we redirect */}
      <video 
        src="/new%20tensopix/video1.mp4" 
        preload="auto" 
        className="hidden" 
        muted 
        playsInline 
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-16">
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
          className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80"
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

        {/* Loading Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center space-y-3 w-48 md:w-64"
        >
          <div className="w-full h-[2px] bg-[#9B5638]/20 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#9B5638] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
