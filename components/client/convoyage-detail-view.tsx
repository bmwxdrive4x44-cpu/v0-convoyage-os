"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  Car,
  Euro,
  User,
  MessageSquare,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"
import type { ConvoyageData } from "@/lib/convoyage-store"
import { BadgeStatus } from "@/components/ui/badge-status"

interface ConvoyageDetailViewProps {
  convoyageId: string
}

export function ConvoyageDetailView({ convoyageId }: ConvoyageDetailViewProps) {
  const [convoyage, setConvoyage] = useState<ConvoyageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadConvoyage = async () => {
      try {
        const response = await fetch(`/api/convoyages/${convoyageId}`)
        if (!response.ok) throw new Error("Convoyage not found")
        const data = await response.json()
        setConvoyage(data)
        console.log("[v0] Loaded convoyage:", data.id)
      } catch (err) {
        console.error("[v0] Error loading convoyage:", err)
        setError("Impossible de charger les détails du convoyage")
      } finally {
        setIsLoading(false)
      }
    }
    loadConvoyage()
  }, [convoyageId])

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
            <Link href="/client/convoyages">Retour aux convoyages</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/client/convoyages"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux convoyages
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {convoyage.vehicleBrand} {convoyage.vehicleModel}
                  </CardTitle>
                  <CardDescription>{convoyage.vehicleType}</CardDescription>
                </div>
                <BadgeStatus status={convoyage.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Immatriculation</p>
                  <p className="font-medium text-foreground">{convoyage.vehiclePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Année</p>
                  <p className="font-medium text-foreground">{convoyage.vehicleYear || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Trajet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-primary mb-2">Départ</p>
                  <p className="font-medium text-foreground">{convoyage.pickupAddress}</p>
                  <p className="text-sm text-muted-foreground">
                    {convoyage.pickupPostalCode} {convoyage.pickupCity}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-success mb-2">Arrivée</p>
                  <p className="font-medium text-foreground">{convoyage.deliveryAddress}</p>
                  <p className="text-sm text-muted-foreground">
                    {convoyage.deliveryPostalCode} {convoyage.deliveryCity}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/5">
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-2xl font-bold text-primary">{convoyage.estimatedDistance} km</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <p className="text-sm text-muted-foreground">Durée estimée</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round((convoyage.estimatedDistance || 0) / 100)}h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Info */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Date et informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date souhaitée</p>
                  <p className="font-medium text-foreground">
                    {new Date(convoyage.preferredDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flexibilité</p>
                  <p className="font-medium text-foreground">{convoyage.flexibleDates}</p>
                </div>
              </div>

              {convoyage.notes && (
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-foreground mb-2">Notes</p>
                  <p className="text-muted-foreground">{convoyage.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>État du convoyage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                {convoyage.status === "pending" ? (
                  <>
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-foreground">En attente d'offres</p>
                      <p className="text-sm text-muted-foreground">Conducteurs peuvent proposer</p>
                    </div>
                  </>
                ) : convoyage.status === "accepted" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">Offre acceptée</p>
                      <p className="text-sm text-muted-foreground">Convoyage confirmé</p>
                    </div>
                  </>
                ) : convoyage.status === "in-progress" ? (
                  <>
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">En cours</p>
                      <p className="text-sm text-muted-foreground">Convoyage en déplacement</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">Terminé</p>
                      <p className="text-sm text-muted-foreground">Convoyage livré</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            {convoyage.status === "pending" && (
              <Button className="w-full" disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                Offres en attente
              </Button>
            )}
            {convoyage.status === "accepted" && (
              <Button className="w-full" disabled>
                <CheckCircle className="mr-2 h-4 w-4" />
                Offre acceptée
              </Button>
            )}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/client">Retour au dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
