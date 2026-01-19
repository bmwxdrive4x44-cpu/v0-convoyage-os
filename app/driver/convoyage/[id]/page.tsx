import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConvoyageDetailPage } from "@/components/driver/convoyage-detail"

export default function ConvoyageDetailRoute() {
  return (
    <DashboardLayout role="driver">
      <ConvoyageDetailPage />
    </DashboardLayout>
  )
}
