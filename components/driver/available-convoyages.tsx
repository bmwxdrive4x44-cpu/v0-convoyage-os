"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Car, Euro, Filter, Search, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import type { ConvoyageData } from "@/lib/convoyage-store"

export function AvailableConvoyages() {
  const [convoyages, setConvoyages] = useState<ConvoyageData[]>([])
  const [filteredConvoyages, setFilteredConvoyages] = useState<ConvoyageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")

  useEffect(() => {
    const loadConvoyages = async () => {
      try {
        const response = await fetch("/api/convoyages/available")
        if (response.ok) {
          const data = await response.json()
          setConvoyages(data)
          console.log("[v0] Loaded available convoyages:", data.length)
        }
      } catch (error) {
        console.error("[v0] Error loading convoyages:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadConvoyages()
  }, [])

  useEffect(() => {
    const filtered = convoyages.filter((c) => {
      const matchesSearch =
        c.pickupCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.deliveryCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${c.vehicleBrand} ${c.vehicleModel}`.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = vehicleFilter === "all" || c.vehicleType.toLowerCase() === vehicleFilter
      return matchesSearch && matchesType
    })
    setFilteredConvoyages(filtered)
  }, [searchQuery, vehicleFilter, convoyages])

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredConvoyages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucun convoyage trouvé</p>
        ) : (
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
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground">{convoyage.vehicleBrand} {convoyage.vehicleModel}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {convoyage.vehicleType}
                      </span>
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
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-muted-foreground">{convoyage.estimatedDistance} km</span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        <Euro className="h-3 w-3" />
                        À proposer
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
          </div>
        )}
      </CardContent>
    </Card>
  )
}
