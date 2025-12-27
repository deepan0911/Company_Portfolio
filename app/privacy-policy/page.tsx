"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, Database, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Fixed Back Button */}
      <Link 
        href="/" 
        className="fixed top-24 left-4 lg:left-8 z-40 flex items-center justify-center w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/30 transition-all duration-500 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl hover:translate-x-[-4px]"
        aria-label="Back to Home"
      >
        <div className="flex items-center justify-center w-full h-full rounded-2xl bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
          <ArrowLeft className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
        </div>
      </Link>
      
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-4 lg:px-8 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-8 icon-premium-hover shadow-xl">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fadeInUp">
              Privacy Policy
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: December 27, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Information We Collect</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details when you fill out forms or contact us.</li>
                  <li><strong>Project Information:</strong> Details about your project requirements, business needs, and preferences.</li>
                  <li><strong>Communication Data:</strong> Records of your communications with us, including emails and messages.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data collected through cookies and analytics tools.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you project updates, newsletters, and marketing communications (with your consent)</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Data Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data storage and backup systems</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Your Rights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations</li>
                  <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at <a href="mailto:hello@freelance.com" className="text-primary hover:underline">hello@freelance.com</a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cookies and Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our website.
                </p>
                <p>
                  Types of cookies we use:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may use third-party services to help us operate our business and provide services to you. These third parties may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
                </p>
                <p>
                  Third-party services we use may include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Analytics providers (e.g., Google Analytics)</li>
                  <li>Email service providers</li>
                  <li>Payment processors</li>
                  <li>Cloud hosting services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 mt-4">
                  <p><strong>Email:</strong> <a href="mailto:hello@freelance.com" className="text-primary hover:underline">hello@freelance.com</a></p>
                  <p><strong>Phone:</strong> +91 93606 48801 / +91 89460 40919</p>
                  <p><strong>Location:</strong> Coimbatore, India</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
