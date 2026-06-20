"use client";

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="bg-[#111111] min-h-screen text-[#F7F5F2] selection:bg-[#F7F5F2] selection:text-[#111111] overflow-hidden">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Left: Statement */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#D9D4CC] mb-8">
            Start a Conversation
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-12">
            LET'S BUILD<br />
            <span className="italic font-light text-[#D9D4CC]">SOMETHING</span><br />
            EXTRAORDINARY.
          </h1>
          
          <div className="mt-auto hidden lg:block">
            <div className="grid grid-cols-2 gap-12 font-sans text-xs uppercase tracking-widest text-[#D9D4CC]">
              <div>
                <span className="block opacity-50 mb-4">Location</span>
                <p className="leading-relaxed">
                  123 Design Avenue<br />
                  Kochi, Kerala<br />
                  India 682001
                </p>
              </div>
              <div>
                <span className="block opacity-50 mb-4">Direct</span>
                <p className="leading-relaxed space-y-2">
                  <a href="mailto:hello@planbe.studio" className="block hover:text-white transition-colors">hello@planbe.studio</a>
                  <a href="tel:+919876543210" className="block hover:text-white transition-colors">+91 98765 43210</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl lg:ml-auto"
        >
          <form className="flex flex-col gap-12 font-sans text-sm md:text-base">
            
            <div className="flex flex-col gap-2 group">
              <label htmlFor="name" className="uppercase tracking-[0.2em] text-[10px] text-[#D9D4CC] group-focus-within:text-white transition-colors">
                What is your name?
              </label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-[#D9D4CC]/30 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label htmlFor="email" className="uppercase tracking-[0.2em] text-[10px] text-[#D9D4CC] group-focus-within:text-white transition-colors">
                Where can we reach you?
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-[#D9D4CC]/30 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label htmlFor="type" className="uppercase tracking-[0.2em] text-[10px] text-[#D9D4CC] group-focus-within:text-white transition-colors">
                Project Type
              </label>
              <select 
                id="type" 
                defaultValue=""
                className="w-full bg-transparent border-b border-[#D9D4CC]/30 py-3 text-white/50 focus:text-white focus:outline-none focus:border-white transition-colors appearance-none rounded-none"
              >
                <option value="" disabled>Select an option</option>
                <option value="architecture">Architecture</option>
                <option value="interiors">Interiors</option>
                <option value="landscape">Landscape</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 group">
              <label htmlFor="message" className="uppercase tracking-[0.2em] text-[10px] text-[#D9D4CC] group-focus-within:text-white transition-colors">
                Tell us about your project
              </label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-[#D9D4CC]/30 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="We are looking to build a..."
              />
            </div>

            <button 
              type="button"
              className="mt-4 self-start bg-[#F7F5F2] text-[#111111] font-sans text-xs uppercase tracking-[0.2em] px-10 py-5 hover:bg-white transition-colors duration-300"
            >
              Submit Enquiry
            </button>
            
          </form>
        </motion.div>

        {/* Mobile Info */}
        <div className="lg:hidden mt-12 pt-12 border-t border-[#D9D4CC]/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 font-sans text-xs uppercase tracking-widest text-[#D9D4CC]">
            <div>
              <span className="block opacity-50 mb-4">Location</span>
              <p className="leading-relaxed">
                123 Design Avenue<br />
                Kochi, Kerala<br />
                India 682001
              </p>
            </div>
            <div>
              <span className="block opacity-50 mb-4">Direct</span>
              <p className="leading-relaxed space-y-2">
                <a href="mailto:hello@planbe.studio" className="block hover:text-white transition-colors">hello@planbe.studio</a>
                <a href="tel:+919876543210" className="block hover:text-white transition-colors">+91 98765 43210</a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
