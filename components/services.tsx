"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code2, Smartphone, Palette, Sparkles, FileImage, Star, Layers, Zap, Database, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    slug: "web-development",
    description:
      "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js for exceptional performance.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description:
      "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences and engagement.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Database,
    title: "Software Development",
    slug: "software-development",
    description:
      "Custom software solutions, enterprise applications, and scalable systems designed to solve complex business challenges.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Beautiful, intuitive interfaces designed with user experience at the forefront of every decision to maximize engagement.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Brand Design",
    slug: "brand-design",
    description:
      "Complete brand identity solutions including strategy, visual design, brand guidelines, and market positioning.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: FileImage,
    title: "Poster & Graphics",
    slug: "poster-graphics",
    description:
      "Eye-catching posters, flyers, and marketing materials that communicate your message effectively and drive results.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Logo Design",
    slug: "logo-design",
    description:
      "Memorable logos that capture your brand essence and make a lasting impression on your target audience.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Layers,
    title: "Invitation Design",
    slug: "invitation-design",
    description:
      "Custom invitations for weddings, events, and special occasions with stunning visual appeal and premium quality.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Tech Solutions",
    slug: "tech-solutions",
    description:
      "Comprehensive technical and creative solutions tailored to your unique business needs and industry requirements.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
]

export function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const currentService = services[currentIndex]
  const prevIndex = (currentIndex - 1 + services.length) % services.length
  const nextIndex = (currentIndex + 1) % services.length
  const prevService = services[prevIndex]
  const nextService = services[nextIndex]

  const goToNext = () => {
    setDirection('next')
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const goToPrev = () => {
    setDirection('prev')
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(goToNext, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovered, currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const ServiceCard = ({ service, isActive = false, position = 'center' }: { 
    service: typeof services[0], 
    isActive?: boolean,
    position?: 'left' | 'center' | 'right'
  }) => (
    <Card
      className={`relative overflow-hidden border-border/50 transition-all duration-700 bg-card/50 backdrop-blur-sm h-full w-full min-h-[600px] flex flex-col justify-between ${
        isActive 
          ? 'group cursor-pointer hover:border-primary/30 shadow-2xl hover:shadow-3xl opacity-100 z-10' 
          : 'shadow-lg opacity-40 pointer-events-none'
      }`}
    >
      {isActive && (
        <>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </>
      )}

      <CardContent className="p-8 lg:p-12 relative z-10 text-center flex-grow flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center">
          {/* Icon container */}
          <div
            className={`w-20 h-20 lg:w-24 lg:h-24 rounded-3xl ${service.bgColor} flex items-center justify-center mb-8 shadow-lg ${isActive ? 'group-hover:shadow-2xl' : ''} transition-all duration-700 relative overflow-hidden mx-auto`}
          >
            {isActive && <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            
            <service.icon
              className={`w-10 h-10 lg:w-12 lg:h-12 ${service.color} transition-all duration-700 relative z-10 ${isActive ? 'group-hover:scale-110 group-hover:rotate-6' : ''}`}
            />
          </div>

          {/* Title */}
          <h3 className={`text-2xl lg:text-4xl mb-6 font-bold text-foreground ${isActive ? 'group-hover:text-primary' : ''} transition-all duration-500`}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={`text-base lg:text-lg text-muted-foreground leading-relaxed ${isActive ? 'group-hover:text-foreground/90' : ''} transition-all duration-500 max-w-xl mx-auto mb-8`}>
            {service.description}
          </p>
        </div>

        {/* Learn more button - always present but hidden if not active */}
        <div className={`flex items-center justify-center gap-2 text-primary font-medium transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
          <span className="text-base">Learn more</span>
          <svg
            className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Bottom corner accent */}
        {isActive && (
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
        )}
      </CardContent>
    </Card>
  )

  return (
    <section id="services" className="py-24 lg:py-32 px-4 lg:px-8 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-muted/40 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2
            className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Comprehensive Solutions
          </h2>
          <p
            className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            From concept to deployment, we deliver excellence across every aspect of digital and creative services
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-4 lg:px-4">
          {/* Navigation Buttons - Enhanced Professional Design */}
          <button
            onClick={goToPrev}
            className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Previous service"
            suppressHydrationWarning
          >
            <div className="relative w-14 h-14 lg:w-16 lg:h-16">
              {/* Gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              
              {/* Main button */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl border-2 border-border/30 group-hover:border-primary/60 shadow-2xl group-hover:shadow-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <ChevronLeft className="w-7 h-7 lg:w-8 lg:h-8 text-foreground/70 group-hover:text-primary transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:translate-x-[-2px]" />
              </div>
            </div>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Next service"
            suppressHydrationWarning
          >
            <div className="relative w-14 h-14 lg:w-16 lg:h-16">
              {/* Gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              
              {/* Main button */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl border-2 border-border/30 group-hover:border-primary/60 shadow-2xl group-hover:shadow-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[5deg]">
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <ChevronRight className="w-7 h-7 lg:w-8 lg:h-8 text-foreground/70 group-hover:text-primary transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:translate-x-[2px]" />
              </div>
            </div>
          </button>

          {/* Cards Container with Backdrop Cards */}
          <div 
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Backdrop Card - Hidden on mobile */}
            <div className="hidden lg:block h-full w-full">
              <ServiceCard service={prevService} position="left" />
            </div>

            {/* Center Active Card */}
            <div className="h-full w-full">
              <Link href={`/services/${currentService.slug}`} key={currentIndex} className="h-full w-full block">
                <ServiceCard service={currentService} isActive={true} position="center" />
              </Link>
            </div>

            {/* Right Backdrop Card - Hidden on mobile */}
            <div className="hidden lg:block h-full w-full">
              <ServiceCard service={nextService} position="right" />
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 'next' : 'prev')
                  setCurrentIndex(index)
                }}
                className="group relative"
                aria-label={`Go to service ${index + 1}`}
                suppressHydrationWarning
              >
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? 'w-10 bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50'
                      : 'w-2 bg-border hover:bg-primary/50 hover:w-6'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-sm text-muted-foreground font-medium">
            <span className="text-primary font-bold text-lg">{currentIndex + 1}</span>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground/60">{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
