import { Truck } from "lucide-react"
import Link from "next/link"
import { DriverOnboardingForm } from "@/components/driver/onboarding-form"

export default function DriverOnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">ConvoyageOS</span>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Devenez conducteur</h1>
          <p className="text-muted-foreground">
            Complétez votre profil et téléchargez vos documents pour rejoindre notre réseau de conducteurs
            professionnels.
          </p>
        </div>
        <DriverOnboardingForm />
      </main>
    </div>
  )
}
