import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: "ConvoyageOS <onboarding@resend.dev>",
      to: email,
      subject: "Réinitialisez votre mot de passe ConvoyageOS",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h1 style="color: #18181b; font-size: 24px; margin: 0 0 24px 0;">
              <span style="color: #f97316;">C</span>onvoyage<span style="color: #f97316;">OS</span>
            </h1>
            <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Bonjour,
            </p>
            <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>
            <a href="${resetLink}" style="display: inline-block; background-color: #f97316; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 0 24px 0;">
              Réinitialiser mon mot de passe
            </a>
            <p style="color: #71717a; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
              Ce lien expire dans 30 minutes. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
            </p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
              ConvoyageOS - Plateforme de convoyage de véhicules
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return false
    }

    console.log("[v0] Email sent successfully:", data?.id)
    return true
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return false
  }
}
