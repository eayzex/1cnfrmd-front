"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureCard({ icon, title, description, className, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn("group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md", className)}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
