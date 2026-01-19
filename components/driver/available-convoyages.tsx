"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Car, Euro, Filter, Search, Eye } from "lucide-react"
import Link from "next/link"

interface Convoyage {
  id: string
  vehicle: string
  vehicleType: string
  pickupLocation: string
  deliveryLocation: string
  date: string
  distance: string
  estimatedPrice: string
  clientRating: number
}

const convoyages: Convoyage[] = [
  {
    id: "1",
    vehicle: "BMW Série 3",
    vehicleType: "Berline",
    pickupLocation: "Paris, 75001",
    deliveryLocation: "Lyon, 69001",
    date: "18 Jan 2026",
    distance: "465 km",
    estimatedPrice: "150-200 €",
    clientRating: 4.7,
  },
  {
    id: "2",
    vehicle: "Mercedes GLC",
    vehicleType: "SUV",
    pickupLocation: "Bordeaux, 33000",
    deliveryLocation: "Toulouse, 31000",
    date: "19 Jan 2026",
    distance: "243 km",
    estimatedPrice: "100-130 €",
    clientRating: 4.9,
  },
  {
    id: "3",
    vehicle: "Porsche 911",
    vehicleType: "Sportive",
    pickupLocation: "Nice, 06000",
    deliveryLocation: "Monaco",
    date: "20 Jan 2026",
    distance: "20 km",
    estimatedPrice: "80-120 €",
    clientRating: 5.0,
  },
  {
    id: "4",
    vehicle: "Peugeot 308",
    vehicleType: "Berline",
    pickupLocation: "Marseille, 13001",
    deliveryLocation: "Montpellier, 34000",
    date: "21 Jan 2026",
    distance: "170 km",
    estimatedPrice: "80-100 €",
    clientRating: 4.5,
  },
]

export function AvailableConvoyages() {
  const [searchQuery, setSearchQuery] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")

  const filteredConvoyages = convoyages.filter((c) => {
    const matchesSearch =
      c.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = vehicleFilter === "all" || c.vehicleType.toLowerCase() === vehicleFilter
    return matchesSearch && matchesType
  })

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Convoyages disponibles</CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="berline">Berline</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sportive">Sportive</SelectItem>
                <SelectItem value="citadine">Citadine</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredConvoyages.map((convoyage) => (
            <div
              key={convoyage.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground">{convoyage.vehicle}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {convoyage.vehicleType}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {convoyage.pickupLocation} → {convoyage.deliveryLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {convoyage.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-muted-foreground">{convoyage.distance}</span>
                    <span className="text-primary font-medium flex items-center gap-1">
                      <Euro className="h-3 w-3" />
                      {convoyage.estimatedPrice}
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href={`/driver/convoyage/${convoyage.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </Link>
              </Button>
            </div>
          ))}
          {filteredConvoyages.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Aucun convoyage trouvé</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
