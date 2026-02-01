import { RegisterForm } from "@/components/auth/register-form"
import { Truck } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/landing/logo"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </header>
      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <RegisterForm />
      </main>
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
