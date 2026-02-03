"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Truck, LayoutDashboard, Plus, FileText, MessageSquare, CreditCard, User, LogOut, Car, ClipboardList, Users, Shield, AlertTriangle, CheckCircle, } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/landing/logo"

type UserRole = "client" | "driver" | "admin"

interface SidebarProps {
  role: UserRole
}

// ... (keeping the rest of the sidebar code the same, just updating the logo import)

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Logo />
        </div>
        {/* ... rest of the sidebar code */}
      </div>
    </aside>
  )
}