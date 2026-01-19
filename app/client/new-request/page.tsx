import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConvoyageForm } from "@/components/client/convoyage-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewConvoyageRequestPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <Link
            href="/client"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Nouveau convoyage</h1>
          <p className="text-muted-foreground mt-1">Créez une nouvelle demande de convoyage en quelques étapes.</p>
        </div>

        <ConvoyageForm />
      </div>
    </DashboardLayout>
  )
}
