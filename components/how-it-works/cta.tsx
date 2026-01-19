import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Headphones } from "lucide-react"
import Link from "next/link"

export function HowItWorksCTA() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
      <CardContent className="p-8 text-center">
        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Headphones className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Une question ? Besoin d'aide ?</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Notre équipe de support est disponible 7j/7 pour vous accompagner. Accédez au support technique directement
          depuis votre espace personnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/register">Créer un compte</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent">
            <Link href="/auth/login">Se connecter</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
