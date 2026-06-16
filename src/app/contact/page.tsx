import Navigation from "@/components/Navigation";

export default function ContactPage() {
  return (
    <main className="bg-[#F7F5F2] min-h-screen text-[#111111] flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Contact</h1>
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#6A6A6A]">Coming Soon</p>
      </div>
    </main>
  );
}
