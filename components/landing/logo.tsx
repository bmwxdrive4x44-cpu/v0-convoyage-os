import { Truck } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
        <Truck className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="text-xl font-bold whitespace-nowrap tracking-tight">
        <span className="text-primary">C</span><span className="text-foreground">onvoyage</span><span className="text-primary">OS</span>
      </div>
    </div>
  )
}
