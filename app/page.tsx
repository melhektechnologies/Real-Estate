import { NavigationHeader } from "@/components/navigation-header"
import { HeroSearchSection } from "@/components/hero-search-section"
import { FeaturedGrid } from "@/components/featured-grid"
import { MapPreviewWidget } from "@/components/map-preview-widget"
import { NeighborhoodExplorer } from "@/components/neighborhood-explorer"
import { MortgageWidget } from "@/components/mortgage-widget"
import { AgentRoster } from "@/components/agent-roster"
import { TestimonialMarquee } from "@/components/testimonial-marquee"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AiAssistant } from "@/components/ai-assistant"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <main>
        <HeroSearchSection />
        <FeaturedGrid />
        <NeighborhoodExplorer />
        <MapPreviewWidget />
        <MortgageWidget />
        <AgentRoster />
        <TestimonialMarquee />
        <CTASection />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  )
}
