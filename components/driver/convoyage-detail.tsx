"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Car, Euro, User, Star, Loader2, Check, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { ConvoyageData } from "@/lib/convoyage-store"

export function ConvoyageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [convoyage, setConvoyage] = useState<ConvoyageData | null>(null)
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const convoyageId = params.id as string

  useEffect(() => {
    const loadConvoyage = async () => {
      try {
        const response = await fetch(`/api/convoyages/${convoyageId}`)
        if (!response.ok) throw new Error("Convoyage not found")
        const data = await response.json()
        setConvoyage(data)
        console.log("[v0] Loaded convoyage:", data.id)
      } catch (error) {
        console.error("[v0] Error loading convoyage:", error)
        setError("Impossible de charger les détails du convoyage")
      } finally {
        setIsLoading(false)
      }
    }
    loadConvoyage()
  }, [convoyageId])

  const handleSubmit = async () => {
    if (!price || !convoyage) return
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/offers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convoyageId: convoyage.id,
          driverId: "driver_001", // In real app, get from session
          driverName: "Mohammed Ahmed",
          driverRating: 4.8,
          proposedPrice: parseFloat(price),
          estimatedDuration: "4h30",
          message: message,
        }),
      })

      if (!response.ok) throw new Error("Failed to create offer")

      console.log("[v0] Offer created successfully")
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting offer:", error)
      setIsSubmitting(false)
      alert("Erreur lors de l'envoi de l'offre")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !convoyage) {
    return (
      <Card className="bg-card max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Erreur</h2>
          <p className="text-muted-foreground mb-6">{error || "Convoyage non trouvé"}</p>
          <Button asChild>
            <Link href="/driver/available">Retour aux convoyages</Link>
          </Button>
        </CardContent>
      </Card>
    )
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
                  <p className="font-medium text-foreground">{convoyage.vehicleBrand}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modèle</p>
                  <p className="font-medium text-foreground">{convoyage.vehicleModel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{convoyage.vehicleType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Immatriculation</p>
                  <p className="font-medium text-foreground">{convoyage.vehiclePlate}</p>
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
                  <p className="font-medium text-foreground">{convoyage.pickupAddress}</p>
                  <p className="text-muted-foreground">
                    {convoyage.pickupCity}, {convoyage.pickupPostalCode}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-success mb-2">Arrivée</p>
                  <p className="font-medium text-foreground">{convoyage.deliveryAddress}</p>
                  <p className="text-muted-foreground">
                    {convoyage.deliveryCity}, {convoyage.deliveryPostalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 p-4 rounded-lg bg-primary/5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{convoyage.estimatedDistance} km</p>
                  <p className="text-sm text-muted-foreground">Distance</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">~{Math.round((convoyage.estimatedDistance || 0) / 100)}h</p>
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
                  <p className="font-medium text-foreground">{new Date(convoyage.preferredDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flexibilité</p>
                  <p className="font-medium text-foreground">{convoyage.flexibleDates}</p>
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
                  <p className="font-medium text-foreground">Client Convoyageos</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>4.7</span>
                    <span>•</span>
                    <span>12 convoyages</span>
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
