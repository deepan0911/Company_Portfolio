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
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto text-base px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              suppressHydrationWarning
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="w-full sm:w-auto text-base px-8 py-6 hover:bg-primary/5 transition-all duration-300"
              suppressHydrationWarning
            >
              Explore Services
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
