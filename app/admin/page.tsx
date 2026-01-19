import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AdminStats } from "@/components/admin/admin-stats"
import { PendingDrivers } from "@/components/admin/pending-drivers"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Admin</h1>
          <p className="text-muted-foreground mt-1">Supervisez et gérez la plateforme ConvoyageOS.</p>
        </div>

        {/* Stats */}
        <AdminStats />

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PendingDrivers />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  )
}
