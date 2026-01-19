"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  CreditCard,
  Shield,
  Home,
  Check,
  X,
  Eye,
  Loader2,
  ArrowLeft,
  Download,
} from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  name: string
  icon: React.ElementType
  file: string
  uploadedAt: string
}

interface DriverApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  experience: string
  submittedAt: string
  documents: Document[]
}

const application: DriverApplication = {
  id: "1",
  firstName: "Marc",
  lastName: "Lefebvre",
  email: "marc.lefebvre@email.com",
  phone: "06 12 34 56 78",
  experience: "5 ans",
  submittedAt: "15 Janvier 2026, 14:32",
  documents: [
    {
      id: "id-card",
      name: "Pièce d'identité",
      icon: CreditCard,
      file: "carte_identite.pdf",
      uploadedAt: "15 Jan 2026",
    },
    {
      id: "license",
      name: "Permis de conduire",
      icon: FileText,
      file: "permis_conduire.pdf",
      uploadedAt: "15 Jan 2026",
    },
    {
      id: "insurance",
      name: "Attestation d'assurance",
      icon: Shield,
      file: "assurance.pdf",
      uploadedAt: "15 Jan 2026",
    },
    {
      id: "address",
      name: "Justificatif de domicile",
      icon: Home,
      file: "justificatif_domicile.pdf",
      uploadedAt: "15 Jan 2026",
    },
  ],
}

export function DriverValidationPage() {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null)

  const handleApprove = async () => {
    setIsApproving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsApproving(false)
    setDecision("approved")
  }

  const handleReject = async () => {
    setIsRejecting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRejecting(false)
    setDecision("rejected")
  }

  if (decision) {
    return (
      <Card className="bg-card max-w-lg mx-auto">
        <CardContent className="p-12 text-center">
          <div
            className={`h-16 w-16 rounded-full ${decision === "approved" ? "bg-success/20" : "bg-destructive/20"} flex items-center justify-center mx-auto mb-6`}
          >
            {decision === "approved" ? (
              <Check className="h-8 w-8 text-success" />
            ) : (
              <X className="h-8 w-8 text-destructive" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {decision === "approved" ? "Conducteur approuvé" : "Candidature refusée"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {decision === "approved"
              ? `${application.firstName} ${application.lastName} peut maintenant accéder à la plateforme.`
              : `${application.firstName} ${application.lastName} a été notifié du refus.`}
          </p>
          <Button asChild>
            <Link href="/admin/drivers">Retour à la liste</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/drivers"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Driver Info */}
        <Card className="bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle>Candidat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {application.firstName[0]}
                  {application.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                {application.firstName} {application.lastName}
              </h2>
              <p className="text-sm text-warning">En attente de validation</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{application.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{application.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{application.experience} d'expérience</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Soumis le {application.submittedAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Documents */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents soumis
              </CardTitle>
              <CardDescription>Vérifiez la validité et l'authenticité de chaque document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <doc.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.file} • Téléchargé le {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Decision */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Décision</CardTitle>
              <CardDescription>Approuvez ou refusez cette candidature</CardDescription>
            </CardHeader>
            <CardContent>
              {!showRejectForm ? (
                <div className="flex gap-4">
                  <Button className="flex-1" onClick={handleApprove} disabled={isApproving}>
                    {isApproving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Check className="mr-2 h-4 w-4" />
                    Approuver le conducteur
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setShowRejectForm(true)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Refuser
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Raison du refus</label>
                    <Textarea
                      placeholder="Expliquez pourquoi cette candidature est refusée..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowRejectForm(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleReject}
                      disabled={!rejectionReason || isRejecting}
                    >
                      {isRejecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmer le refus
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
