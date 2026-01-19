"use client"

import { Globe } from "lucide-react"

const currencies = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "Dollar US" },
  { code: "GBP", symbol: "£", name: "Livre Sterling" },
  { code: "MAD", symbol: "د.م.", name: "Dirham Marocain" },
  { code: "DZD", symbol: "د.ج", name: "Dinar Algérien" },
  { code: "TND", symbol: "د.ت", name: "Dinar Tunisien" },
  { code: "CHF", symbol: "CHF", name: "Franc Suisse" },
]

export function CurrenciesSection() {
  return (
    <section className="py-16 bg-card/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Paiement International
              </span>
              <h3 className="text-lg font-bold text-foreground">Payez et recevez dans votre devise locale</h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-primary font-semibold">{currency.symbol}</span>
                <span className="text-sm text-muted-foreground">{currency.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
