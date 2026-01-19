"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BadgeStatus } from "@/components/ui/badge-status"
import { Star, Check, X, MessageSquare, Car, MapPin } from "lucide-react"

interface Offer {
  id: string
  driverName: string
  driverInitials: string
  rating: number
  completedMissions: number
  price: number
  convoyage: {
    id: string
    vehicle: string
    route: string
    date: string
  }
  message: string
  status: "pending" | "accepted" | "rejected"
}

const offers: Offer[] = [
  {
    id: "1",
    driverName: "Pierre Martin",
    driverInitials: "PM",
    rating: 4.8,
    completedMissions: 45,
    price: 180,
    convoyage: {
      id: "1",
      vehicle: "BMW Série 3",
      route: "Paris → Lyon",
      date: "18 Jan 2026",
    },
    message:
      "Bonjour, je suis disponible pour cette mission. J'ai une grande expérience avec les véhicules premium et je connais bien ce trajet.",
    status: "pending",
  },
  {
    id: "2",
    driverName: "Sophie Durand",
    driverInitials: "SD",
    rating: 4.9,
    completedMissions: 78,
    price: 195,
    convoyage: {
      id: "1",
      vehicle: "BMW Série 3",
      route: "Paris → Lyon",
      date: "18 Jan 2026",
    },
    message:
      "Conductrice expérimentée avec plus de 5 ans d'expérience. Je peux également être flexible sur les horaires.",
    status: "pending",
  },
  {
    id: "3",
    driverName: "Marc Lefebvre",
    driverInitials: "ML",
    rating: 4.7,
    completedMissions: 32,
    price: 165,
    convoyage: {
      id: "2",
      vehicle: "Renault Clio",
      route: "Marseille → Nice",
      date: "20 Jan 2026",
    },
    message: "Je connais parfaitement cette route côtière. Disponible à la date souhaitée.",
    status: "accepted",
  },
]

export function OffersList() {
  const pendingOffers = offers.filter((o) => o.status === "pending")
  const processedOffers = offers.filter((o) => o.status !== "pending")

  return (
    <div className="space-y-6">
      {/* Pending Offers */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Offres en attente ({pendingOffers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} showActions />
          ))}
          {pendingOffers.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Aucune offre en attente</p>
          )}
        </CardContent>
      </Card>

      {/* Processed Offers */}
      {processedOffers.length > 0 && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              Offres traitées ({processedOffers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {processedOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} showActions={false} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function OfferCard({ offer, showActions }: { offer: Offer; showActions: boolean }) {
  return (
    <div className="p-4 rounded-lg bg-secondary/50 space-y-4">
      {/* Convoyage Info */}
      <div className="flex items-center gap-4 pb-3 border-b border-border">
        <Car className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{offer.convoyage.vehicle}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {offer.convoyage.route} • {offer.convoyage.date}
          </p>
        </div>
        <BadgeStatus status={offer.status} />
      </div>

      {/* Driver Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">{offer.driverInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground">{offer.driverName}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{offer.rating}</span>
              <span>•</span>
              <span>{offer.completedMissions} missions</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{offer.price} €</p>
          <p className="text-xs text-muted-foreground">Prix proposé</p>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-foreground bg-background/50 p-3 rounded-lg">{offer.message}</p>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            Accepter l'offre
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Refuser
          </Button>
        </div>
      )}
    </div>
  )
}
