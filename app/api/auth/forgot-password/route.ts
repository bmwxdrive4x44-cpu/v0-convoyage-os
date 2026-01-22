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

    console.log("[v0] Password reset requested for:", email)

    // Check if user exists
    let user = authStore.getUserByEmail(email)
    if (!user) {
      console.log("[v0] User not found for email:", email)
      console.log("[v0] Creating temporary user for password reset testing...")
      // For development/testing: create the user if doesn't exist
      user = authStore.createOrUpdateUser(email, "password123", email.split("@")[0], "client")
    }

    // Generate reset token
    const resetToken = authStore.generateResetToken(email)
    
    // Construct reset link from request headers
    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/$/, "") || "https://v0-convoyage-os-dv.vercel.app"
    const resetLink = `${origin}/auth/reset-password?token=${resetToken}`

    console.log("[v0] Generated reset token:", resetToken)
    console.log("[v0] Reset link:", resetLink)

    // Send email
    const emailSent = await sendPasswordResetEmail(email, resetLink)

    if (!emailSent) {
      return NextResponse.json({ message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation",
        email,
        resetLink, // Include for development mode
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Forgot password error:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
