"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeStatus } from "@/components/ui/badge-status"
import { AlertTriangle, MessageSquare, User, Car, Calendar, Eye } from "lucide-react"

interface Dispute {
  id: string
  missionId: string
  vehicle: string
  reason: string
  reportedBy: string
  reportedByRole: "client" | "driver"
  createdAt: string
  status: "pending" | "in-progress" | "completed"
}

const disputes: Dispute[] = []

export function DisputesList() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Litiges signalés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="p-4 rounded-lg bg-secondary/50 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">Litige #{dispute.id}</h4>
                      <BadgeStatus status={dispute.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">Mission #{dispute.missionId}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Traiter
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Car className="h-4 w-4" />
                  <span>{dispute.vehicle}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{dispute.createdAt}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-background/50">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {dispute.reportedBy} ({dispute.reportedByRole === "client" ? "Client" : "Conducteur"})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{dispute.reason}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter le client
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter le conducteur
                </Button>
              </div>
            </div>
          ))}
          {disputes.length === 0 && <p className="text-muted-foreground text-center py-8">Aucun litige en cours</p>}
        </div>
      </CardContent>
    </Card>
  )
}
