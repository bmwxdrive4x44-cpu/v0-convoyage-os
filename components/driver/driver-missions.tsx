"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/ui/badge-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Car, Euro, Phone, MessageSquare } from "lucide-react"

interface Mission {
  id: string
  vehicle: string
  pickupLocation: string
  deliveryLocation: string
  date: string
  price: number
  status: "upcoming" | "in-progress" | "completed"
  client: {
    name: string
    phone: string
  }
}

const missions: Mission[] = []

export function DriverMissions() {
  const upcomingMissions = missions.filter((m) => m.status === "upcoming")
  const inProgressMissions = missions.filter((m) => m.status === "in-progress")
  const completedMissions = missions.filter((m) => m.status === "completed")

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="active">En cours ({inProgressMissions.length})</TabsTrigger>
        <TabsTrigger value="upcoming">À venir ({upcomingMissions.length})</TabsTrigger>
        <TabsTrigger value="completed">Terminées ({completedMissions.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <MissionsList missions={inProgressMissions} showActions />
      </TabsContent>
      <TabsContent value="upcoming">
        <MissionsList missions={upcomingMissions} showActions />
      </TabsContent>
      <TabsContent value="completed">
        <MissionsList missions={completedMissions} showActions={false} />
      </TabsContent>
    </Tabs>
  )
}

function MissionsList({ missions, showActions }: { missions: Mission[]; showActions: boolean }) {
  if (missions.length === 0) {
    return (
      <Card className="bg-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Aucune mission dans cette catégorie</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {missions.map((mission) => (
        <Card key={mission.id} className="bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground">{mission.vehicle}</h4>
                    <BadgeStatus status={mission.status} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {mission.pickupLocation} → {mission.deliveryLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {mission.date}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Euro className="h-3 w-3" />
                      {mission.price} €
                    </span>
                  </div>

                  {/* Client info */}
                  <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Client</p>
                    <p className="font-medium text-foreground">{mission.client.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {mission.client.phone}
                    </p>
                  </div>
                </div>
              </div>

              {showActions && (
                <div className="flex flex-col gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  {mission.status === "in-progress" && <Button size="sm">Marquer comme terminé</Button>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
