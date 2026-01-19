"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BadgeStatus } from "@/components/ui/badge-status"
import { Clock, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PendingDriver {
  id: string
  name: string
  initials: string
  email: string
  submittedAt: string
  documentsCount: number
}

const pendingDrivers: PendingDriver[] = [
  {
    id: "1",
    name: "Marc Lefebvre",
    initials: "ML",
    email: "marc.lefebvre@email.com",
    submittedAt: "Il y a 2 heures",
    documentsCount: 4,
  },
  {
    id: "2",
    name: "Claire Moreau",
    initials: "CM",
    email: "claire.moreau@email.com",
    submittedAt: "Il y a 5 heures",
    documentsCount: 4,
  },
  {
    id: "3",
    name: "Thomas Bernard",
    initials: "TB",
    email: "thomas.bernard@email.com",
    submittedAt: "Hier",
    documentsCount: 3,
  },
]

export function PendingDrivers() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-warning" />
          Conducteurs en attente
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/drivers">
            Voir tout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingDrivers.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">{driver.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{driver.name}</h4>
                    <BadgeStatus status="pending" />
                  </div>
                  <p className="text-sm text-muted-foreground">{driver.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Soumis {driver.submittedAt} • {driver.documentsCount} documents
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href={`/admin/drivers/${driver.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Examiner
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
