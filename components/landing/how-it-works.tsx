import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Handshake, Truck } from "lucide-react"

const steps = [
  {
    icon: FileText,
    step: "1",
    title: "Créez votre demande",
    description: "Décrivez votre véhicule, les adresses de départ et d'arrivée, et vos préférences de date.",
  },
  {
    icon: Users,
    step: "2",
    title: "Recevez des offres",
    description: "Des conducteurs vérifiés vous envoient leurs propositions avec leurs tarifs.",
  },
  {
    icon: Handshake,
    step: "3",
    title: "Choisissez votre conducteur",
    description: "Comparez les offres, consultez les avis et sélectionnez le conducteur idéal.",
  },
  {
    icon: Truck,
    step: "4",
    title: "Convoyage sécurisé",
    description: "Suivez votre véhicule en temps réel jusqu'à sa destination finale.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et transparent pour faire convoyer votre véhicule en toute sérénité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-card border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="absolute -top-4 left-6">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mt-2">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
