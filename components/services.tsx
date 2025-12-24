"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code2, Smartphone, Palette, Sparkles, FileImage, Star, Layers, Zap, Database } from "lucide-react"
import { useState } from "react"

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 lg:py-32 px-4 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fadeInUp">
            What We Offer
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={index}>
              <Card
                className={`group h-full relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-700 cursor-pointer animate-scaleIn bg-card/50 backdrop-blur-sm card-premium-hover shadow-lg hover:shadow-2xl`}
                style={{ 
                  animationDelay: `${index * 0.08}s`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Top border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-8 relative z-10">
                  {/* Icon container with premium animations */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-700 icon-premium-hover relative overflow-hidden`}
                  >
                    {/* Icon background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <service.icon
                      className={`w-8 h-8 ${service.color} transition-all duration-700 relative z-10 ${
                        hoveredIndex === index ? "scale-110 rotate-6" : ""
                      }`}
                    />
                  </div>

                  {/* Title with smooth color transition */}
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
                    {service.title}
                  </h3>

                  {/* Description with enhanced readability on hover */}
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-all duration-500 min-h-[4.5rem]">
                    {service.description}
                  </p>

                  {/* Animated CTA with arrow */}
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    <span className="text-sm">Learn more</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Bottom corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
