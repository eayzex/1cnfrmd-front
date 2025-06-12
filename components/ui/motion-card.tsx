"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const MotionCard = motion(Card)
const MotionCardHeader = motion(CardHeader)
const MotionCardTitle = motion(CardTitle)
const MotionCardDescription = motion(CardDescription)
const MotionCardContent = motion(CardContent)
const MotionCardFooter = motion(CardFooter)

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number
  children: React.ReactNode
}

export function AnimatedCard({ delay = 0, className, children, ...props }: AnimatedCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionCard>
  )
}

export { MotionCard, MotionCardHeader, MotionCardTitle, MotionCardDescription, MotionCardContent, MotionCardFooter }
