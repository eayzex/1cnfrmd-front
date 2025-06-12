"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-[450px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50",
        className,
      )}
      {...props}
    >
      {icon && <div className="mb-4 text-muted-foreground/60">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-muted-foreground">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  )
}
