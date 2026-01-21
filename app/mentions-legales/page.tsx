"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-2">Mentions Légales</h1>
        <p className="text-muted-foreground mb-8">Dernière mise à jour: janvier 2026</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Nom :</strong> ConvoyageOS<br />
                <strong>Forme juridique :</strong> SARL<br />
                <strong>Capital social :</strong> À définir<br />
                <strong>Adresse :</strong> À définir<br />
                <strong>Téléphone :</strong> +33 (0)X XX XX XX XX<br />
                <strong>Email :</strong> contact@convoyageos.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilité du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Le site ConvoyageOS est fourni "tel quel" sans garantie d'aucune sorte. ConvoyageOS ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de la plateforme.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Tous les contenus du site (textes, images, logos, etc.) sont la propriété intellectuelle de ConvoyageOS ou de ses partenaires. Toute reproduction sans autorisation est interdite.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Conformément à la RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Veuillez consulter notre politique de confidentialité pour plus d'informations.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hébergeur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Nom :</strong> Vercel<br />
                <strong>Adresse :</strong> San Francisco, USA
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-8">
            <Link href="/confidentialite" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="text-primary hover:underline">
              Conditions Générales
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
