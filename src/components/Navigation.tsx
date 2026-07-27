"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'HOME', href: '/home' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'PROCESS', href: '/process' },
];

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Scroll animations
  const navTop = useTransform(scrollY, [0, 100], [24, 16]);
  const navPaddingY = useTransform(scrollY, [0, 100], [8, 4]);
  const blurValue = useTransform(scrollY, [0, 100], [12, 24]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const blurFilter = useTransform(blurValue, v => `blur(${v}px)`);

  // Hide navigation on the root loading/splash page AFTER all hooks are called
  if (pathname === '/') return null;

  return (
    <>
      <motion.header
        style={{ top: navTop }}
        className="fixed left-0 right-0 z-[999] w-full px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto flex items-center justify-center md:justify-between pointer-events-none h-16"
      >
        {/* Left: New Architectural Logo */}
        <Link href="/home" className="absolute left-4 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 flex items-center group cursor-pointer pointer-events-auto">
          <motion.div style={{ scale: logoScale }} className="relative flex items-center justify-center min-w-[96px] min-h-[96px]">
            <Image 
              src="/logo_new.png" 
              alt="PLAN Bë Logo" 
              width={200} 
              height={200} 
              className="w-28 md:w-36 lg:w-44 h-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
            />
          </motion.div>
        </Link>
 
        {/* Right: Menu Button (Mobile Only) */}
        <MagneticButton 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/50 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden hover:bg-white/70 transition-colors duration-300 pointer-events-auto"
        >
          <div className="relative w-4 h-3 flex flex-col justify-between items-center pointer-events-none">
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
              className="w-full h-[1px] bg-black origin-center"
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-full h-[1px] bg-black"
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="w-full h-[1px] bg-black origin-center"
            />
          </div>
        </MagneticButton>

        <motion.div
          style={{ paddingBottom: navPaddingY, paddingTop: navPaddingY, backdropFilter: blurFilter }}
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center px-4 rounded-full border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 pointer-events-auto"
        >
        {/* Subtle Blueprint Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)`,
            backgroundSize: '12px 12px'
          }}
        />
        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 relative z-10 ml-2 lg:ml-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className="relative px-4 py-1.5 group"
              >
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-colors duration-300">
                  {link.label}
                </span>
                
                {/* Active Indicator: Drafting Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover Animation: Blueprint Line */}
                <div className="absolute bottom-1 left-0 w-full h-[1px] bg-black/30 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            );
          })}

          {/* CONTACT Link (Primary Action) */}
          <Link 
            href="/contact"
            className="relative px-5 py-1.5 ml-2 group"
          >
            <div className="absolute inset-0 bg-white/60 border border-white/80 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:bg-white/90 group-hover:scale-105" />
            <span className="relative z-10 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black">
              CONTACT
            </span>
            {pathname === '/contact' && (
              <motion.div 
                layoutId="activeDot"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        </nav>
      </motion.div>

    </motion.header>

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[998] flex flex-col items-center justify-center bg-[#F7F5F2]/95 backdrop-blur-md md:hidden pointer-events-auto"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-serif text-4xl uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-[#111111]/40"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#111111] text-[#F7F5F2] font-sans text-xs px-8 py-4 tracking-[0.2em] uppercase rounded-full shadow-lg"
                >
                  CONTACT US
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
