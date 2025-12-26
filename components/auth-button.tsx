"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AuthButton() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogoutConfirm = async () => {
    try {
      await signOut({ callbackUrl: "/", redirect: false })
      toast.success("Logged out successfully!")
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Failed to logout. Please try again.")
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center gap-6">
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
      </div>
    )
  }

  // Not logged in - show Sign In and Sign Up as text links
  if (!session) {
    return (
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push("/auth/signin")}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/auth/signup")}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    )
  }

  // Logged in - show Logout as text link with confirmation dialog
  return (
    <>
      <button
        onClick={() => setShowLogoutDialog(true)}
        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
      >
        Logout
      </button>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm} className="bg-primary hover:bg-primary/90">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

