import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { HowItWorksClient } from "@/components/how-it-works/client-steps"
import { HowItWorksDriver } from "@/components/how-it-works/driver-steps"
import { HowItWorksCTA } from "@/components/how-it-works/cta"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Comment ça marche ?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez le processus simple et sécurisé pour vos transports
            </p>
          </div>

          <HowItWorksClient />
          <HowItWorksDriver />
          <HowItWorksCTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}
