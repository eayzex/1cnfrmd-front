import type * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cva, type VariantProps } from "class-variance-authority"

const statCardVariants = cva("", {
  variants: {
    trend: {
      up: "text-emerald-500",
      down: "text-rose-500",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
})

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  icon?: React.ReactNode
  trendValue?: string
  trendIcon?: React.ReactNode
}

export function StatCard({ title, value, icon, trendValue, trendIcon, trend, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="rounded-full bg-primary/10 p-1.5">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trendValue && (
          <div className={cn("mt-1 flex items-center text-xs", statCardVariants({ trend }))}>
            {trendIcon}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
