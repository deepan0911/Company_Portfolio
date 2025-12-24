"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 lg:px-8 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">


          <h1
            className="text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-8 text-balance leading-[1.1] animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Transform Your Vision Into
            <span className="block text-primary mt-2">Digital Excellence</span>
          </h1>

          <p
            className="text-lg lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Professional freelancing services spanning web development, mobile apps, software solutions, UI/UX design,
            and creative services—delivered with uncompromising quality.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "150+", label: "Projects Delivered", delay: "0.4s" },
              { value: "98%", label: "Client Satisfaction", delay: "0.5s" },
              { value: "24/7", label: "Support Available", delay: "0.6s" },
              { value: "Global", label: "Client Reach", delay: "0.7s" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 animate-scaleIn group"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
