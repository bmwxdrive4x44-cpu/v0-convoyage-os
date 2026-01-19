import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DriverStats } from "@/components/driver/driver-stats"
import { AvailableConvoyages } from "@/components/driver/available-convoyages"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import Link from "next/link"

export default function DriverDashboardPage() {
  return (
    <DashboardLayout role="driver">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">Bienvenue, Pierre. Trouvez de nouvelles missions de convoyage.</p>
          </div>
          <Button asChild>
            <Link href="/driver/available">
              <Car className="mr-2 h-4 w-4" />
              Voir les convoyages
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <DriverStats />

        {/* Available Convoyages */}
        <AvailableConvoyages />
      </div>
    </DashboardLayout>
  )
}
