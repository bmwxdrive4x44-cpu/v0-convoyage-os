import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 })
    }

    if (!["client", "driver"].includes(role)) {
      return NextResponse.json({ message: "Rôle invalide" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      )
    }

    // Create or update user with the new role
    const user = authStore.createOrUpdateUser(email, password, name, role)

    return NextResponse.json(
      {
        message: "Inscription réussie",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
