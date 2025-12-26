"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send, LogIn } from "lucide-react"

export function Contact() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFieldClick = () => {
    if (!session && status !== "loading") {
      toast.error("Please sign in to use the contact form")
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname + '#contact')}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is authenticated
    if (!session) {
      toast.error("Please sign in to submit the contact form")
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname + '#contact')}`)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await toast.promise(
        fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            email: session.user?.email, // Use logged-in user's email
          }),
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error("Failed to send message")
          }
          return response.json()
        }),
        {
          loading: "Sending your message...",
          success: "Thank you for your message! We'll get back to you soon.",
          error: "Failed to send message. Please try again.",
        }
      )
      setFormData({ name: "", mobile: "", service: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 px-4 lg:px-8 bg-muted">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Ready to start your project? Get in touch and let's create something amazing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="group transition-all duration-500 hover:shadow-2xl border-border/50 hover:border-primary/30 overflow-hidden relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 lg:p-8 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onClick={handleFieldClick}
                        required
                        className="transition-all duration-300 focus:scale-[1.02]"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                        Mobile Number
                      </label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        onClick={handleFieldClick}
                        required
                        className="transition-all duration-300 focus:scale-[1.02]"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Service Interested In
                      </label>
                      <Input
                        id="service"
                        placeholder="e.g., Web Development, Logo Design"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onClick={handleFieldClick}
                        required
                        className="transition-all duration-300 focus:scale-[1.02]"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Project Details
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onClick={handleFieldClick}
                      required
                      className="transition-all duration-300 focus:scale-[1.01]"
                      suppressHydrationWarning
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group/btn shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    suppressHydrationWarning
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    <span className="relative z-10 font-semibold">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <Send className="ml-2 w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:rotate-12" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <Card className="group transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 card-premium-hover border-border/50 hover:border-primary/30 overflow-hidden relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 py-5 lg:px-8 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-500 icon-premium-hover shadow-md group-hover:shadow-lg">
                    <Mail className="w-6 h-6 text-primary transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">Email Us</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">hello@freelance.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10 card-premium-hover border-border/50 hover:border-secondary/30 overflow-hidden relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 py-5 lg:px-8 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-all duration-500 icon-premium-hover shadow-md group-hover:shadow-lg">
                    <Phone className="w-6 h-6 text-secondary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-secondary transition-colors duration-300">Call Us</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      +91 93606 48801<br />
                      +91 89460 40919
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 card-premium-hover border-border/50 hover:border-accent/30 overflow-hidden relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 py-5 lg:px-8 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-all duration-500 icon-premium-hover shadow-md group-hover:shadow-lg">
                    <MapPin className="w-6 h-6 text-accent-foreground transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-accent-foreground transition-colors duration-300">Visit Us</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      Coimbatore
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
