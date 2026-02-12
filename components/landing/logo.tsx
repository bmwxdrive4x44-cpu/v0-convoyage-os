export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/convoyage-logo.jpg" 
        alt="ConvoyageOS" 
        className="h-10 w-10"
      />
      <div className="text-sm font-semibold whitespace-nowrap tracking-wider">
        <span className="text-white">Convoyage</span><span className="text-orange-500 font-bold">OS</span>
      </div>
    </div>
  )
}
