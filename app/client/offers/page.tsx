import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { OffersList } from "@/components/client/offers-list"

export default function ClientOffersPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offres reçues</h1>
          <p className="text-muted-foreground mt-1">
            Consultez et gérez les offres de conducteurs pour vos convoyages.
          </p>
        </div>

        <OffersList />
      </div>
    </DashboardLayout>
  )
}
