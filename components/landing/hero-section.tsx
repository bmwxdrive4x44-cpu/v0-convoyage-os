"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Truck, CheckCircle, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="features" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated lines */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(255,140,0,0.1)_50%,transparent_51%,transparent_100%)] bg-[length:100px_100%]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
        <svg className="absolute bottom-20 left-0 w-full h-32" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,80 Q300,20 600,50 T1200,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary/40"
          />
          <path
            d="M0,90 Q400,40 800,60 T1200,50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-warning/30"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm text-primary">
            <Truck className="h-4 w-4" />
            Plateforme SaaS Logistique
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            <span className="text-foreground">LOGISTIQUE</span>
            <br />
            <span className="text-primary">NOUVELLE GÉNÉRATION</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            La plateforme SaaS tout-en-un pour gérer vos déplacements de véhicules et transports de marchandises.
            <span className="text-foreground font-medium">Simple, Sécurisé, Instantané.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/auth/client">Obtenir un devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="/auth/driver/register">Devenir Conducteur</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12">
            <StatCard value="15K+" label="Missions réalisées" icon={CheckCircle} />
            <StatCard value="98%" label="Clients satisfaits" icon={CheckCircle} />
            <StatCard value="150K€" label="Assurance incluse" icon={Shield} />
            <StatCard value="24/7" label="Support dédié" icon={Headphones} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string
  label: string
  icon: React.ElementType
}) {
  return (
    <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
      <div className="flex justify-center mb-2">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
