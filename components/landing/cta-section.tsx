"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            PRÊT À EXPÉDIER VOTRE
            <br />
            <span className="text-primary">PREMIER VÉHICULE ?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et profitez de notre réseau de conducteurs certifiés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/auth/client">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="#contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contacter l'équipe
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
