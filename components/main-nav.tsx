"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function MainNav({ className, items, ...props }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.title}
            {isActive && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                layoutId="navbar-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
