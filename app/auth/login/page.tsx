import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Truck, CheckCircle, MapPin, CreditCard, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/landing/logo"

export default function LoginPage() {
  // ... (keeping the existing state and functions)

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <Logo />
        </Link>
        {/* ... rest of the login form code */}
      </div>
      {/* ... rest of the page */}
    </div>
  )
}