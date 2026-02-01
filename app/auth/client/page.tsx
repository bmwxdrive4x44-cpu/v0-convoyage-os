import { LoginForm } from "@/components/auth/login-form"
import { Truck } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/landing/logo"

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm role="client" />
      </main>
    </div>
  )
}
