import type React from "react"
import { Sidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "client" | "driver" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
