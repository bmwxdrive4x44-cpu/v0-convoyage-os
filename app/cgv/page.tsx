"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CGVPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-2">Conditions Générales de Vente</h1>
        <p className="text-muted-foreground mb-8">Dernière mise à jour: janvier 2026</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Objet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Les présentes conditions générales de vente définissent les droits et obligations des utilisateurs de la plateforme ConvoyageOS, qu'ils soient clients ou conducteurs.</p>
              <p>En utilisant ConvoyageOS, vous acceptez d'être lié par ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Définitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p><strong>Client :</strong> Personne physique ou morale qui demande un service de convoyage de véhicule.</p>
              <p><strong>Conducteur :</strong> Personne physique autorisée à conduire un véhicule professionnel.</p>
              <p><strong>Plateforme :</strong> Application web ConvoyageOS permettant de mettre en relation clients et conducteurs.</p>
              <p><strong>Service :</strong> Service de convoyage de véhicule d'un point A à un point B.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Responsabilités des Clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes et à jour concernant le véhicule à convoyer</li>
                <li>Payer les frais convenus dans les délais impartis</li>
                <li>S'assurer que le véhicule est en bon état de fonctionnement</li>
                <li>Fournir les documents nécessaires (carte grise, assurance)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Responsabilités des Conducteurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="list-disc pl-6 space-y-2">
                <li>Respecter le code de la route et les lois applicables</li>
                <li>Transporter le véhicule en toute sécurité</li>
                <li>Disposer d'une assurance convoyage valide</li>
                <li>Maintenir la plateforme informée de la progression du service</li>
                <li>Traiter le véhicule avec le soin qu'il mérite</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Tarification et Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Les tarifs sont proposés par les conducteurs et acceptés librement par les clients. Le paiement s'effectue via les moyens proposés sur la plateforme. ConvoyageOS prélève une commission sur chaque service effectué.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Assurance et Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Chaque conducteur doit disposer d'une assurance convoyage professionnel valide. ConvoyageOS n'est pas responsable des dommages au véhicule, sauf en cas de négligence grave de la plateforme.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Annulation et Remboursement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Les annulations effectuées 48 heures avant le service donnent droit à un remboursement complet. Les annulations dans les 48 heures entraînent une retenue de 50% des frais.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Litiges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Tout litige sera traité par notre système d'arbitrage interne. Si vous n'êtes pas satisfait, vous pouvez nous contacter à contact@convoyageos.com.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>ConvoyageOS se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des modifications importantes.</p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-8">
            <Link href="/contact" className="text-primary hover:underline">
              Contactez-nous
            </Link>
            <Link href="/" className="text-primary hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
