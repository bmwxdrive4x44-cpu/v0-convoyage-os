"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, Car, FileText, CreditCard, Shield, Home, Check, Clock, Upload } from "lucide-react"

interface DocumentStatus {
  id: string
  name: string
  icon: React.ElementType
  status: "validated" | "pending" | "expired"
  expiryDate?: string
}

const documents: DocumentStatus[] = [
  {
    id: "id-card",
    name: "Pièce d'identité",
    icon: CreditCard,
    status: "validated",
    expiryDate: "15 Mars 2030",
  },
  {
    id: "license",
    name: "Permis de conduire",
    icon: FileText,
    status: "validated",
    expiryDate: "20 Juin 2035",
  },
  {
    id: "insurance",
    name: "Attestation d'assurance",
    icon: Shield,
    status: "validated",
    expiryDate: "31 Dec 2026",
  },
  {
    id: "address",
    name: "Justificatif de domicile",
    icon: Home,
    status: "validated",
  },
]

const stats = {
  completedMissions: 45,
  averageRating: 4.8,
  totalEarnings: 6750,
  memberSince: "Mars 2024",
}

const ratings = [
  { name: "Jean D.", rating: 5, comment: "Excellent conducteur, très professionnel.", date: "12 Jan 2026" },
  { name: "Marie M.", rating: 5, comment: "Ponctuel et soigneux avec le véhicule.", date: "8 Jan 2026" },
  { name: "Pierre L.", rating: 4, comment: "Bonne communication, mission réussie.", date: "2 Jan 2026" },
]

export function DriverProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Profile Summary */}
      <Card className="bg-card lg:col-span-1">
        <CardContent className="pt-6">
          <div className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">PM</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold text-foreground">Pierre Martin</h2>
            <p className="text-muted-foreground">Conducteur</p>
            <div className="inline-flex items-center gap-2 mt-2 rounded-full bg-success/10 border border-success/20 px-3 py-1 text-sm text-success">
              <Check className="h-4 w-4" />
              Vérifié
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Car className="h-4 w-4" />
                Missions complétées
              </span>
              <span className="font-medium text-foreground">{stats.completedMissions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                Note moyenne
              </span>
              <span className="font-medium text-primary">{stats.averageRating}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Membre depuis
              </span>
              <span className="font-medium text-foreground">{stats.memberSince}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Documents Status */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Documents
            </CardTitle>
            <CardDescription>Statut de vos documents administratifs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <doc.icon className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      {doc.expiryDate && <p className="text-sm text-muted-foreground">Expire le {doc.expiryDate}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-sm text-success">
                      <Check className="h-4 w-4" />
                      Validé
                    </span>
                    <Button variant="ghost" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ratings */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Avis reçus
            </CardTitle>
            <CardDescription>Les retours de vos clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratings.map((rating, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{rating.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < rating.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{rating.date}</span>
                  </div>
                  <p className="text-sm text-foreground">{rating.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
