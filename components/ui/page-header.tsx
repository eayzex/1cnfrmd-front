import type * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  description?: string
  separator?: boolean
  children?: React.ReactNode
}

export function PageHeader({
  heading,
  description,
  separator = false,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      {separator && <Separator className="mt-4" />}
    </div>
  )
}
