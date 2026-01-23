"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Truck, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [resetLink, setResetLink] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi")
      }

      if (data.resetLink) {
        setResetLink(data.resetLink)
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Retour à la connexion
        </Link>
        <div className="bg-card rounded-xl border p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">ConvoyageOS</span>
          </div>
          {!isSubmitted ? (
            <>
              <div>
                <h1 className="text-2xl font-bold mb-2">Mot de passe oublié ?</h1>
                <p className="text-muted-foreground">
                  Pas de problème ! Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full h-12 text-base" disabled={isLoading || !email}>
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Envoyer le lien
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Vous avez retrouvé votre mot de passe ?{" "}
                  <Link href="/auth/login" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Vérifiez votre email</h2>
                <p className="text-muted-foreground">
                  Un lien de réinitialisation a été envoyé à <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              {resetLink && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Mode développement:</strong> Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe:
                  </p>
                  <Link 
                    href={resetLink.replace(/^https?:\/\/[^/]+/, '')} 
                    className="text-primary text-sm font-medium hover:underline break-all"
                  >
                    Réinitialiser mon mot de passe
                  </Link>
                </div>
              )}
              <Button variant="outline" className="w-full h-12 bg-transparent" asChild>
                <Link href="/auth/login">Retour à la connexion</Link>
              </Button>
            </div>
          )}
        </div>
        {/* Help section */}
        <div className="mt-8 p-4 rounded-lg bg-secondary/50 border">
          <p className="text-sm text-muted-foreground mb-2 font-medium">Besoin d'aide ?</p>
          <p className="text-sm text-muted-foreground mb-3">Contactez notre équipe support</p>
          <Link href="/contact" className="text-primary text-sm font-medium hover:underline">
            Nous contacter →
          </Link>
        </div>
      </div>
    </div>
  )
}