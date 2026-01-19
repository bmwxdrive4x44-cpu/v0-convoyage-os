import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConvoyagesManagement } from "@/components/admin/convoyages-management"

export default function AdminConvoyagesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des convoyages</h1>
          <p className="text-muted-foreground mt-1">Supervisez tous les convoyages de la plateforme.</p>
        </div>

        <ConvoyagesManagement />
      </div>
    </DashboardLayout>
  )
}
