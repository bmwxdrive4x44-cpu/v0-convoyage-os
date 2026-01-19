import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  FileText,
  Users,
  CreditCard,
  FileSignature,
  MapPin,
  CheckCircle,
  Car,
  Package,
  Star,
  MessageSquare,
  Navigation,
} from "lucide-react"

const clientSteps = [
  {
    number: 1,
    title: "Créez votre compte gratuitement",
    description:
      "Inscrivez-vous en quelques secondes avec votre email. Aucun frais d'inscription. Vous pouvez publier votre première mission immédiatement.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Publiez votre mission",
    description: "Renseignez les détails de votre transport :",
    icon: FileText,
    details: [
      { icon: Car, label: "Convoyage véhicule", text: "Marque, modèle, immatriculation, kilométrage..." },
      { icon: Package, label: "Transport marchandise", text: "Poids, dimensions, nature des biens..." },
    ],
    note: "L'adresse de départ et d'arrivée sont géolocalisées. La distance et durée estimée sont calculées automatiquement.",
  },
  {
    number: 3,
    title: "Recevez des propositions",
    description:
      "Les conducteurs vérifiés de notre réseau consultent votre mission et vous envoient leurs propositions tarifaires. Vous pouvez voir leur note moyenne, leurs avis et leur badge de vérification.",
    icon: Users,
    showDriverCard: true,
  },
  {
    number: 4,
    title: "Acceptez et payez en ligne",
    description:
      "Choisissez la proposition qui vous convient et payez en toute sécurité. Les fonds sont conservés en séquestre jusqu'à la livraison.",
    icon: CreditCard,
    badges: ["EUR", "USD", "GBP", "MAD", "DZD", "TND", "CHF"],
    note: "Paiement sécurisé par Stripe",
  },
  {
    number: 5,
    title: "Signez le contrat électroniquement",
    description:
      "Un contrat de transport est généré automatiquement. Vous le signez directement sur la plateforme via notre canvas de signature. Ce contrat a valeur juridique.",
    icon: FileSignature,
  },
  {
    number: 6,
    title: "Suivez en temps réel",
    description:
      "Pendant le transport, suivez la position GPS du conducteur en direct sur la carte. Échangez avec lui via la messagerie intégrée en cas de besoin.",
    icon: MapPin,
    features: [
      { icon: Navigation, label: "GPS en direct" },
      { icon: MessageSquare, label: "Chat intégré" },
    ],
  },
  {
    number: 7,
    title: "Confirmez la réception et notez",
    description:
      "À la livraison, confirmez la bonne réception et signez numériquement. Le paiement est alors libéré au conducteur. N'oubliez pas de laisser une note pour aider la communauté !",
    icon: CheckCircle,
    isLast: true,
  },
]

export function HowItWorksClient() {
  return (
    <section className="mb-24">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Pour les Clients</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-8">
          {clientSteps.map((step) => (
            <div key={step.number} className="relative">
              {/* Step number circle */}
              <div className="absolute left-0 top-0 hidden md:flex">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>
              </div>

              <Card className="md:ml-20 bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Mobile number */}
                    <div className="md:hidden h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>

                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      {step.details && (
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <detail.icon className="h-5 w-5 text-primary" />
                                <span className="font-medium text-foreground">{detail.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{detail.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.note && (
                        <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 border-l-2 border-primary">
                          {step.note}
                        </p>
                      )}

                      {step.showDriverCard && (
                        <div className="inline-flex items-center gap-3 bg-muted/50 rounded-lg p-4 mt-2">
                          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                                Conducteur vérifié
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-sm text-muted-foreground">Note</span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium text-foreground">4.8/5</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.badges && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {step.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="bg-muted/50">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {step.features && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="inline-flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-2">
                              <feature.icon className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-foreground">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.isLast && (
                        <div className="flex items-center gap-2 mt-4 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Mission terminée avec succès !</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
