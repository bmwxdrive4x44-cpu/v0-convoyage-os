export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/convoyage-logo.jpg" 
        alt="ConvoyageOS" 
        className="h-10 w-10 rounded-lg object-cover"
      />
      <div className="text-xl font-bold whitespace-nowrap tracking-tight">
        <span className="text-primary">Convoy</span><span className="text-foreground">age</span><span className="text-primary">OS</span>
      </div>
    </div>
  )
}
