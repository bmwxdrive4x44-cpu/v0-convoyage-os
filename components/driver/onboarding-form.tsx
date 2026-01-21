"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Upload,
  FileText,
  CreditCard,
  Shield,
  Home,
  Check,
  Loader2,
  Clock,
  User,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react"

type DocumentStatus = "pending" | "uploading" | "uploaded" | "validated" | "rejected"

interface Document {
  id: string
  name: string
  icon: React.ElementType
  description: string
  status: DocumentStatus
  file?: {
    id: string
    name: string
    size: number
    uploadedAt: string
  }
}

const initialDocuments: Document[] = [
  {
    id: "id-card",
    name: "Pièce d'identité",
    icon: CreditCard,
    description: "Carte d'identité ou passeport",
    status: "pending",
  },
  {
    id: "license",
    name: "Permis de conduire",
    icon: FileText,
    description: "Permis B valide",
    status: "pending",
  },
  {
    id: "insurance",
    name: "Attestation d'assurance",
    icon: Shield,
    description: "Assurance convoyage professionnel",
    status: "pending",
  },
  {
    id: "address",
    name: "Justificatif de domicile",
    icon: Home,
    description: "De moins de 3 mois",
    status: "pending",
  },
]

export function DriverOnboardingForm() {
  const [step, setStep] = useState(1)
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
  })

  const handleDocumentSelect = async (docId: string, file: File) => {
    console.log("[v0] Document selected:", { docId, fileName: file.name, fileSize: file.size, fileType: file.type })

    // Validate file
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.log("[v0] File too large:", file.size)
      setUploadErrors((prev) => ({
        ...prev,
        [docId]: "Le fichier ne doit pas dépasser 10MB",
      }))
      return
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]
    if (!allowedTypes.includes(file.type)) {
      console.log("[v0] Invalid file type:", file.type)
      setUploadErrors((prev) => ({
        ...prev,
        [docId]: "Format accepté: PDF, JPEG, PNG",
      }))
      return
    }

    // Clear previous errors
    setUploadErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[docId]
      return newErrors
    })

    // Update status to uploading
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, status: "uploading" as const } : doc))
    )

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("driverId", "driver_001")
      formData.append("docId", docId)

      console.log("[v0] Uploading document to API:", docId)

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Upload response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const fileData = await response.json()
      console.log("[v0] Document uploaded successfully:", fileData)

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                status: "uploaded" as const,
                file: {
                  id: fileData.fileId,
                  name: fileData.fileName,
                  size: fileData.fileSize,
                  uploadedAt: fileData.uploadedAt,
                },
              }
            : doc
        )
      )
    } catch (error) {
      console.error("[v0] Error uploading document:", error)
      setUploadErrors((prev) => ({
        ...prev,
        [docId]: error instanceof Error ? error.message : "Erreur lors de l'upload",
      }))
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === docId ? { ...doc, status: "pending" as const } : doc))
      )
    }
  }

  const handleDocumentUpload = (docId: string) => {
    const fileInput = fileInputRefs.current[docId]
    if (fileInput) {
      fileInput.click()
    }
  }

  const allDocumentsUploaded = documents.every((doc) => doc.status !== "pending")

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // In production, this would send all data to backend
      console.log("[v0] Submitting driver onboarding with documents")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting onboarding:", error)
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-card max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-6">
            <Clock className="h-8 w-8 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Dossier en cours de validation</h2>
          <p className="text-muted-foreground mb-6">
            Votre dossier a été soumis avec succès. Notre équipe va examiner vos documents et vous informera de la
            décision sous 24 à 48 heures.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-warning/10 border border-warning/20 px-4 py-2 text-sm text-warning">
            <Clock className="h-4 w-4" />
            En attente de validation
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 2 && <div className={`w-20 h-0.5 ${s < step ? "bg-success" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>
        <CardTitle>{step === 1 ? "Informations personnelles" : "Documents requis"}</CardTitle>
        <CardDescription>
          {step === 1
            ? "Complétez vos informations pour créer votre profil conducteur"
            : "Téléchargez les documents nécessaires pour valider votre compte"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Pierre"
                    className="pl-10"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData((p) => ({ ...p, firstName: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Martin"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData((p) => ({ ...p, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="pierre@exemple.com"
                  className="pl-10"
                  value={profileData.email}
                  onChange={(e) => setProfileData((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="06 12 34 56 78"
                  className="pl-10"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((p) => ({ ...p, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Années d'expérience en convoyage</Label>
              <Input
                id="experience"
                type="number"
                placeholder="5"
                min="0"
                value={profileData.experience}
                onChange={(e) => setProfileData((p) => ({ ...p, experience: e.target.value }))}
                required
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)}>Continuer</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Documents requis</p>
                <p className="text-sm text-muted-foreground">
                  Tous les documents doivent être lisibles et en cours de validité.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id}>
                  {uploadErrors[doc.id] && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-2">
                      <p className="text-sm text-destructive">{uploadErrors[doc.id]}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          doc.status === "uploaded" ? "bg-success/20" : "bg-primary/10"
                        }`}
                      >
                        <doc.icon
                          className={`h-5 w-5 ${doc.status === "uploaded" ? "text-success" : "text-primary"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{doc.name}</p>
                        {doc.file ? (
                          <p className="text-sm text-muted-foreground">
                            {doc.file.name} • {(doc.file.size / 1024).toFixed(1)}KB
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    {doc.status === "uploading" ? (
                      <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Upload...</span>
                      </div>
                    ) : doc.status === "uploaded" ? (
                      <div className="flex items-center gap-2 text-success">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">Téléchargé</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDocumentUpload(doc.id)}
                        className="bg-transparent"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choisir fichier
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                Retour
              </Button>
              <Button onClick={handleSubmit} disabled={!allDocumentsUploaded || isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Soumettre mon dossier
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
