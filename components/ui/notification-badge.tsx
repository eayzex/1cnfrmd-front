"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NotificationBadgeProps {
  count?: number
  className?: string
}

export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (!count) {
    return <span className={cn("absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary", className)} />
  }

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={cn(
        "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </motion.div>
  )
}
