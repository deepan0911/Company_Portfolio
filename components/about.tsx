"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

const features = [
  "World-class team with proven expertise",
  "Competitive pricing without compromise",
  "Agile delivery with rapid turnaround",
  "Iterative refinement until perfection",
  "24/7 dedicated customer support",
  "Quality assurance on every deliverable",
]

const process = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "Deep dive into your business goals, target audience, and project requirements to craft the perfect solution",
  },
  {
    number: "02",
    title: "Design & Prototype",
    description: "Create stunning mockups and interactive prototypes that bring your vision to life for validation",
  },
  {
    number: "03",
    title: "Development & Build",
    description: "Transform designs into reality with clean, scalable code following industry best practices",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Deploy your project with confidence and provide ongoing maintenance and optimization",
  },
]

export function About() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section id="about" className="py-24 lg:py-32 px-4 lg:px-8 bg-muted/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInUp">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Excellence Meets Affordability
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We're a dedicated team of professionals committed to transforming your vision into reality. With deep
              expertise across multiple domains and an unwavering passion for innovation, we consistently deliver
              exceptional results that exceed expectations.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is clear: democratize access to world-class design and development services. We believe every
              business, regardless of size, deserves professional-grade solutions that drive growth.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Card
            className="bg-card/70 backdrop-blur-sm border-border/50 shadow-2xl animate-scaleIn"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-8 lg:p-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">Our Process</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A proven methodology ensuring every project achieves excellence through structured execution:
                  </p>
                </div>

                <div className="space-y-6">
                  {process.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-6 p-6 rounded-xl hover:bg-primary/5 transition-all duration-500 cursor-pointer group border border-transparent hover:border-primary/30 card-premium-hover shadow-sm hover:shadow-lg relative overflow-hidden"
                      onMouseEnter={() => setActiveStep(index)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${
                          index % 2 === 0 ? "from-primary to-primary/70" : "from-secondary to-secondary/70"
                        } flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 relative z-10 icon-premium-hover`}
                      >
                        {/* Number badge glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <span className="relative z-10">{step.number}</span>
                      </div>

                      <div className="flex-1 relative z-10">
                        <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                          {step.description}
                        </p>

                        {/* Animated arrow indicator */}
                        <div className="mt-3 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                          <span>View details</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Active step indicator */}
                      {activeStep === index && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
