import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis", user: null },
        { status: 400 }
      )
    }

    console.log("[v0] Login attempt for:", email)
    const user = authStore.getUserByEmail(email)
    if (!user || user.password !== password) {
      console.log("[v0] Login failed - invalid credentials for:", email)
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect", user: null },
        { status: 401 }
      )
    }

    // If a specific role is requested, verify it exists
    if (role && !user.roles.includes(role)) {
      return NextResponse.json(
        { message: `Vous n'avez pas le rôle ${role}`, user: null },
        { status: 403 }
      )
    }

    // If multiple roles available and no role specified, show role selector
    if (!role && user.roles.length > 1) {
      console.log("[v0] Multiple roles available for:", email)
      return NextResponse.json(
        {
          message: "Choisissez votre rôle",
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
            selectedRole: user.roles[0],
          },
        },
        { status: 200 }
      )
    }

    // Single role or role specified
    const selectedRole = role || user.roles[0]
    console.log(`[v0] User ${email} logged in with role ${selectedRole}`)

    return NextResponse.json(
      {
        message: "Connexion réussie",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
          selectedRole,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { message: "Erreur serveur", user: null },
      { status: 500 }
    )
  }
}
