import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis" }, { status: 400 })
    }

    const user = authStore.getUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    // If a specific role is requested, verify it exists
    if (role && !user.roles.includes(role)) {
      return NextResponse.json(
        { message: `Vous n'avez pas le rôle ${role}` },
        { status: 403 }
      )
    }

    // If no role specified, return all available roles
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
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
