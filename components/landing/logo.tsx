export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/convoyage-logo.jpg" 
        alt="ConvoyageOS" 
        className="h-10 w-10"
      />
      <span className="text-sm font-bold text-white">
        <span className="text-foreground">Convoyage</span><span className="text-orange-500 font-extrabold">OS</span>
      </span>
    </div>
  )
}
