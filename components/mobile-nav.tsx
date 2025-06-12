"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileNavProps {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center gap-2 pb-4">
          <span className="text-xl font-bold">1Confirmed</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <AnimatePresence>
            <div className="flex flex-col space-y-3">
              {items.map((item, index) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      {item.title}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
