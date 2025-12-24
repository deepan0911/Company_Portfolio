"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$499",
    description: "Perfect for small projects and individuals",
    features: [
      "Single page website or simple design",
      "Responsive design",
      "Basic SEO optimization",
      "2 rounds of revisions",
      "7-day delivery",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$1,299",
    description: "Ideal for growing businesses",
    features: [
      "Multi-page website or complex design",
      "Custom UI/UX design",
      "Advanced SEO optimization",
      "Unlimited revisions",
      "14-day delivery",
      "Priority support",
      "Source files included",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale projects",
    features: [
      "Full-stack web application",
      "Mobile app development",
      "Complete brand identity",
      "Unlimited revisions",
      "Flexible timeline",
      "24/7 dedicated support",
      "Maintenance & updates",
      "Technical consulting",
    ],
  },
]

export function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-16 lg:py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Affordable packages designed to fit your budget and needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-700 card-premium-hover ${
                plan.popular 
                  ? "border-primary/50 border-2 shadow-2xl shadow-primary/20" 
                  : "border-border/50 shadow-lg hover:border-primary/30"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {plan.popular && (
                <>
                  {/* Animated popular badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                      Most Popular
                    </span>
                  </div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-50 animate-gradient" />
                </>
              )}

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                plan.popular 
                  ? "from-primary/50 via-primary to-primary/50" 
                  : "from-primary/0 via-primary/30 to-primary/0 opacity-0 hover:opacity-100"
              } transition-opacity duration-500`} />

              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="text-2xl font-bold text-foreground transition-colors duration-300 hover:text-primary">
                  {plan.name}
                </CardTitle>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground text-sm ml-1">/ project</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="relative z-10">
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 group/item transition-all duration-300 hover:translate-x-1"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:bg-primary/20 transition-colors duration-300">
                        <Check className="w-3.5 h-3.5 text-primary group-hover/item:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors duration-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={scrollToContact} 
                  variant={plan.popular ? "default" : "outline"} 
                  className={`w-full transition-all duration-500 ${
                    plan.popular 
                      ? "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105" 
                      : "hover:bg-primary/5 hover:border-primary/50 hover:scale-105"
                  }`}
                >
                  <span className="font-semibold">Get Started</span>
                  <svg 
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </CardContent>

              {/* Bottom corner gradient accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-tl-full pointer-events-none" />
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <button onClick={scrollToContact} className="text-primary hover:underline font-medium">
              Contact us
            </button>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  )
}
