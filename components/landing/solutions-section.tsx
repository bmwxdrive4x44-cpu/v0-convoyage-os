"use client"

import { Button } from "@/components/ui/button"
import { Car, Package, CheckCircle } from "lucide-react"
import Link from "next/link"

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Solutions de Transport</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Que ce soit pour une voiture ou des marchandises, nous avons la solution adaptée à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Convoyage de véhicule */}
          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Car className="h-7 w-7 text-primary" />
            </div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Convoyage de véhicule</span>
            <h3 className="text-xl font-bold text-foreground mt-2 mb-4">
              Déplacement de votre véhicule par un chauffeur professionnel certifié
            </h3>
            <p className="text-muted-foreground mb-6">
              Idéal pour les achats à distance, les déménagements ou les flottes d'entreprise. Voiture, utilitaire,
              moto.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Assurance tous risques incluse
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                État des lieux digitalisé (PDF)
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Couverture Europe & Maghreb
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/auth/client">Simuler un tarif véhicule</Link>
            </Button>
          </div>

          {/* Transport de marchandise */}
          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Transport de marchandise
            </span>
            <h3 className="text-xl font-bold text-foreground mt-2 mb-4">
              Logistique complète pour vos envois vers le Maghreb
            </h3>
            <p className="text-muted-foreground mb-6">
              Nous gérons le transport, le ferry et les formalités administratives vers l'Algérie, le Maroc et la
              Tunisie.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Gestion des douanes simplifiée
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Délais garantis et suivi live
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                Transport sécurisé porte-à-porte
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/auth/client">Demander un devis fret</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
