import { Card, CardContent } from "@/components/ui/card"
import {
  UserPlus,
  CreditCard,
  Search,
  Send,
  FileSignature,
  Truck,
  Euro,
  FileCheck,
  Award as IdCard,
  Home,
  Shield,
  MapPin,
  Filter,
  Lightbulb,
  Navigation,
  CheckCircle,
} from "lucide-react"

const driverSteps = [
  {
    number: 1,
    title: "Inscrivez-vous et envoyez vos documents",
    description: "Créez votre compte conducteur et téléversez vos documents pour validation :",
    icon: UserPlus,
    documents: [
      { icon: IdCard, label: "Permis de conduire" },
      { icon: IdCard, label: "Carte d'identité ou passeport" },
      { icon: Home, label: "Justificatif de domicile" },
      { icon: Shield, label: "Attestation d'assurance" },
    ],
    note: 'Notre équipe valide vos documents sous 24-48h. Vous recevez un badge "Conducteur vérifié".',
  },
  {
    number: 2,
    title: "Renseignez vos coordonnées bancaires",
    description:
      'Dans l\'onglet "RIB & Virements", entrez votre IBAN et BIC pour recevoir vos paiements. Nous supportons les comptes européens et nord-africains.',
    icon: CreditCard,
  },
  {
    number: 3,
    title: "Consultez les missions disponibles",
    description:
      "Parcourez les missions publiées par les clients. Utilisez la recherche par ville ou activez la géolocalisation pour voir les missions les plus proches de vous.",
    icon: Search,
    features: [
      { icon: MapPin, label: "Recherche par ville" },
      { icon: Filter, label: "Tri par proximité" },
    ],
  },
  {
    number: 4,
    title: "Envoyez votre proposition",
    description:
      "Proposez votre tarif au client. Un message informatif vous indique la commission de la plateforme (10%) et le montant net que vous recevrez.",
    icon: Send,
    tip: "Exemple : Pour une proposition à 100€, vous recevrez 90€ après déduction de la commission.",
  },
  {
    number: 5,
    title: "Mission acceptée : signez et partez !",
    description:
      "Si le client accepte votre offre, signez le contrat électroniquement puis activez le partage GPS pour que le client puisse suivre votre trajet.",
    icon: FileSignature,
    features: [
      { icon: FileCheck, label: "Signature électronique" },
      { icon: Navigation, label: "Partage GPS" },
    ],
  },
  {
    number: 6,
    title: "Livrez et confirmez",
    description:
      "À l'arrivée, confirmez la fin de mission et signez le bon de livraison. Le client confirme la réception de son côté.",
    icon: Truck,
  },
  {
    number: 7,
    title: "Recevez votre paiement",
    description:
      'Une fois la mission validée par le client, le virement est initié sous 7 jours ouvrés sur votre compte bancaire. Suivez tous vos paiements dans l\'onglet "RIB & Virements".',
    icon: Euro,
    isLast: true,
  },
]

export function HowItWorksDriver() {
  return (
    <section className="mb-24">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Truck className="h-6 w-6 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Pour les Conducteurs</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-8">
          {driverSteps.map((step) => (
            <div key={step.number} className="relative">
              {/* Step number circle */}
              <div className="absolute left-0 top-0 hidden md:flex">
                <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg z-10">
                  {step.number}
                </div>
              </div>

              <Card className="md:ml-20 bg-card border-border hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Mobile number */}
                    <div className="md:hidden h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>

                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      {step.documents && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {step.documents.map((doc, idx) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-3 text-center">
                              <doc.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                              <span className="text-xs text-muted-foreground">{doc.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.note && (
                        <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 border-l-2 border-blue-500">
                          {step.note}
                        </p>
                      )}

                      {step.features && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="inline-flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-2">
                              <feature.icon className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-foreground">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.tip && (
                        <div className="flex items-start gap-3 mt-4 bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                          <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{step.tip}</p>
                        </div>
                      )}

                      {step.isLast && (
                        <div className="flex items-center gap-2 mt-4 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Paiement reçu avec succès !</span>
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
