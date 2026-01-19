"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Car, Shield } from "lucide-react"
import Link from "next/link"

const roles = [
  {
    id: "client",
    title: "Client",
    description: "Je souhaite faire convoyer mon véhicule",
    icon: User,
    href: "/auth/client",
    features: ["Créer des demandes de convoyage", "Recevoir des offres de conducteurs", "Paiement sécurisé"],
  },
  {
    id: "driver",
    title: "Conducteur",
    description: "Je souhaite proposer mes services",
    icon: Car,
    href: "/auth/driver",
    features: ["Consulter les missions disponibles", "Proposer vos tarifs", "Gérer vos missions"],
  },
  {
    id: "admin",
    title: "Administrateur",
    description: "Accès réservé aux administrateurs",
    icon: Shield,
    href: "/auth/admin",
    features: ["Valider les conducteurs", "Gérer les litiges", "Supervision globale"],
  },
]

export function RoleSelector() {
  return (
    <section id="roles" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choisissez votre profil</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Accédez à la plateforme selon votre rôle et profitez de fonctionnalités adaptées à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roles.map((role) => (
            <Card key={role.id} className="group hover:border-primary/50 transition-all duration-300 bg-card">
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <role.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={role.href}>{role.id === "admin" ? "Se connecter" : "Commencer"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
