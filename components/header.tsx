"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { AuthButton } from "@/components/auth-button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Force scrolled state on non-home pages for visibility
  const isHomePage = pathname === '/'
  const useScrolledStyle = !isHomePage || isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Check scroll position immediately on mount
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false) // Close mobile menu after clicking
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useScrolledStyle ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Desktop (left side) */}
          <div className="hidden md:block absolute left-4 lg:left-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center transition-transform duration-300 hover:scale-105"
              aria-label="Scroll to top"
              suppressHydrationWarning
            >
              <Image
                src="/WeBD-logo.png"
                alt="WeBD Logo"
                width={120}
                height={40}
                className={`h-8 lg:h-10 w-auto transition-all duration-500 ${
                  useScrolledStyle ? "brightness-0 saturate-100" : "brightness-100"
                }`}
                priority
              />
            </button>
          </div>

          {/* Logo - Mobile (left side) */}
          <div className="md:hidden absolute left-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center transition-transform duration-300 hover:scale-105"
              aria-label="Scroll to top"
              suppressHydrationWarning
            >
              <Image
                src="/WeBD-logo.png"
                alt="WeBD Logo"
                width={100}
                height={33}
                className={`h-7 w-auto transition-all duration-500 ${
                  useScrolledStyle ? "brightness-0 saturate-100" : "brightness-100"
                }`}
                priority
              />
            </button>
          </div>

          {/* Desktop Navigation - centered */}
          <nav className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8 mx-auto">
            <button
              onClick={() => scrollToSection("services")}
              className={`text-sm font-medium transition-all duration-300 relative group/link ${
                useScrolledStyle ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-blue-400"
              }`}
              suppressHydrationWarning
            >
              Services
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 ${
                useScrolledStyle ? "bg-primary" : "bg-blue-400"
              }`} />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-all duration-300 relative group/link ${
                useScrolledStyle ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-blue-400"
              }`}
              suppressHydrationWarning
            >
              About
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 ${
                useScrolledStyle ? "bg-primary" : "bg-blue-400"
              }`} />
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`text-sm font-medium transition-all duration-300 relative group/link ${
                useScrolledStyle ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-blue-400"
              }`}
              suppressHydrationWarning
            >
              Pricing
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 ${
                useScrolledStyle ? "bg-primary" : "bg-blue-400"
              }`} />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-all duration-300 relative group/link ${
                useScrolledStyle ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-blue-400"
              }`}
              suppressHydrationWarning
            >
              Contact
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300 ${
                useScrolledStyle ? "bg-primary" : "bg-blue-400"
              }`} />
            </button>
          </nav>

          {/* Mobile Menu Button - right side */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors absolute right-4 ${
              useScrolledStyle ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Auth Button - right side (desktop) */}
          <div className="hidden md:block absolute right-4 lg:right-8">
            <AuthButton isScrolled={useScrolledStyle} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-card/98 backdrop-blur-xl border-t border-border/50 shadow-lg">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-lg mx-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-lg mx-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-lg mx-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-lg mx-2"
              >
                Contact
              </button>
              <div className="px-4 py-2 border-t border-border/50 mt-2 pt-4">
                <AuthButton isScrolled={true} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
