import ProcessSection from "@/components/ProcessSection";
import Navigation from "@/components/Navigation";

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#111111]">
      <Navigation />
      <div className="pt-20">
        <ProcessSection />
      </div>
    </main>
  );
}
