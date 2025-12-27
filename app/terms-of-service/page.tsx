"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, DollarSign, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
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
              <Scale className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fadeInUp">
              Terms of Service
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              Please read these terms carefully before using our services.
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
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  By accessing or using WeBD's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who access or use our services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Website visitors and users</li>
                  <li>Clients who engage our services</li>
                  <li>Third parties who interact with our platform</li>
                  <li>Anyone who communicates with us through any channel</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Services Description</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  WeBD provides professional freelancing services including, but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Web Development (Frontend, Backend, Full-Stack)</li>
                  <li>Mobile Application Development (iOS, Android, Cross-Platform)</li>
                  <li>UI/UX Design and User Experience Consulting</li>
                  <li>Brand Design and Identity Development</li>
                  <li>Graphic Design, Posters, and Marketing Materials</li>
                  <li>Logo Design and Visual Branding</li>
                  <li>Software Development and Custom Solutions</li>
                  <li>Technical Consulting and Strategy</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Payment Terms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Project Pricing:</strong> All project costs will be outlined in a detailed proposal or contract before work begins. Pricing may vary based on project scope, complexity, timeline, and specific requirements.
                </p>
                <p>
                  <strong>Payment Structure:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A deposit (typically 30-50%) is required before project commencement</li>
                  <li>Milestone payments may be established for larger projects</li>
                  <li>Final payment is due upon project completion and delivery</li>
                  <li>Payment terms will be specified in the project agreement</li>
                </ul>
                <p>
                  <strong>Late Payments:</strong> Invoices not paid within the agreed timeframe may incur late fees. We reserve the right to suspend work or withhold deliverables until payment is received.
                </p>
                <p>
                  <strong>Refunds:</strong> Refund policies will be outlined in individual project agreements. Generally, deposits are non-refundable once work has commenced.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Project Timeline & Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Timelines:</strong> Project timelines will be established in the project agreement. While we strive to meet all deadlines, timelines are estimates and may be affected by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Scope changes or additional feature requests</li>
                  <li>Delays in client feedback or approval</li>
                  <li>Technical challenges or unforeseen complications</li>
                  <li>Third-party dependencies or integrations</li>
                </ul>
                <p>
                  <strong>Client Responsibilities:</strong> Timely delivery depends on clients providing:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Prompt feedback and approvals</li>
                  <li>Required content, assets, and materials</li>
                  <li>Access to necessary systems and platforms</li>
                  <li>Clear communication and decision-making</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Intellectual Property Rights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Client Ownership:</strong> Upon full payment, clients receive ownership of the final deliverables created specifically for their project, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom designs, graphics, and visual assets</li>
                  <li>Source code and application files</li>
                  <li>Documentation and project materials</li>
                </ul>
                <p>
                  <strong>WeBD Retains:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Rights to reusable code libraries and frameworks</li>
                  <li>Rights to display work in our portfolio (unless otherwise agreed)</li>
                  <li>Rights to methodologies and processes</li>
                  <li>Pre-existing intellectual property</li>
                </ul>
                <p>
                  <strong>Third-Party Assets:</strong> Any third-party assets (fonts, stock images, libraries) remain subject to their original licenses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Warranties & Disclaimers</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Quality Assurance:</strong> We strive to deliver high-quality work that meets professional standards. However:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services are provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee specific business results or outcomes</li>
                  <li>We are not responsible for third-party service failures</li>
                  <li>Browser/device compatibility is tested but not guaranteed across all platforms</li>
                </ul>
                <p>
                  <strong>Support Period:</strong> Post-launch support terms will be specified in the project agreement. Extended support or maintenance may require a separate agreement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the maximum extent permitted by law, WeBD shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Data loss or corruption</li>
                  <li>Third-party claims or actions</li>
                  <li>Damages exceeding the total amount paid for the specific project</li>
                </ul>
                <p className="mt-4">
                  This limitation applies regardless of the legal theory (contract, tort, negligence, etc.) and even if we have been advised of the possibility of such damages.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Confidentiality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We respect the confidentiality of client information and will:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keep proprietary information confidential</li>
                  <li>Not disclose sensitive business information to third parties</li>
                  <li>Use information only for the purpose of delivering services</li>
                  <li>Sign NDAs when requested by clients</li>
                </ul>
                <p>
                  Clients are similarly expected to keep our proprietary processes, methodologies, and business information confidential.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  <strong>By Client:</strong> Clients may terminate a project at any time with written notice. In such cases:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment is due for all work completed to date</li>
                  <li>Deposits are non-refundable</li>
                  <li>Clients receive deliverables for completed milestones only</li>
                </ul>
                <p>
                  <strong>By WeBD:</strong> We reserve the right to terminate a project if:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment terms are not met</li>
                  <li>Client fails to provide necessary materials or feedback</li>
                  <li>Project scope changes significantly without agreement</li>
                  <li>Client behavior is abusive or unprofessional</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu, India.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                </p>
                <p>
                  For significant changes, we will make reasonable efforts to notify active clients via email.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-premium-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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
