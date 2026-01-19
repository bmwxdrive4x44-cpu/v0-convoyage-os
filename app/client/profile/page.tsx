import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ClientProfilePage } from "@/components/client/profile-page"

export default function ProfilePage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon profil</h1>
          <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et vos préférences.</p>
        </div>

        <ClientProfilePage />
      </div>
    </DashboardLayout>
  )
}
