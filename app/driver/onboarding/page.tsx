import { Truck } from "lucide-react"
import Link from "next/link"
import { DriverOnboardingForm } from "@/components/driver/onboarding-form"
import { Logo } from "@/components/landing/logo"

export default function DriverOnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
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
