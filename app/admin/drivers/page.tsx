import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DriversList } from "@/components/admin/drivers-list"

export default function AdminDriversPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des conducteurs</h1>
          <p className="text-muted-foreground mt-1">Validez les nouveaux conducteurs et gérez les comptes existants.</p>
        </div>

        <DriversList />
      </div>
    </DashboardLayout>
  )
}
