"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

interface LoginFormProps {
  role: "client" | "driver" | "admin"
  onSubmit?: (email: string, password: string) => void
}

const roleConfig = {
  client: {
    title: "Connexion Client",
    description: "Accédez à votre espace client pour gérer vos convoyages",
    registerLink: "/auth/client/register",
    dashboardLink: "/client",
  },
  driver: {
    title: "Connexion Conducteur",
    description: "Accédez à votre espace conducteur pour gérer vos missions",
    registerLink: "/auth/driver/register",
    dashboardLink: "/driver",
  },
  admin: {
    title: "Connexion Admin",
    description: "Accès réservé aux administrateurs",
    registerLink: null,
    dashboardLink: "/admin",
  },
}

export function LoginForm({ role, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const config = roleConfig[role]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (onSubmit) {
      onSubmit(email, password)
    }
    
    // Redirect to dashboard (in real app, this would be after auth)
    window.location.href = config.dashboardLink
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href="#" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </form>
      </CardContent>
      {config.registerLink && (
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href={config.registerLink} className="text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}