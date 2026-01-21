import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: Request) {
  try {
    const { token, password, confirmPassword } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token et mot de passe requis" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Les mots de passe ne correspondent pas" }, { status: 400 })
    }

    // Validate reset token
    const isValidToken = authStore.validateResetToken(token)
    if (!isValidToken) {
      return NextResponse.json(
        { message: "Lien de réinitialisation invalide ou expiré" },
        { status: 400 }
      )
    }

    // Get token details
    const resetToken = authStore.getResetToken(token)
    if (!resetToken) {
      return NextResponse.json(
        { message: "Lien de réinitialisation invalide" },
        { status: 400 }
      )
    }

    // Mark token as used
    authStore.useResetToken(token)

    // Update user password
    const updated = authStore.updateUserPassword(resetToken.email, password)
    if (!updated) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Reset password error:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
