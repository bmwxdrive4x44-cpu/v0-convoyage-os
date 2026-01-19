import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, UserPlus, Truck, Check, AlertTriangle, CreditCard } from "lucide-react"

interface ActivityItem {
  id: string
  type: "driver_approved" | "driver_rejected" | "convoyage_created" | "mission_completed" | "dispute_opened" | "payment"
  description: string
  timestamp: string
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "driver_approved",
    description: "Conducteur Sophie Durand approuvé",
    timestamp: "Il y a 30 min",
  },
  {
    id: "2",
    type: "convoyage_created",
    description: "Nouveau convoyage: Paris → Marseille",
    timestamp: "Il y a 1 heure",
  },
  {
    id: "3",
    type: "mission_completed",
    description: "Mission #1234 terminée avec succès",
    timestamp: "Il y a 2 heures",
  },
  {
    id: "4",
    type: "payment",
    description: "Paiement de 180€ reçu",
    timestamp: "Il y a 3 heures",
  },
  {
    id: "5",
    type: "dispute_opened",
    description: "Litige ouvert sur mission #1230",
    timestamp: "Il y a 5 heures",
  },
]

const iconMap = {
  driver_approved: { icon: UserPlus, color: "text-success", bg: "bg-success/10" },
  driver_rejected: { icon: UserPlus, color: "text-destructive", bg: "bg-destructive/10" },
  convoyage_created: { icon: Truck, color: "text-primary", bg: "bg-primary/10" },
  mission_completed: { icon: Check, color: "text-success", bg: "bg-success/10" },
  dispute_opened: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  payment: { icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
}

export function RecentActivity() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Activité récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = iconMap[activity.type]
            return (
              <div key={activity.id} className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <config.icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
