// Email service - logs to console in development
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  try {
    console.log("\n")
    console.log("╔════════════════════════════════════════════════════════╗")
    console.log("║          🔗 PASSWORD RESET EMAIL (DEVELOPMENT)        ║")
    console.log("╚════════════════════════════════════════════════════════╝")
    console.log(`TO: ${email}`)
    console.log(`SUBJECT: Réinitialisez votre mot de passe Convoyageos`)
    console.log("─".repeat(56))
    console.log("Bonjour,\n")
    console.log("Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe:\n")
    console.log(`🔗 RESET LINK: ${resetLink}`)
    console.log("\nCe lien expire dans 30 minutes.")
    console.log("Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.\n")
    console.log("Cordialement,")
    console.log("L'équipe Convoyageos")
    console.log("─".repeat(56))
    console.log("\n")

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return true
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return false
  }
}
