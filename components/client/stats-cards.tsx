import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, CheckCircle, MessageSquare } from "lucide-react"

const stats = [
  {
    label: "Convoyages actifs",
    value: "0",
    icon: Truck,
    trend: "En cours",
  },
  {
    label: "En attente d'offres",
    value: "0",
    icon: Clock,
    trend: "En attente",
  },
  {
    label: "Terminés",
    value: "0",
    icon: CheckCircle,
    trend: "Ce mois-ci",
  },
  {
    label: "Offres reçues",
    value: "0",
    icon: MessageSquare,
    trend: "À examiner",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
