"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("auth-token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to authenticate
      // For demo purposes, we'll check localStorage for registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registered-users") || "[]")

      const user = registeredUsers.find(
        (user: { email: string; password: string }) => user.email === email && user.password === password,
      )

      if (user || (email === "demo@example.com" && password === "password")) {
        // Store auth token in localStorage
        localStorage.setItem("auth-token", "demo-token")
        localStorage.setItem("current-user", JSON.stringify({ email }))
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Try demo@example.com / password")
        setShowDemo(true)
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("demo@example.com")
    setPassword("password")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">1Confirmed</span>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden flex-col justify-center md:flex"
          >
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome back</h1>
              <p className="text-muted-foreground">
                Log in to your account to access your WhatsApp Business Platform dashboard
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Send automated messages to your customers</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Create and manage message templates</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Track message delivery and engagement</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Login to your account</h1>
                <p className="text-sm text-muted-foreground">Enter your email and password to continue</p>
              </div>
              <div className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>

                {showDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="rounded-md bg-muted p-3"
                  >
                    <p className="text-sm font-medium">Need quick access?</p>
                    <p className="mb-2 text-xs text-muted-foreground">Use our demo account to explore the platform</p>
                    <Button type="button" variant="outline" size="sm" className="w-full" onClick={handleDemoLogin}>
                      Use Demo Account
                    </Button>
                  </motion.div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
