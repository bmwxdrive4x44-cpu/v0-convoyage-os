"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Truck, LayoutDashboard, Plus, FileText, MessageSquare, CreditCard, User, LogOut, Car, ClipboardList, Users, Shield, AlertTriangle, CheckCircle, } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type UserRole = "client" | "driver" | "admin"

interface SidebarProps {
  role: UserRole
}

const menuItems = {
  client: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/client" },
    { icon: Plus, label: "Nouveau convoyage", href: "/client/new-request" },
    { icon: FileText, label: "Mes convoyages", href: "/client/convoyages" },
    { icon: MessageSquare, label: "Offres reçues", href: "/client/offers" },
    { icon: CreditCard, label: "Paiements", href: "/client/payments" },
    { icon: User, label: "Mon profil", href: "/client/profile" },
  ],
  driver: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/driver" },
    { icon: Car, label: "Convoyages disponibles", href: "/driver/available" },
    { icon: ClipboardList, label: "Mes missions", href: "/driver/missions" },
    { icon: User, label: "Mon profil", href: "/driver/profile" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/admin" },
    { icon: Users, label: "Conducteurs", href: "/admin/drivers" },
    { icon: Truck, label: "Convoyages", href: "/admin/convoyages" },
    { icon: AlertTriangle, label: "Litiges", href: "/admin/disputes" },
  ],
}

const roleLabels = {
  client: "Client",
  driver: "Conducteur",
  admin: "Admin",
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">ConvoyageOS</span>
        </div>
        {/* Role badge */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-3 py-2">
            {role === "admin" ? (
              <Shield className="h-4 w-4 text-primary" />
            ) : role === "driver" ? (
              <Car className="h-4 w-4 text-primary" />
            ) : (
              <User className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium text-sidebar-accent-foreground">{roleLabels[role]}</span>
            {role === "driver" && <CheckCircle className="h-4 w-4 text-success ml-auto" />}
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {menuItems[role].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="h-5 w-5 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Jean Dupont</p>
              <p className="text-xs text-muted-foreground truncate">jean@exemple.com</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}