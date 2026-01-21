"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Truck, CheckCircle, MapPin, CreditCard, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    roles: ("client" | "driver")[]
    selectedRole: "client" | "driver"
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [availableRoles, setAvailableRoles] = useState<("client" | "driver")[] | null>(null)
  const [selectedRole, setSelectedRole] = useState<"client" | "driver" | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.user?.email || "Erreur de connexion")
      }

      // If user has multiple roles and no role selected yet, show role selector
      if (!selectedRole && data.user.roles.length > 1) {
        setAvailableRoles(data.user.roles)
        setIsLoading(false)
        return
      }

      // Login successful, redirect
      const roleRoute = data.user.selectedRole === "client" ? "/client" : "/driver"
      window.location.href = roleRoute
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">Convoyageos</span>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {availableRoles && availableRoles.length > 1 && !selectedRole ? (
              // Role Selector
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Choisir un rôle</h1>
                  <p className="text-muted-foreground">Vous avez plusieurs accès disponibles</p>
                </div>

                <div className="space-y-4">
                  {availableRoles.includes("client") && (
                    <button
                      onClick={() => setSelectedRole("client")}
                      className="w-full p-4 rounded-lg border-2 border-zinc-200 hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <p className="font-semibold text-foreground">Client</p>
                      <p className="text-sm text-muted-foreground">Je cherche un transporteur</p>
                    </button>
                  )}
                  {availableRoles.includes("driver") && (
                    <button
                      onClick={() => setSelectedRole("driver")}
                      className="w-full p-4 rounded-lg border-2 border-zinc-200 hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <p className="font-semibold text-foreground">Conducteur</p>
                      <p className="text-sm text-muted-foreground">Je propose mes services</p>
                    </button>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 bg-transparent"
                  onClick={() => {
                    setAvailableRoles(null)
                    setEmail("")
                    setPassword("")
                  }}
                >
                  Retour
                </Button>
              </div>
            ) : (
              // Login Form
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Connexion</h1>
                  <p className="text-muted-foreground">Accédez à votre espace personnel</p>
                </div>

                {error && (
                  <Card className="bg-destructive/10 border-destructive/20 mb-6">
                    <CardContent className="pt-4 flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                      <p className="text-sm text-destructive">{error}</p>
                    </CardContent>
                  </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pr-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Se connecter
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">ou</span>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <Link href="/auth/register" className="text-primary font-medium hover:underline">
                      Créer un compte
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Marketing */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-primary font-medium mb-4">Disponible en France, Europe & Afrique du Nord</p>

          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            LE CONVOYAGE
            <br />
            NOUVELLE GÉNÉRATION
          </h2>

          <p className="text-zinc-400 text-lg mb-8">
            La plateforme SaaS tout-en-un pour gérer vos déplacements de véhicules et transports de marchandises.
            Simple, Sécurisé, Instantané.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-white text-sm">Vérifié</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-700">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="text-white text-sm">Suivi en direct</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-700">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-white text-sm">Paiement Sécurisé</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">2500+</p>
              <p className="text-zinc-400 text-sm">Missions réalisées</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-zinc-400 text-sm">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-zinc-400 text-sm">Support dédié</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
