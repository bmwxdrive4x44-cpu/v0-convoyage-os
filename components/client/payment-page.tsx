"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Check, Car, MapPin, User, Loader2 } from "lucide-react"

interface PaymentDetails {
  convoyage: {
    vehicle: string
    route: string
    date: string
  }
  driver: {
    name: string
    rating: number
  }
  price: number
  serviceFee: number
}

const paymentDetails: PaymentDetails = {
  convoyage: {
    vehicle: "BMW Série 3",
    route: "Paris → Lyon",
    date: "18 Jan 2026",
  },
  driver: {
    name: "Pierre Martin",
    rating: 4.8,
  },
  price: 180,
  serviceFee: 18,
}

export function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const total = paymentDetails.price + paymentDetails.serviceFee

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsPaid(true)
  }

  if (isPaid) {
    return (
      <Card className="bg-card max-w-lg mx-auto">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Paiement confirmé !</h2>
          <p className="text-muted-foreground mb-6">
            Votre paiement a été effectué avec succès. Le conducteur a été notifié et vous recevrez une confirmation par
            email.
          </p>
          <Button asChild>
            <a href="/client">Retour au tableau de bord</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
      {/* Order Summary */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
          <CardDescription>Détails de votre convoyage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{paymentDetails.convoyage.vehicle}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {paymentDetails.convoyage.route}
              </p>
              <p className="text-sm text-muted-foreground">{paymentDetails.convoyage.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{paymentDetails.driver.name}</p>
              <p className="text-sm text-muted-foreground">Conducteur • {paymentDetails.driver.rating}/5</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prix du convoyage</span>
              <span className="text-foreground">{paymentDetails.price} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frais de service</span>
              <span className="text-foreground">{paymentDetails.serviceFee} €</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span className="text-foreground">Total</span>
              <span className="text-primary text-xl">{total} €</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Paiement sécurisé
          </CardTitle>
          <CardDescription>Vos informations sont protégées</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Nom sur la carte</Label>
            <Input id="cardName" placeholder="Jean Dupont" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Numéro de carte</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiration</Label>
              <Input id="expiry" placeholder="MM/AA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/50">
            <Lock className="h-4 w-4" />
            <span>Paiement sécurisé par SSL</span>
          </div>

          <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Payer {total} €
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
