"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, MapPin, Calendar, FileText, Loader2, Check } from "lucide-react"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"

interface ConvoyageFormData {
  vehicleBrand: string
  vehicleModel: string
  vehicleType: string
  vehiclePlate: string
  pickupAddress: string
  pickupCity: string
  pickupPostalCode: string
  pickupLat: number | null
  pickupLon: number | null
  deliveryAddress: string
  deliveryCity: string
  deliveryPostalCode: string
  deliveryLat: number | null
  deliveryLon: number | null
  preferredDate: string
  flexibleDates: string
  notes: string
}

export function ConvoyageForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ConvoyageFormData>({
    vehicleBrand: "",
    vehicleModel: "",
    vehicleType: "",
    vehiclePlate: "",
    pickupAddress: "",
    pickupCity: "",
    pickupPostalCode: "",
    pickupLat: null,
    pickupLon: null,
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPostalCode: "",
    deliveryLat: null,
    deliveryLon: null,
    preferredDate: "",
    flexibleDates: "",
    notes: "",
  })

  const handleChange =
    (field: keyof ConvoyageFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSelectChange = (field: keyof ConvoyageFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-card max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Demande envoyée !</h2>
          <p className="text-muted-foreground mb-6">
            Votre demande de convoyage a été publiée. Vous recevrez des offres de conducteurs sous peu.
          </p>
          <Button asChild>
            <a href="/client">Retour au tableau de bord</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          {[1, 2, 3].map((s) => (
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
              {s < 3 && <div className={`w-12 h-0.5 ${s < step ? "bg-success" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>
        <CardTitle>
          {step === 1 && "Informations du véhicule"}
          {step === 2 && "Adresses de prise en charge et livraison"}
          {step === 3 && "Dates et notes"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Décrivez le véhicule à convoyer"}
          {step === 2 && "Indiquez les lieux de départ et d'arrivée"}
          {step === 3 && "Finalisez votre demande"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Car className="h-5 w-5" />
                <span className="font-medium">Véhicule</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">Marque</Label>
                  <Input
                    id="vehicleBrand"
                    placeholder="Ex: BMW"
                    value={formData.vehicleBrand}
                    onChange={handleChange("vehicleBrand")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Modèle</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="Ex: Série 3"
                    value={formData.vehicleModel}
                    onChange={handleChange("vehicleModel")}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Type</Label>
                  <Select value={formData.vehicleType} onValueChange={handleSelectChange("vehicleType")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citadine">Citadine</SelectItem>
                      <SelectItem value="berline">Berline</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="utilitaire">Utilitaire</SelectItem>
                      <SelectItem value="sportive">Sportive</SelectItem>
                      <SelectItem value="luxe">Luxe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">Immatriculation</Label>
                  <Input
                    id="vehiclePlate"
                    placeholder="AA-123-BB"
                    value={formData.vehiclePlate}
                    onChange={handleChange("vehiclePlate")}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Continuer
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Prise en charge</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Adresse</Label>
                    <AddressAutocomplete
                      id="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={(value) => setFormData((prev) => ({ ...prev, pickupAddress: value }))}
                      onSelect={(suggestion) => {
                        setFormData((prev) => ({
                          ...prev,
                          pickupAddress: suggestion.address,
                          pickupCity: suggestion.city,
                          pickupPostalCode: suggestion.postalCode,
                          pickupLat: suggestion.lat,
                          pickupLon: suggestion.lon,
                        }))
                      }}
                      placeholder="Rechercher une adresse de départ..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupCity">Ville</Label>
                      <Input
                        id="pickupCity"
                        placeholder="Paris"
                        value={formData.pickupCity}
                        onChange={handleChange("pickupCity")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupPostalCode">Code postal</Label>
                      <Input
                        id="pickupPostalCode"
                        placeholder="75001"
                        value={formData.pickupPostalCode}
                        onChange={handleChange("pickupPostalCode")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-success mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Livraison</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Adresse</Label>
                    <AddressAutocomplete
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(value) => setFormData((prev) => ({ ...prev, deliveryAddress: value }))}
                      onSelect={(suggestion) => {
                        setFormData((prev) => ({
                          ...prev,
                          deliveryAddress: suggestion.address,
                          deliveryCity: suggestion.city,
                          deliveryPostalCode: suggestion.postalCode,
                          deliveryLat: suggestion.lat,
                          deliveryLon: suggestion.lon,
                        }))
                      }}
                      placeholder="Rechercher une adresse d'arrivée..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryCity">Ville</Label>
                      <Input
                        id="deliveryCity"
                        placeholder="Lyon"
                        value={formData.deliveryCity}
                        onChange={handleChange("deliveryCity")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryPostalCode">Code postal</Label>
                      <Input
                        id="deliveryPostalCode"
                        placeholder="69001"
                        value={formData.deliveryPostalCode}
                        onChange={handleChange("deliveryPostalCode")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                  Retour
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Continuer
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Dates</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Date souhaitée</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange("preferredDate")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flexibleDates">Flexibilité</Label>
                  <Select value={formData.flexibleDates} onValueChange={handleSelectChange("flexibleDates")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Date exacte</SelectItem>
                      <SelectItem value="1-2days">+/- 1-2 jours</SelectItem>
                      <SelectItem value="week">+/- 1 semaine</SelectItem>
                      <SelectItem value="flexible">Très flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Notes (optionnel)</span>
                </div>
                <Textarea
                  id="notes"
                  placeholder="Informations complémentaires pour le conducteur..."
                  value={formData.notes}
                  onChange={handleChange("notes")}
                  rows={4}
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                  Retour
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publier la demande
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
