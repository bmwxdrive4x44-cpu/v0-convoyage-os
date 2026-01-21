// In-memory storage for password reset tokens
// In production, use a real database
export interface PasswordResetToken {
  token: string
  email: string
  expiresAt: Date
  used: boolean
}

export interface UserAccount {
  id: string
  email: string
  password: string
  name?: string
  role?: string
}

class AuthStore {
  private resetTokens: Map<string, PasswordResetToken> = new Map()
  private users: Map<string, UserAccount> = new Map()

  constructor() {
    // Initialize with demo user
    this.users.set("demo@example.com", {
      id: "user_001",
      email: "demo@example.com",
      password: "hashed_password_demo",
      name: "Demo User",
      role: "client",
    })
  }

  generateResetToken(email: string): string {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    this.resetTokens.set(token, { token, email, expiresAt, used: false })
    console.log("[v0] Generated reset token for:", email, "token:", token)
    return token
  }

  getResetToken(token: string): PasswordResetToken | null {
    return this.resetTokens.get(token) || null
  }

  validateResetToken(token: string): boolean {
    const resetToken = this.resetTokens.get(token)
    if (!resetToken) return false
    if (resetToken.used) return false
    if (resetToken.expiresAt < new Date()) return false
    return true
  }

  useResetToken(token: string): void {
    const resetToken = this.resetTokens.get(token)
    if (resetToken) {
      resetToken.used = true
    }
  }

  getUserByEmail(email: string): UserAccount | null {
    return this.users.get(email) || null
  }

  updateUserPassword(email: string, newPassword: string): boolean {
    const user = this.users.get(email)
    if (!user) return false
    user.password = newPassword // In production, hash this with bcrypt
    console.log("[v0] Updated password for:", email)
    return true
  }
}

export const authStore = new AuthStore()
