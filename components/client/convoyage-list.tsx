"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/ui/badge-status"
import { MapPin, Calendar, Car, ArrowRight, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import type { ConvoyageData } from "@/lib/convoyage-store"
import { convoyageStore } from "@/lib/convoyage-store"

interface ConvoyageDisplay extends ConvoyageData {
  offersCount: number
}

export function ConvoyageList() {
  const [convoyages, setConvoyages] = useState<ConvoyageDisplay[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadConvoyages = async () => {
      try {
        const response = await fetch("/api/convoyages/client?clientId=client_001")
        if (response.ok) {
          const data = await response.json()
          const convoyagesWithOffers = data.map((c: ConvoyageData) => ({
            ...c,
            offersCount: convoyageStore.getOffersByConvoyageId(c.id).length,
          }))
          setConvoyages(convoyagesWithOffers.slice(0, 3))
          console.log("[v0] Loaded convoyages:", convoyagesWithOffers.length)
        }
      } catch (error) {
        console.error("[v0] Error loading convoyages:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadConvoyages()
  }, [])
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Convoyages récents</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/client/convoyages">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : convoyages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucun convoyage pour le moment</p>
        ) : (
          <div className="space-y-4">
            {convoyages.map((convoyage) => (
              <div
                key={convoyage.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{convoyage.vehicleBrand} {convoyage.vehicleModel}</h4>
                      <BadgeStatus status={convoyage.status} />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {convoyage.pickupCity} → {convoyage.deliveryCity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(convoyage.preferredDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {convoyage.offersCount > 0 && (
                    <span className="text-sm text-primary font-medium">{convoyage.offersCount} offres</span>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/client/convoyages/${convoyage.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Link>
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
