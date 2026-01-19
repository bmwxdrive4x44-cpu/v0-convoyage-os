"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/ui/badge-status"
import { MapPin, Calendar, Car, ArrowRight, Eye } from "lucide-react"
import Link from "next/link"

interface Convoyage {
  id: string
  vehicle: string
  vehicleType: string
  pickupLocation: string
  deliveryLocation: string
  date: string
  status: "pending" | "accepted" | "in-progress" | "completed"
  offersCount: number
}

const convoyages: Convoyage[] = [
  {
    id: "1",
    vehicle: "BMW Série 3",
    vehicleType: "Berline",
    pickupLocation: "Paris, 75001",
    deliveryLocation: "Lyon, 69001",
    date: "18 Jan 2026",
    status: "pending",
    offersCount: 3,
  },
  {
    id: "2",
    vehicle: "Renault Clio",
    vehicleType: "Citadine",
    pickupLocation: "Marseille, 13001",
    deliveryLocation: "Nice, 06000",
    date: "20 Jan 2026",
    status: "accepted",
    offersCount: 0,
  },
  {
    id: "3",
    vehicle: "Audi Q5",
    vehicleType: "SUV",
    pickupLocation: "Bordeaux, 33000",
    deliveryLocation: "Toulouse, 31000",
    date: "15 Jan 2026",
    status: "in-progress",
    offersCount: 0,
  },
]

export function ConvoyageList() {
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
        <div className="space-y-4">
          {convoyages.map((convoyage) => (
            <div
              key={convoyage.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{convoyage.vehicle}</h4>
                    <BadgeStatus status={convoyage.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {convoyage.pickupLocation} → {convoyage.deliveryLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {convoyage.date}
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
      </CardContent>
    </Card>
  )
}
