import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <TestimonialsSection />
    </main>
  );
};

export default Index;