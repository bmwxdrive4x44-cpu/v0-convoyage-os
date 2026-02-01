import { Truck, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">ConvoyageOS</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La référence du convoyage digital en Europe et Afrique du Nord.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Convoyage Auto
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Transport Fret
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-foreground transition-colors">
                  Déménagement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cgv" className="hover:text-foreground transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/comment-ca-marche" className="hover:text-foreground transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-foreground transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@convoyage.com" className="hover:text-foreground transition-colors">
                  support@convoyage.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+33123456789" className="hover:text-foreground transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 ConvoyageOS. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Europe & Afrique du Nord</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
