import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ClientConvoyagesPage() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mes convoyages</h1>
            <p className="text-muted-foreground mt-1">Consultez et suivez tous vos convoyages.</p>
          </div>
          <Button asChild>
            <Link href="/client/new-request">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau convoyage
            </Link>
          </Button>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Tous les convoyages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Aucun convoyage trouvé. Créez votre première demande de convoyage.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
