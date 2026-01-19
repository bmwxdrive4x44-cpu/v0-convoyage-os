import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AvailableConvoyages } from "@/components/driver/available-convoyages"

export default function DriverAvailablePage() {
  return (
    <DashboardLayout role="driver">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Convoyages disponibles</h1>
          <p className="text-muted-foreground mt-1">Parcourez les missions disponibles et proposez vos services.</p>
        </div>

        <AvailableConvoyages />
      </div>
    </DashboardLayout>
  )
}
