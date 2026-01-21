// Email service - logs to console in development
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  try {
    console.log("[v0] ===== EMAIL SERVICE =====")
    console.log("[v0] TO:", email)
    console.log("[v0] SUBJECT: Réinitialisez votre mot de passe Convoyageos")
    console.log("[v0] BODY:")
    console.log("[v0] ---")
    console.log("[v0] Bonjour,")
    console.log("[v0]")
    console.log("[v0] Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe:")
    console.log("[v0] RESET LINK:", resetLink)
    console.log("[v0]")
    console.log("[v0] Ce lien expire dans 30 minutes.")
    console.log("[v0] Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.")
    console.log("[v0]")
    console.log("[v0] Cordialement,")
    console.log("[v0] L'équipe Convoyageos")
    console.log("[v0] ---")
    console.log("[v0] =========================")

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return true
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return false
  }
}
