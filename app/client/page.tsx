import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/client/stats-cards"
import { ConvoyageList } from "@/components/client/convoyage-list"
import { RecentOffers } from "@/components/client/recent-offers"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ClientDashboardPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">Bienvenue, Jean. Gérez vos convoyages en toute simplicité.</p>
          </div>
          <Button asChild>
            <Link href="/client/new-request">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau convoyage
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ConvoyageList />
          <RecentOffers />
        </div>
      </div>
    </DashboardLayout>
  )
}
