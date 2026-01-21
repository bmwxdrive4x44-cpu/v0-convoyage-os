"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-2">Politique de Confidentialité</h1>
        <p className="text-muted-foreground mb-8">Dernière mise à jour: janvier 2026</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>ConvoyageOS ("nous", "notre" ou "nos") exploite le site web ConvoyageOS. Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation de données personnelles lorsque vous utilisez notre service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Types de données collectées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p><strong>Données d'identification :</strong> Nom, prénom, email, téléphone, adresse</p>
              <p><strong>Données bancaires :</strong> Informations de paiement (traitées par nos prestataires)</p>
              <p><strong>Données de véhicule :</strong> Immatriculation, marque, modèle, documents associés</p>
              <p><strong>Données de navigation :</strong> Adresse IP, pages consultées, durée de visite</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Utilisation des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir et maintenir notre service</li>
                <li>Notifier les changements concernant notre service</li>
                <li>Permettre la participation aux fonctionnalités interactives</li>
                <li>Analyser l'utilisation du service</li>
                <li>Détecter les fraudes et violations de sécurité</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Nous utilisons des mesures de sécurité appropriées pour protéger vos données personnelles contre l'accès non autorisé. Cependant, aucune transmission sur Internet n'est entièrement sécurisée.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Vos droits RGPD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Vous avez le droit de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier les données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Demander la portabilité de vos données</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Notre service utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@convoyageos.com</p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-8">
            <Link href="/cgv" className="text-primary hover:underline">
              Conditions Générales
            </Link>
            <Link href="/mentions-legales" className="text-primary hover:underline">
              Mentions Légales
            </Link>
            <Link href="/" className="text-primary hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
