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
  roles: ("client" | "driver")[]
}

class AuthStore {
  private resetTokens: Map<string, PasswordResetToken> = new Map()
  private users: Map<string, UserAccount> = new Map()

  constructor() {
    // Initialize with demo users
    this.users.set("demo@example.com", {
      id: "user_001",
      email: "demo@example.com",
      password: "password123",
      name: "Demo User",
      roles: ["client"],
    })
    this.users.set("driver@example.com", {
      id: "user_002",
      email: "driver@example.com",
      password: "password123",
      name: "Test Driver",
      roles: ["driver"],
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

  createOrUpdateUser(
    email: string,
    password: string,
    name: string,
    role: "client" | "driver"
  ): UserAccount {
    const existingUser = this.users.get(email)
    
    if (existingUser) {
      // User already exists, add role if not present
      if (!existingUser.roles.includes(role)) {
        existingUser.roles.push(role)
        console.log(`[v0] Added role ${role} to existing user ${email}`)
      }
      return existingUser
    }
    
    // Create new user with role
    const newUser: UserAccount = {
      id: `user_${Date.now()}`,
      email,
      password,
      name,
      roles: [role],
    }
    this.users.set(email, newUser)
    console.log(`[v0] Created new user ${email} with role ${role}`)
    return newUser
  }

  getUserRoles(email: string): ("client" | "driver")[] {
    const user = this.users.get(email)
    return user?.roles || []
  }
}

export const authStore = new AuthStore()
