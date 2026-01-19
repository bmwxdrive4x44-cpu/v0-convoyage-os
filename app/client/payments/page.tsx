import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PaymentPage } from "@/components/client/payment-page"

export default function ClientPaymentsPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Paiement</h1>
          <p className="text-muted-foreground mt-1">Finalisez le paiement pour confirmer votre convoyage.</p>
        </div>

        <PaymentPage />
      </div>
    </DashboardLayout>
  )
}
