"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user has already seen the intro
    const hasSeenIntro = sessionStorage.getItem("hasSeenLogoIntro")
    
    if (hasSeenIntro) {
      setShowIntro(false)
      setShowContent(true)
    } else {
      // Hide intro after animation completes
      const introTimer = setTimeout(() => {
        setShowIntro(false)
        sessionStorage.setItem("hasSeenLogoIntro", "true")
      }, 5000) // 5 seconds for intro animation

      // Show content after intro
      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 5100)

      return () => {
        clearTimeout(introTimer)
        clearTimeout(contentTimer)
      }
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        <source src="/videos/hero-background.webm" type="video/webm" />
      </video>

      {/* Watermark Cover - hides bottom-right watermark */}
      <div className="absolute bottom-0 right-0 w-32 h-20 backdrop-blur-xl bg-gradient-to-tl from-black/40 to-transparent z-10" />

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Logo Intro Animation - Shows first */}
      {showIntro && (
        <div className="absolute inset-0 z-50 flex items-center justify-center animate-fadeOut">
          <div className="animate-logoIntro">
            <Image
              src="/WeBD-logo.png"
              alt="WeBD Logo"
              width={400}
              height={133}
              className="w-64 lg:w-96 h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      <div className="container mx-auto relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo above heading - appears after intro */}
          <div
            className={`mb-8 flex justify-center transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <Image
              src="/WeBD-logo.png"
              alt="WeBD Logo"
              width={200}
              height={67}
              className="w-32 lg:w-48 h-auto drop-shadow-lg"
              priority
            />
          </div>

          <h1
            className={`text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 text-balance leading-[1.1] drop-shadow-lg transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: showContent ? "0.1s" : "0s" }}
          >
            Transform Your Vision Into
            <span className="block text-blue-400 mt-2">Digital Excellence</span>
          </h1>

          <p
            className={`text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-md transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: showContent ? "0.2s" : "0s" }}
          >
            Professional freelancing services spanning web development, mobile apps, software solutions, UI/UX design,
            and creative services—delivered with uncompromising quality.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: showContent ? "0.3s" : "0s" }}
          >
            {/* Primary CTA Button - Start Your Project */}
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group relative w-full sm:w-auto text-base font-semibold px-10 py-7 bg-gradient-to-r from-primary via-primary to-blue-600 hover:from-blue-600 hover:via-primary hover:to-primary shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 overflow-hidden border-0 hover:scale-105"
              suppressHydrationWarning
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-blue-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </Button>

            {/* Secondary Button - Explore Services */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="group relative w-full sm:w-auto text-base font-semibold px-10 py-7 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
              suppressHydrationWarning
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-2">
                Explore Services
                <svg 
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>

          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: showContent ? "0.4s" : "0s" }}
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
              { value: "Global", label: "Client Reach" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
