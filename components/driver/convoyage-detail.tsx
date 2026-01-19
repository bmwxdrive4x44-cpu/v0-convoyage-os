"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Car, Euro, User, Star, Loader2, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ConvoyageDetail {
  id: string
  vehicle: {
    brand: string
    model: string
    type: string
    plate: string
  }
  pickup: {
    address: string
    city: string
    postalCode: string
  }
  delivery: {
    address: string
    city: string
    postalCode: string
  }
  date: string
  flexibility: string
  distance: string
  estimatedDuration: string
  notes: string
  client: {
    name: string
    rating: number
    convoyages: number
  }
}

const convoyage: ConvoyageDetail = {
  id: "1",
  vehicle: {
    brand: "BMW",
    model: "Série 3",
    type: "Berline",
    plate: "AB-123-CD",
  },
  pickup: {
    address: "45 Avenue des Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
  },
  delivery: {
    address: "12 Rue de la République",
    city: "Lyon",
    postalCode: "69001",
  },
  date: "18 Janvier 2026",
  flexibility: "+/- 1-2 jours",
  distance: "465 km",
  estimatedDuration: "4h30",
  notes:
    "Véhicule en excellent état. Merci de le traiter avec soin. Clés à récupérer à l'accueil du parking. Contact sur place: 06 XX XX XX XX",
  client: {
    name: "Jean Dupont",
    rating: 4.7,
    convoyages: 12,
  },
}

export function ConvoyageDetailPage() {
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-card max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Offre envoyée !</h2>
          <p className="text-muted-foreground mb-6">
            Votre proposition a été envoyée au client. Vous serez notifié de sa réponse.
          </p>
          <Button asChild>
            <Link href="/driver/available">Voir d'autres convoyages</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/driver/available"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux convoyages
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <CardTitle>Véhicule</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Marque</p>
                  <p className="font-medium text-foreground">{convoyage.vehicle.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modèle</p>
                  <p className="font-medium text-foreground">{convoyage.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{convoyage.vehicle.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Immatriculation</p>
                  <p className="font-medium text-foreground">{convoyage.vehicle.plate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Trajet</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-primary mb-2">Départ</p>
                  <p className="font-medium text-foreground">{convoyage.pickup.address}</p>
                  <p className="text-muted-foreground">
                    {convoyage.pickup.city}, {convoyage.pickup.postalCode}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-success mb-2">Arrivée</p>
                  <p className="font-medium text-foreground">{convoyage.delivery.address}</p>
                  <p className="text-muted-foreground">
                    {convoyage.delivery.city}, {convoyage.delivery.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 p-4 rounded-lg bg-primary/5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{convoyage.distance}</p>
                  <p className="text-sm text-muted-foreground">Distance</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{convoyage.estimatedDuration}</p>
                  <p className="text-sm text-muted-foreground">Durée estimée</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Notes */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Date et informations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date souhaitée</p>
                  <p className="font-medium text-foreground">{convoyage.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flexibilité</p>
                  <p className="font-medium text-foreground">{convoyage.flexibility}</p>
                </div>
              </div>

              {convoyage.notes && (
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-foreground mb-2">Notes du client</p>
                  <p className="text-muted-foreground">{convoyage.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Client</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{convoyage.client.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>{convoyage.client.rating}</span>
                    <span>•</span>
                    <span>{convoyage.client.convoyages} convoyages</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Offer */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <CardTitle>Proposer une offre</CardTitle>
              </div>
              <CardDescription>Soumettez votre proposition pour ce convoyage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Votre prix (€)</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="180"
                    className="pl-10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Présentez-vous et expliquez pourquoi vous êtes le conducteur idéal..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleSubmit} disabled={!price || isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Envoyer mon offre
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
