import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DriverValidationPage } from "@/components/admin/driver-validation"

export default function DriverValidationRoute() {
  return (
    <DashboardLayout role="admin">
      <DriverValidationPage />
    </DashboardLayout>
  )
}
