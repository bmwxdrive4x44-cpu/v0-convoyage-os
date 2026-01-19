import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DriverMissions } from "@/components/driver/driver-missions"

export default function DriverMissionsPage() {
  return (
    <DashboardLayout role="driver">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes missions</h1>
          <p className="text-muted-foreground mt-1">Gérez vos missions de convoyage acceptées.</p>
        </div>

        <DriverMissions />
      </div>
    </DashboardLayout>
  )
}
