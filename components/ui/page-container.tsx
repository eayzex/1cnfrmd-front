"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animate?: boolean
}

export function PageContainer({ children, animate = true, className, ...props }: PageContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (!animate) {
    return (
      <div className={cn("space-y-6", className)} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cn("space-y-6", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function PageSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  )
}
