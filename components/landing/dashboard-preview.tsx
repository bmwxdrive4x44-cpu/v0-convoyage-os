"use client"

import type React from "react"

import { CreditCard, PenTool, Zap } from "lucide-react"

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dashboard Convoyageos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                GÉREZ TOUT DEPUIS
                <br />
                <span className="text-primary">VOTRE ESPACE CLIENT</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Plus de papiers, plus d'appels interminables. Convoyageos digitalise 100% du processus. Suivez vos
              missions, payez en ligne, signez vos contrats et retrouvez vos factures au même endroit.
            </p>

            {/* Feature steps */}
            <div className="space-y-6">
              <FeatureStep
                number={1}
                title="Devis Instantané"
                description="Algorithme de prix intelligent basé sur la distance et le véhicule."
                icon={Zap}
              />
              <FeatureStep
                number={2}
                title="Signature Électronique"
                description="Contrats générés automatiquement et signés en ligne."
                icon={PenTool}
              />
              <FeatureStep
                number={3}
                title="Paiement Sécurisé"
                description="Transactions protégées via Stripe avec séquestre."
                icon={CreditCard}
              />
            </div>
          </div>

          {/* Right - Dashboard mockup */}
          <div className="relative">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>

              {/* Mock dashboard content */}
              <div className="space-y-4">
                <div className="h-8 w-48 bg-muted rounded-md" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-muted rounded-lg flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Missions</div>
                  </div>
                  <div className="h-24 bg-muted rounded-lg flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-xs text-muted-foreground">En cours</div>
                  </div>
                  <div className="h-24 bg-muted rounded-lg flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-xs text-muted-foreground">Offres</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-muted rounded-lg" />
                  <div className="h-16 bg-muted rounded-lg" />
                  <div className="h-16 bg-muted rounded-lg" />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureStep({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: number
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}
