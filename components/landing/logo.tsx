import { Truck } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
        <Truck className="h-5 w-5 text-primary-foreground" />
      </div>
      <svg width="120" height="28" viewBox="0 0 120 28" className="fill-current">
        {/* C in orange */}
        <text x="0" y="22" fontSize="22" fontWeight="700" fill="hsl(var(--color-primary))" fontFamily="system-ui, -apple-system, sans-serif">
          C
        </text>
        {/* onvoyage in white/foreground */}
        <text x="15" y="22" fontSize="22" fontWeight="700" fill="hsl(var(--color-foreground))" fontFamily="system-ui, -apple-system, sans-serif">
          onvoyage
        </text>
        {/* OS in orange */}
        <text x="105" y="22" fontSize="22" fontWeight="700" fill="hsl(var(--color-primary))" fontFamily="system-ui, -apple-system, sans-serif">
          OS
        </text>
      </svg>
    </div>
  )
}
