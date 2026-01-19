"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Truck, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Convoyageos</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={isHomePage ? "#solutions" : "/#solutions"}
              onClick={(e) => handleNavClick(e, "solutions")}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Solutions
            </Link>
            <Link href="/comment-ca-marche" className="text-muted-foreground hover:text-foreground transition-colors">
              Comment ça marche
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost">
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Inscription</Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href={isHomePage ? "#solutions" : "/#solutions"}
                onClick={(e) => handleNavClick(e, "solutions")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Solutions
              </Link>
              <Link
                href="/comment-ca-marche"
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Comment ça marche
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/auth/login">Connexion</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/register">Inscription</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
