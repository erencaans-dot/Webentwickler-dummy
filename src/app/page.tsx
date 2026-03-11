import { CustomCursor } from "@/components/ui/CustomCursor";
import { HeroSection } from "@/components/ui/HeroSection";
import { PortalsSection } from "@/components/ui/PortalsSection";
import { FeatureCarousel } from "@/components/features/FeatureCarousel";
import { DeveloperInfo } from "@/components/ui/DeveloperInfo";
import { ContactForm } from "@/components/ui/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <CustomCursor />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Branchen Showroom (Portals) */}
      <PortalsSection />

      {/* 3. Feature Labor (Interactive Swipe Carousel) */}
      <FeatureCarousel />

      {/* 4. Developer Info & Pricing */}
      <DeveloperInfo />

      {/* 5. Contact Form */}
      <ContactForm />

      <footer className="py-8 text-center border-t border-white/5 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Cyber Frontend. Handcrafted with Next.js & Framer Motion.</p>
      </footer>
    </main>
  );
}
