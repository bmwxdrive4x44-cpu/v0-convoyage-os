import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DriverProfilePage } from "@/components/driver/driver-profile"

export default function DriverProfileRoute() {
  return (
    <DashboardLayout role="driver">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon profil</h1>
          <p className="text-muted-foreground mt-1">Gérez vos informations et documents.</p>
        </div>

        <DriverProfilePage />
      </div>
    </DashboardLayout>
  )
}
