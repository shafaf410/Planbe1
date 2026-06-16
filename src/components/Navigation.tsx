"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PROJECTS', href: '/projects' },
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
  const navPaddingY = useTransform(scrollY, [0, 100], [16, 10]);
  const blurValue = useTransform(scrollY, [0, 100], [12, 24]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  return (
    <motion.header
      style={{ top: navTop }}
      className="fixed left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-3rem)] max-w-[1200px] flex items-center justify-between pointer-events-none"
    >
      <motion.div
        style={{ paddingBottom: navPaddingY, paddingTop: navPaddingY, backdropFilter: useTransform(blurValue, v => `blur(${v}px)`) }}
        className="relative flex items-center px-6 rounded-full border border-white/40 bg-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 pointer-events-auto"
      >
        {/* Subtle Blueprint Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)`,
            backgroundSize: '12px 12px'
          }}
        />

        {/* Left (previously Right): Menu Button */}
        <MagneticButton 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:hidden hover:bg-white/70 transition-colors duration-300"
        >
          <div className="relative w-4 h-3 flex flex-col justify-between">
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
              className="w-full h-[1px] bg-[#111111] origin-center"
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-full h-[1px] bg-[#111111]"
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
              className="w-full h-[1px] bg-[#111111] origin-center"
            />
          </div>
        </MagneticButton>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 relative z-10 ml-4 md:ml-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className="relative px-5 py-2 group"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#111111]/70 group-hover:text-[#111111] transition-colors duration-300">
                  {link.label}
                </span>
                
                {/* Active Indicator: Drafting Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#111111]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover Animation: Blueprint Line */}
                <div className="absolute bottom-1 left-0 w-full h-[1px] bg-[#111111]/30 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            );
          })}

          {/* CONTACT Link (Primary Action) */}
          <Link 
            href="/contact"
            className="relative px-6 py-2 ml-4 group"
          >
            <div className="absolute inset-0 bg-white/50 border border-white/60 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:bg-white/70 group-hover:scale-105" />
            <span className="relative z-10 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#111111]">
              CONTACT
            </span>
            {pathname === '/contact' && (
              <motion.div 
                layoutId="activeDot"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#111111]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        </nav>
      </motion.div>

      {/* Right: Architectural Logo (Free floating outside the pill) */}
      <Link href="/" className="relative z-10 flex items-center group cursor-pointer pointer-events-auto">
        <motion.div style={{ scale: logoScale }} className="relative flex items-center justify-center">
          <svg 
            viewBox="0 0 400 300" 
            className="w-28 md:w-36 h-auto text-[#111111] transition-transform duration-500 group-hover:scale-105"
            aria-label="PLAN Bë Logo"
          >
            {/* The broken frame */}
            <path 
              d="M 350 235 L 350 250 L 50 250 L 50 50 L 350 50 L 350 150" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="12" 
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            {/* The Logo Text perfectly bounded */}
            <text 
              x="75" 
              y="220" 
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              fontSize="60" 
              fontWeight="500" 
              textLength="265"
              lengthAdjust="spacing"
              fill="currentColor"
            >
              PLAN Bë
            </text>
          </svg>
        </motion.div>
      </Link>
    </motion.header>
  );
}
