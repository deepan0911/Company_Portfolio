import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Toaster } from "sonner"
import AuthProvider from "@/components/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

export const metadata: Metadata = {
  title: "WeBD - Affordable Web & Design Services",
  description:
    "Professional freelancing services including web development, mobile apps, UI/UX design, brand design, and more at affordable prices",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right" 
            closeButton 
            toastOptions={{
              style: {
                background: 'white',
                color: '#111827',
                fontSize: '15px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
              className: 'toast-custom',
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
