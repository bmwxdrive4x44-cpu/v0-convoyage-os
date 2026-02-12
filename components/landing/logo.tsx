export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/convoyage-logo.jpg" 
        alt="CARGO" 
        className="h-10 w-10"
      />
      <span className="text-lg font-bold text-white tracking-wider">
        <span className="text-orange-500">CARGO</span>
      </span>
    </div>
  )
}
