"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-card border-t border-border py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional freelancing services for all your digital and creative needs at affordable prices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services/web-development"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/mobile-app-development"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/ui-ux-design"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/brand-design"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Brand Design
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/poster-graphics"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Graphics & Posters
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/logo-design"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logo Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                hello@freelance.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +91 93606 48801 / +91 89460 40919
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Coimbatore
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WeBD. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
