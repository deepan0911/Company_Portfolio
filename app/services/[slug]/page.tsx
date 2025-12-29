"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Code2, Smartphone, Palette, Sparkles, FileImage, 
  Star, Layers, Zap, Database, ArrowLeft, 
  CheckCircle2, Rocket, Search, Lightbulb, 
  Layout, Shield, Cpu, Globe 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const serviceDetails = {
  "web-development": {
    title: "Web Development",
    icon: Code2,
    description: "Enterprise-grade web solutions built for scale and performance.",
    fullDescription: "We craft high-performance, scalable web applications that drive business growth. Our approach combines cutting-edge technologies with user-centric design to deliver digital experiences that resonate with your global audience.",
    workflow: [
      { step: "01", title: "Discovery & Analysis", description: "In-depth research into your business needs and target audience." },
      { step: "02", title: "Architecture Design", description: "Planning the technical stack and system architecture for scalability." },
      { step: "03", title: "Agile Development", description: "Iterative building with regular updates and feedback loops." },
      { step: "04", title: "Testing & QA", description: "Rigorous testing across devices and browsers for perfection." },
      { step: "05", title: "Deployment & Scaling", description: "Launching on high-availability servers with continuous monitoring." }
    ],
    features: [
      "React & Next.js Excellence",
      "High-Availability Backend",
      "SEO & Performance Optimization",
      "Real-time Data Integration",
      "Enterprise Security Standards"
    ],
    examples: [
      {
        title: "Global Financial Dashboard",
        description: "A real-time data visualization platform for a leading financial MNC.",
        image: "/images/services/web-development-1.png"
      },
      {
        title: "E-Commerce Ecosystem",
        description: "Scalable marketplace with complex inventory management and payment integrations.",
        image: "/images/services/web-development-2.png"
      }
    ]
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Premium mobile experiences for iOS and Android.",
    fullDescription: "We build native and cross-platform mobile applications that feel fast, intuitive, and beautiful. From consumer apps to enterprise solutions, our mobile expertise ensures your brand is always in your customers' pockets.",
    workflow: [
      { step: "01", title: "User Journey Mapping", description: "Defining the paths users take to achieve their goals." },
      { step: "02", title: "UI/UX Prototyping", description: "Creating interactive mockups for early validation." },
      { step: "03", title: "Platform-Specific Build", description: "Developing with Flutter or React Native for maximum reach." },
      { step: "04", title: "Beta Testing", description: "Collecting real-world feedback from early adopters." },
      { step: "05", title: "App Store Optimization", description: "Preparing for a successful launch on iOS and Android." }
    ],
    features: [
      "Native-Like Performance",
      "Offline Synchronization",
      "Push Notification Systems",
      "Biometric Security",
      "Seamless API Integration"
    ],
    examples: [
      {
        title: "Luxury Travel Concierge",
        description: "A premium mobile experience for high-net-worth travelers.",
        image: "/images/services/mobile-app-development-1.png"
      },
      {
        title: "Health & Fitness Tracker",
        description: "Real-time sync with wearables and personalized health insights.",
        image: "/images/services/mobile-app-development-2.png"
      }
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    icon: Palette,
    description: "Deeply intuitive interfaces that users love.",
    fullDescription: "Our design philosophy centers on the user. We create interfaces that are not only visually stunning but also solve real business problems through clarity, consistency, and intuitive interactions.",
    workflow: [
      { step: "01", title: "UX Research", description: "Understanding user behavior and pain points." },
      { step: "02", title: "Wireframing", description: "Mapping out the information architecture and hierarchy." },
      { step: "03", title: "Visual Design", description: "Applying brand identity and high-fidelity aesthetics." },
      { step: "04", title: "Interactive Prototyping", description: "Simulating actual user experiences for testing." },
      { step: "05", title: "Design Systems", description: "Building scalable component libraries for consistency." }
    ],
    features: [
      "User-Centric Research",
      "Accessibility Standards",
      "Micro-Interaction Design",
      "Cross-Platform Consistency",
      "High-Fidelity Prototyping"
    ],
    examples: [
      {
        title: "Apple Ecosystem UI Design",
        description: "A comprehensive design system for a global tech organization.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "SaaS Product Interface",
        description: "Modern, clean dashboard for complex data management.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "software-development": {
    title: "Software Development",
    icon: Database,
    description: "Robust enterprise software solutions tailored to your complex needs.",
    fullDescription: "We engineer custom software systems that solve complex business challenges. Our development team focuses on creating scalable, secure, and maintainable software that empowers your organization to lead in a digital-first world.",
    workflow: [
      { step: "01", title: "Requirement Engineering", description: "Deep dive into business processes and functional requirements." },
      { step: "02", title: "System Modeling", description: "Establishing stable databases and modular architectures." },
      { step: "03", title: "Core Logic Dev", description: "Crafting efficient algorithms and business automation tools." },
      { step: "04", title: "Integration Testing", description: "Ensuring all modules work harmoniously together." },
      { step: "05", title: "Continuous Support", description: "Monitoring, maintenance, and systematic updates." }
    ],
    features: [
      "Custom ERP & CRM Systems",
      "Legacy System Migration",
      "API First Development",
      "Cloud Infrastructure Setup",
      "Data Security & Compliance"
    ],
    examples: [
      {
        title: "Enterprise Logistics Portal",
        description: "A centralized system for global supply chain management.",
        image: "/images/services/software-development-1.png"
      },
      {
        title: "Retail Automation Hub",
        description: "Automated inventory and sales tracking across 200+ global locations.",
        image: "/images/services/software-development-2.png"
      }
    ]
  },
  "brand-design": {
    title: "Brand Design",
    icon: Sparkles,
    description: "Crafting modern identities that stand out globally.",
    fullDescription: "Your brand is more than just a logo. We create cohesive brand identities that communicate your values, resonate with your target market, and build lasting emotional connections.",
    workflow: [
      { step: "01", title: "Brand Discovery", description: "Defining core values, mission, and brand personality." },
      { step: "02", title: "Visual Strategy", description: "Setting the artistic direction and color palettes." },
      { step: "03", title: "Identity Creation", description: "Designing logos, typography, and brand assets." },
      { step: "04", title: "Brand Guidelines", description: "Formalizing rules for consistent brand application." },
      { step: "05", title: "Launch Support", description: "Rolling out the new identity across all channels." }
    ],
    features: [
      "Strategic Brand Positioning",
      "Unique Visual Identity",
      "Comprehensive Style Guides",
      "Multi-Channel Consistency",
      "Brand Narrative Development"
    ],
    examples: [
      {
        title: "Minimalist Tech Rebrand",
        description: "A fresh, energetic identity for a rapidly growing Silicon Valley firm.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Modern FinTech Identity",
        description: "Trustworthy and clean branding for a digital banking disruptive.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "poster-graphics": {
    title: "Poster & Graphics",
    icon: FileImage,
    description: "Impactful visual communication for every medium.",
    fullDescription: "We transform ideas into striking visuals. Our graphic design services produce high-impact marketing materials that capture attention and drive meaningful action from your audience.",
    workflow: [
      { step: "01", title: "Creative Concepting", description: "Developing unique visual ideas for your campaign." },
      { step: "02", title: "Drafting & Layout", description: "Compiling hierarchy and visual flow." },
      { step: "03", title: "Iterative Refinement", description: "Perfecting colors, typography, and imagery." },
      { step: "04", title: "Production Setup", description: "Optimizing files for digital and print media." },
      { step: "05", title: "Quality Check", description: "Final review for maximum visual impact." }
    ],
    features: [
      "Custom Digital Graphics",
      "Print-Ready Marketing Materials",
      "Social Media Campaigns",
      "Event Branding Collateral",
      "Illustration & Art Direction"
    ],
    examples: [
      {
        title: "Tech Summit Campaign",
        description: "A set of high-impact posters for an international AI conference.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Product Launch Series",
        description: "Dynamic social media graphics for a global gadget release.",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "logo-design": {
    title: "Logo Design",
    icon: Star,
    description: "Memorable icons that embody your brand's essence.",
    fullDescription: "A great logo is timeless, simple, and memorable. We design distinctive icons that serve as the foundation of your visual brand identity and survive the test of time.",
    workflow: [
      { step: "01", title: "Concept Brainstorming", description: "Exploring diverse visual metaphors for your brand." },
      { step: "02", title: "Initial Sketching", description: "Drafting raw ideas on paper for pure creativity." },
      { step: "03", title: "Digital Rendering", description: "Refining concepts in vector format for precision." },
      { step: "04", title: "Typography Synergy", description: "Pairing the mark with perfectly balanced type." },
      { step: "05", title: "Final Brand Mark", description: "Delivering the logo in all professional formats." }
    ],
    features: [
      "Handcrafted Custom Icons",
      "Vector Scalability (SVG/AI)",
      "Bespoke Wordmarks",
      "Responsive Logo Variations",
      "Color & Monochromatic Kits"
    ],
    examples: [
      {
        title: "Eco-Tech Innovation",
        description: "A minimalist, green-focused mark for a sustainable tech company.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Fashion Label Mark",
        description: "Elegant and sophisticated monogram for a luxury boutique.",
        image: "https://images.unsplash.com/photo-1541462608141-ad603831414c?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "invitation-design": {
    title: "Invitation Design",
    icon: Layers,
    description: "Elegant invitations for life's most precious moments.",
    fullDescription: "We create bespoke invitations that set the tone for your special event. From weddings to high-end corporate galas, our designs embody sophistication and celebrate every detail.",
    workflow: [
      { step: "01", title: "Style Discovery", description: "Aligning with the event's theme and atmosphere." },
      { step: "02", title: "Paper & Finish Ideas", description: "Considering tactile elements and premium textures." },
      { step: "03", title: "Artistic Illustration", description: "Creating custom graphics for that personal touch." },
      { step: "04", title: "Layout Perfection", description: "Balancing elegance with vital information." },
      { step: "05", title: "Assembly Readiness", description: "Providing files ready for premium printing." }
    ],
    features: [
      "Custom Typography & Calligraphy",
      "Thematic Illustration Art",
      "Print-Ready Layouts",
      "Digital RSVP Integration",
      "Event Brand Coordination"
    ],
    examples: [
      {
        title: "MNC Gala Ball",
        description: "Sophisticated navy and gold invitations for a charity gala.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Luxury Wedding Suite",
        description: "Minimalist and floral theme with custom foil details.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "tech-solutions": {
    title: "Tech Solutions",
    icon: Zap,
    description: "Cutting-edge technology integration for peak efficiency.",
    fullDescription: "We provide strategic technical consulting and solutions that modernize your operations. Our goal is to leverage the latest technology to solve business inefficiencies and drive innovation.",
    workflow: [
      { step: "01", title: "Systems Audit", description: "Evaluating current technical infrastructure." },
      { step: "02", title: "Gap Analysis", description: "Identifying opportunities for technological growth." },
      { step: "03", title: "Solution Scouting", description: "Finding the best-fit tools and platforms." },
      { step: "04", title: "Implementation Plan", description: "Strategic rollout with minimal disruption." },
      { step: "05", title: "Efficiency Monitoring", description: "Tracking performance and iterating for success." }
    ],
    features: [
      "Cloud Integration Services",
      "Legacy Systems Modernization",
      "Technical Debt Reduction",
      "Cybersecurity Consulting",
      "Agile Tech Strategy"
    ],
    examples: [
      {
        title: "Advanced Processor Integration",
        description: "A custom internal system that reduced manual work by 60%.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Secure Data Warehouse",
        description: "Scalable and high-performance data lake for an analytics firm.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
}

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = serviceDetails[slug as keyof typeof serviceDetails]

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/#services">
          <Button variant="outline">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Services
          </Button>
        </Link>
      </div>
    )
  }

  const ServiceIcon = service.icon

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Fixed Back Button */}
      <Link 
        href="/#services" 
        className="fixed top-24 left-4 lg:left-8 z-40 flex items-center justify-center w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/30 transition-all duration-500 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl hover:translate-x-[-4px]"
        aria-label="Back to Services"
      >
        <div className="flex items-center justify-center w-full h-full rounded-2xl bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
          <ArrowLeft className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
        </div>
      </Link>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-4 lg:px-8 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-8 icon-premium-hover shadow-xl">
            <ServiceIcon className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fadeInUp">
            {service.title}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-foreground leading-tight">
                Strategic Excellence in <span className="text-primary">{service.title}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {service.fullDescription}
              </p>
              
              <div className="space-y-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group animate-scaleIn">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl group-hover:bg-primary/20 transition-all duration-700 -z-10" />
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden card-premium-hover">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={service.examples[0].image} 
                      alt={service.examples[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                      <h4 className="text-white text-2xl font-bold mb-2">{service.examples[0].title}</h4>
                      <p className="text-white/80 text-sm">{service.examples[0].description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 px-4 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Our Workflow</h2>
            <p className="text-lg text-muted-foreground">A proven, systematic approach to delivering excellence for every project.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.workflow.map((step, idx) => (
              <Card key={idx} className="group border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover relative h-full">
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <CardContent className="p-8">
                  <div className="text-4xl font-black text-primary/10 mb-4 group-hover:text-primary/20 transition-colors duration-300">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Showcase */}
      <section className="py-24 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Portfolio Showcase</h2>
            <p className="text-lg text-muted-foreground">Recent excellence delivered across our {service.title} spectrum.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {service.examples.map((example, idx) => (
              <Card key={idx} className="group overflow-hidden border-border/50 bg-card card-premium-hover shadow-xl">
                <div className="aspect-video relative overflow-hidden">
                   <Image 
                    src={example.image} 
                    alt={example.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h4 className="text-foreground text-2xl font-bold mb-2">{example.title}</h4>
                    <p className="text-muted-foreground text-sm">{example.description}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Explore Details</Button>
                    </div>
                  </div>
                </div>
                <CardHeader className="group-hover:translate-y-[-10px] transition-transform duration-500">
                   <CardTitle className="text-xl">{example.title}</CardTitle>
                   <p className="text-sm text-muted-foreground">{example.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          <Card className="bg-primary text-primary-foreground p-12 lg:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">Ready to Build Your Vision?</h2>
              <p className="text-xl text-primary-foreground/80 mb-12">
                Let's discuss how our {service.title} expertise can transform your business goals into digital reality.
              </p>
              <Link href="/#contact">
                <Button size="lg" variant="secondary" className="px-12 py-8 text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-300">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
