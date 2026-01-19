"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BadgeStatus } from "@/components/ui/badge-status"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Calendar, Car, User, Eye } from "lucide-react"

interface Convoyage {
  id: string
  vehicle: string
  pickupLocation: string
  deliveryLocation: string
  date: string
  status: "pending" | "accepted" | "in-progress" | "completed"
  client: string
  driver?: string
  price?: number
}

const convoyages: Convoyage[] = [
  {
    id: "1",
    vehicle: "BMW Série 3",
    pickupLocation: "Paris",
    deliveryLocation: "Lyon",
    date: "18 Jan 2026",
    status: "pending",
    client: "Jean Dupont",
  },
  {
    id: "2",
    vehicle: "Mercedes GLC",
    pickupLocation: "Bordeaux",
    deliveryLocation: "Toulouse",
    date: "19 Jan 2026",
    status: "accepted",
    client: "Marie Martin",
    driver: "Pierre Martin",
    price: 150,
  },
  {
    id: "3",
    vehicle: "Audi Q5",
    pickupLocation: "Marseille",
    deliveryLocation: "Nice",
    date: "17 Jan 2026",
    status: "in-progress",
    client: "Sophie Lefebvre",
    driver: "Sophie Durand",
    price: 120,
  },
  {
    id: "4",
    vehicle: "Porsche 911",
    pickupLocation: "Lyon",
    deliveryLocation: "Paris",
    date: "15 Jan 2026",
    status: "completed",
    client: "Pierre Durand",
    driver: "Marc Lefebvre",
    price: 200,
  },
]

export function ConvoyagesManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredConvoyages = convoyages.filter((c) => {
    const matchesSearch =
      c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Gestion des convoyages</CardTitle>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepted">Accepté</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
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
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-secondary/50 gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground">{convoyage.vehicle}</h4>
                    <BadgeStatus status={convoyage.status} />
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
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      Client: {convoyage.client}
                    </span>
                    {convoyage.driver && (
                      <span className="flex items-center gap-1 text-success">
                        <User className="h-3 w-3" />
                        Conducteur: {convoyage.driver}
                      </span>
                    )}
                    {convoyage.price && <span className="text-primary font-medium">{convoyage.price} €</span>}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent shrink-0">
                <Eye className="h-4 w-4 mr-2" />
                Détails
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
