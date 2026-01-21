import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"
import { sendPasswordResetEmail } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email requis" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Email invalide" }, { status: 400 })
    }

    // Check if user exists
    const user = authStore.getUserByEmail(email)
    if (!user) {
      console.log("[v0] User not found for email:", email)
      // Security: Don't reveal if email exists or not
      return NextResponse.json(
        {
          message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation",
          email,
        },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = authStore.generateResetToken(email)
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password?token=${resetToken}`

    // Send email
    const emailSent = await sendPasswordResetEmail(email, resetLink)

    if (!emailSent) {
      return NextResponse.json({ message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation",
        email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Forgot password error:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
