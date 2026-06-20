// app/page.tsx
import { Hero } from "@/components/LandingPage/Hero";
import { Stats } from "@/components/LandingPage/Stats";
import { Offerings } from "@/components/LandingPage/Offerings";
import { Batches } from "@/components/LandingPage/Batches";
import { WhyUs } from "@/components/LandingPage/WhyUs";

export default function LandingPage() {
  return (
    <main className="max-w-4xl mx-auto">
      <Hero />
      <Stats />
      <Offerings />
      <Batches />
      <WhyUs />
    </main>
  );
}