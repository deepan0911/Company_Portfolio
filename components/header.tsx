"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 relative group/link"
              suppressHydrationWarning
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 relative group/link"
              suppressHydrationWarning
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 relative group/link"
              suppressHydrationWarning
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 relative group/link"
              suppressHydrationWarning
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
            </button>
          </nav>

          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection("contact")}
              className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 relative overflow-hidden group/btn"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </div>
              <span className="relative z-10 font-semibold">Get Started</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fadeInUp">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 hover:translate-x-1"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection("contact")} 
                className="w-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500"
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
