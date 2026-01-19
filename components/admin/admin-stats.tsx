import { Card, CardContent } from "@/components/ui/card"
import { Users, Truck, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    label: "Conducteurs en attente",
    value: "8",
    icon: Users,
    trend: "À valider",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Convoyages actifs",
    value: "24",
    icon: Truck,
    trend: "+3 aujourd'hui",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Missions en cours",
    value: "12",
    icon: Clock,
    trend: "En transit",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Litiges ouverts",
    value: "2",
    icon: AlertTriangle,
    trend: "À traiter",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
]

export function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
