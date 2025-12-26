"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import { GoogleIcon } from "@/components/google-icon"

export default function SignUpPage() {
  const router = useRouter()

  const [step, setStep] = useState<'details' | 'otp'>('details')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP")
      }

      toast.success("OTP sent to your email! Please check your inbox.")
      setStep('otp')
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          name: formData.name,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify OTP")
      }

      toast.success("Account created successfully! Signing you in...")

      // Auto sign in after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Account created but failed to sign in. Please sign in manually.")
        router.push("/auth/signin")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP")
      }

      toast.success("New OTP sent to your email!")
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      toast.error("Failed to sign up with Google")
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
          {step === 'otp' && (
            <div className="p-4 pb-0">
              <button
                type="button"
                onClick={() => setStep('details')}
                disabled={isLoading}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-50 flex items-center gap-1"
              >
                ← Back to sign up
              </button>
            </div>
          )}
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold">
              {step === 'details' ? 'Sign Up' : 'Verify Email'}
            </CardTitle>
            <CardDescription>
              {step === 'details' 
                ? 'Create your account to get started'
                : `Enter the 6-digit code sent to ${formData.email}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'details' ? (
              <>
                {/* Email/Password Form */}
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="pl-10 h-12 transition-all duration-300 focus:scale-[1.02]"
                        disabled={isLoading || isGoogleLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="pl-10 h-12 transition-all duration-300 focus:scale-[1.02]"
                        disabled={isLoading || isGoogleLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="pl-10 h-12 transition-all duration-300 focus:scale-[1.02]"
                        disabled={isLoading || isGoogleLoading}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        className="pl-10 h-12 transition-all duration-300 focus:scale-[1.02]"
                        disabled={isLoading || isGoogleLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                    disabled={isLoading || isGoogleLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">
                      {isLoading ? "Sending OTP..." : "Continue"}
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign Up - Icon Only */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={isGoogleLoading || isLoading}
                    className="w-11 h-11 rounded-full border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <GoogleIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification Form */}
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">
                      Verification Code
                    </Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="000000"
                        value={formData.otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setFormData({ ...formData, otp: value })
                        }}
                        required
                        maxLength={6}
                        className="pl-10 h-12 text-center transition-all duration-300 focus:scale-[1.02]"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">
                      {isLoading ? "Verifying..." : "Verify & Create Account"}
                    </span>
                    <CheckCircle2 className="ml-2 h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isLoading}
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 hover:underline disabled:opacity-50"
                    >
                      Didn't receive the code? Resend OTP
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors duration-300 hover:underline"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
