"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ArrowRight, Check, X } from "lucide-react"
import Link from "next/link"

interface Offer {
  id: string
  driverName: string
  driverInitials: string
  rating: number
  completedMissions: number
  price: number
  convoyage: string
  message: string
}

const offers: Offer[] = []

export function RecentOffers() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Offres récentes</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/client/offers">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {offers.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucune offre pour le moment</p>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="p-4 rounded-lg bg-secondary/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
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
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{offer.convoyage}</p>
                <p className="text-sm text-foreground">{offer.message}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Accepter
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Refuser
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
