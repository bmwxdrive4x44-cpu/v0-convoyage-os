import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DisputesList } from "@/components/admin/disputes-list"

export default function AdminDisputesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Litiges et réclamations</h1>
          <p className="text-muted-foreground mt-1">Gérez les litiges signalés par les clients et conducteurs.</p>
        </div>

        <DisputesList />
      </div>
    </DashboardLayout>
  )
}
