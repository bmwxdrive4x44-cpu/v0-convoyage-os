"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const faqs = [
  {
    question: "Comment fonctionne ConvoyageOS ?",
    answer: "ConvoyageOS met en relation les clients qui ont besoin de faire convoyer un véhicule avec des conducteurs professionnels. Les clients créent une demande avec les détails du véhicule et de la destination. Les conducteurs proposent leurs services avec leurs tarifs. Une fois acceptée, la mission est confirmée.",
  },
  {
    question: "Quels documents dois-je fournir en tant que conducteur ?",
    answer: "Vous devez fournir: 1) Une pièce d'identité (carte d'identité ou passeport), 2) Un permis de conduire valide, 3) Une attestation d'assurance convoyage professionnel, 4) Un justificatif de domicile de moins de 3 mois.",
  },
  {
    question: "Comment sont fixés les tarifs ?",
    answer: "Les tarifs sont fixés librement par chaque conducteur en fonction de la distance, du type de véhicule, et d'autres facteurs. Les clients peuvent comparer les différentes offres et choisir celle qui leur convient le mieux.",
  },
  {
    question: "Quelle est la commission de ConvoyageOS ?",
    answer: "ConvoyageOS prélève une commission sur chaque service effectué. Cette commission couvre les frais de plateforme, la sécurité, l'assurance clients, et le support.",
  },
  {
    question: "Que se passe-t-il en cas de problème avec le véhicule ?",
    answer: "Chaque conducteur dispose d'une assurance convoyage. En cas de sinistre, une procédure d'arbitrage est mise en place. Nous documentons tout via des photos avant et après le trajet.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Le paiement s'effectue via notre plateforme sécurisée après la confirmation du service. Le client paie directement sur la plateforme, et le conducteur reçoit le paiement une fois le service terminé.",
  },
  {
    question: "Puis-je annuler une réservation ?",
    answer: "Oui, vous pouvez annuler jusqu'à 48 heures avant le service et recevoir un remboursement complet. Les annulations dans les 48 heures entraînent une retenue de 50% des frais.",
  },
  {
    question: "Comment sont évalués les conducteurs ?",
    answer: "Les clients peuvent évaluer les conducteurs après chaque trajet sur une échelle de 1 à 5 étoiles. Cette notation aide à maintenir la qualité du service et aide les autres utilisateurs à choisir les meilleurs conducteurs.",
  },
  {
    question: "Que faire si j'ai un conflit avec un conducteur ?",
    answer: "Contactez notre équipe support via la plateforme. Nous examinerons votre dossier et les preuves (messages, photos, documents) pour résoudre le conflit équitablement.",
  },
  {
    question: "Quels types de véhicules peuvent être convoyés ?",
    answer: "Tous les véhicules légers et poids lourds peuvent être convoyés, y compris les voitures, les fourgonnettes, les camions et les motos.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-2">Questions Fréquemment Posées</h1>
        <p className="text-muted-foreground mb-8">Trouvez les réponses aux questions les plus courantes sur ConvoyageOS</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors"
              >
                <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-primary/5 border border-primary/10">
          <h2 className="font-semibold text-foreground mb-2">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-muted-foreground mb-4">Notre équipe support est disponible pour vous aider.</p>
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contactez-nous
          </Link>
        </div>

        <div className="flex gap-4 pt-8 justify-center">
          <Link href="/comment-ca-marche" className="text-primary hover:underline">
            Comment ça marche
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          <Link href="/" className="text-primary hover:underline">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
