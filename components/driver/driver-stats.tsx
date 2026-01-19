import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, CheckCircle, Star } from "lucide-react"

const stats = [
  {
    label: "Missions disponibles",
    value: "12",
    icon: Truck,
    trend: "Nouvelles opportunités",
  },
  {
    label: "Missions en cours",
    value: "1",
    icon: Clock,
    trend: "Paris → Lyon",
  },
  {
    label: "Missions terminées",
    value: "45",
    icon: CheckCircle,
    trend: "Ce mois-ci: 8",
  },
  {
    label: "Note moyenne",
    value: "4.8",
    icon: Star,
    trend: "Excellent",
  },
]

export function DriverStats() {
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
