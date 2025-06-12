"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, MessageSquare, Calendar, Users, BarChart2, FileText, Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/ui/user-nav"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { NotificationBadge } from "@/components/ui/notification-badge"
import { PageTransition } from "@/components/ui/page-transition"
import { Suspense } from "react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Templates",
    href: "/dashboard/templates",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart2 className="h-4 w-4" />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsClient(true)
    // Check if user is authenticated
    const token = localStorage.getItem("auth-token")
    const currentUser = localStorage.getItem("current-user")

    if (!token || !currentUser) {
      router.push("/login")
    }
  }, [router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would search across messages, contacts, etc.
      alert(`Searching for: ${searchQuery}`)
    }
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex h-16 items-center border-b px-2">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold">1Confirmed</span>
                  </Link>
                </div>
                <nav className="mt-4 flex flex-col gap-2 px-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="hidden items-center gap-2 md:flex">
              <span className="text-xl font-bold">1Confirmed</span>
            </Link>
            <MainNav className="hidden md:flex" items={navItems} />
            <MobileNav items={navItems} />
          </div>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-full bg-muted pl-8 md:w-[240px] lg:w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <NotificationBadge count={3} />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <PageTransition>
          <div className="container py-6">
            <Suspense>{children}</Suspense>
          </div>
        </PageTransition>
      </main>
    </div>
  )
}
