export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/convoyage-logo.jpg" 
        alt="ConvoyageOS" 
        className="h-10 w-10 object-cover"
      />
      <div className="text-xl font-bold whitespace-nowrap tracking-tight">
        <span className="text-white">Convoyage</span><span className="text-orange-500">OS</span>
      </div>
    </div>
  )
}
