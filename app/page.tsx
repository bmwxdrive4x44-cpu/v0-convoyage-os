import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { SolutionsSection } from "@/components/landing/solutions-section"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { CurrenciesSection } from "@/components/landing/currencies-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <SolutionsSection />
        <DashboardPreview />
        <CurrenciesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
