import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#111111]">
      <Navigation />
      <Hero />
      <Projects />
      {/* Additional sections (Studio, etc.) will go here */}
    </main>
  );
}
