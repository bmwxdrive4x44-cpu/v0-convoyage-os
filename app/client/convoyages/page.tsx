import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/ui/badge-status"
import { MapPin, Calendar, Car, Eye, Plus } from "lucide-react"
import Link from "next/link"

const convoyages = [
  {
    id: "1",
    vehicle: "BMW Série 3",
    vehicleType: "Berline",
    pickupLocation: "Paris, 75001",
    deliveryLocation: "Lyon, 69001",
    date: "18 Jan 2026",
    status: "pending" as const,
    offersCount: 3,
  },
  {
    id: "2",
    vehicle: "Renault Clio",
    vehicleType: "Citadine",
    pickupLocation: "Marseille, 13001",
    deliveryLocation: "Nice, 06000",
    date: "20 Jan 2026",
    status: "accepted" as const,
    offersCount: 0,
  },
  {
    id: "3",
    vehicle: "Audi Q5",
    vehicleType: "SUV",
    pickupLocation: "Bordeaux, 33000",
    deliveryLocation: "Toulouse, 31000",
    date: "15 Jan 2026",
    status: "in-progress" as const,
    offersCount: 0,
  },
  {
    id: "4",
    vehicle: "Mercedes Classe A",
    vehicleType: "Berline",
    pickupLocation: "Lille, 59000",
    deliveryLocation: "Paris, 75001",
    date: "10 Jan 2026",
    status: "completed" as const,
    offersCount: 0,
  },
]

export default function ClientConvoyagesPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mes convoyages</h1>
            <p className="text-muted-foreground mt-1">Consultez et suivez tous vos convoyages.</p>
          </div>
          <Button asChild>
            <Link href="/client/new-request">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau convoyage
            </Link>
          </Button>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Tous les convoyages</CardTitle>
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
                        <span className="text-xs text-muted-foreground">({convoyage.vehicleType})</span>
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
                    <Button variant="outline" size="sm" asChild className="bg-transparent">
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
      </div>
    </DashboardLayout>
  )
}
