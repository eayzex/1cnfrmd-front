"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { motion, type HTMLMotionProps } from "framer-motion"

interface PageContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  animate?: boolean
}

export const PageContainer = ({ children, animate = true, className, ...props }: PageContainerProps) => {
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
      <div className={cn("space-y-6", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
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

interface PageSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
}

export const PageSection = ({ children, className, ...props }: PageSectionProps) => {
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
