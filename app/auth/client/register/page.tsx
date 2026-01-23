import { RegisterForm } from "@/components/auth/register-form"
import { Truck } from "lucide-react"
import Link from "next/link"

export default function ClientRegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">ConvoyageOS</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <RegisterForm role="client" />
      </main>
    </div>
  )
}