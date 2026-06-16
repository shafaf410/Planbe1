import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F2] text-[#111111] overflow-x-hidden">
      <Navigation />
      <Hero />
      <Projects />
      {/* Additional sections (Studio, etc.) will go here */}
    </main>
  );
}
