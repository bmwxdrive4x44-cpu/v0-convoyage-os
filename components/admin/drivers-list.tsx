"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BadgeStatus } from "@/components/ui/badge-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Star, Car } from "lucide-react"
import Link from "next/link"

interface Driver {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  status: "pending" | "accepted" | "rejected"
  submittedAt?: string
  approvedAt?: string
  missions?: number
  rating?: number
}

const drivers: Driver[] = []

export function DriversList() {
  const [searchQuery, setSearchQuery] = useState("")

  const pendingDrivers = drivers.filter((d) => d.status === "pending")
  const approvedDrivers = drivers.filter((d) => d.status === "accepted")
  const rejectedDrivers = drivers.filter((d) => d.status === "rejected")

  const filterDrivers = (driverList: Driver[]) =>
    driverList.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un conducteur..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pending">En attente ({pendingDrivers.length})</TabsTrigger>
          <TabsTrigger value="approved">Approuvés ({approvedDrivers.length})</TabsTrigger>
          <TabsTrigger value="rejected">Refusés ({rejectedDrivers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <DriversTable drivers={filterDrivers(pendingDrivers)} showValidationButton />
        </TabsContent>
        <TabsContent value="approved">
          <DriversTable drivers={filterDrivers(approvedDrivers)} showStats />
        </TabsContent>
        <TabsContent value="rejected">
          <DriversTable drivers={filterDrivers(rejectedDrivers)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DriversTable({
  drivers,
  showValidationButton = false,
  showStats = false,
}: {
  drivers: Driver[]
  showValidationButton?: boolean
  showStats?: boolean
}) {
  if (drivers.length === 0) {
    return (
      <Card className="bg-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Aucun conducteur trouvé</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">{driver.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{driver.name}</h4>
                    <BadgeStatus status={driver.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{driver.email}</p>
                  {driver.submittedAt && <p className="text-xs text-muted-foreground">Soumis {driver.submittedAt}</p>}
                  {driver.approvedAt && (
                    <p className="text-xs text-muted-foreground">Approuvé le {driver.approvedAt}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {showStats && driver.missions !== undefined && driver.rating !== undefined && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      {driver.missions} missions
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {driver.rating}
                    </span>
                  </div>
                )}

                {showValidationButton ? (
                  <Button asChild>
                    <Link href={`/admin/drivers/${driver.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Examiner
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" asChild className="bg-transparent">
                    <Link href={`/admin/drivers/${driver.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
