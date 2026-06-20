import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ProcessSection from "@/components/ProcessSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-[#111111]">
      <Navigation />
      <Hero />
      <div className="relative w-full overflow-hidden">
        <div className="relative z-10 w-full">
          <About />
          <Projects />
          <ProcessSection />
          
          {/* Related Pages Section to fill the blank space */}
      <section className="py-24 md:py-32 bg-[#111111] text-[#F7F5F2] w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="font-sans text-xs uppercase tracking-[0.4em] text-[#D9D4CC] mb-12">
            Explore More
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { name: "Architecture", href: "/architecture" },
              { name: "Interiors", href: "/interiors" },
              { name: "Landscape", href: "/landscape" },
              { name: "Studio", href: "/studio" },
              { name: "Contact", href: "/contact" },
            ].map((page) => (
              <Link 
                key={page.name} 
                href={page.href}
                className="group flex items-center justify-between border-b border-[#F7F5F2]/20 pb-6 hover:border-[#F7F5F2] transition-colors duration-500"
              >
                <span className="font-serif text-4xl md:text-6xl text-[#F7F5F2]/70 group-hover:text-[#F7F5F2] transition-colors duration-500 uppercase tracking-tight">
                  {page.name}
                </span>
                <span className="text-[#F7F5F2]/50 group-hover:text-[#F7F5F2] transition-colors duration-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-500">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}
