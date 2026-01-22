import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, UserPlus, Truck, Check, AlertTriangle, CreditCard } from "lucide-react"

interface ActivityItem {
  id: string
  type: "driver_approved" | "driver_rejected" | "convoyage_created" | "mission_completed" | "dispute_opened" | "payment"
  description: string
  timestamp: string
}

const activities: ActivityItem[] = []

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
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Aucune activite recente</p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}
