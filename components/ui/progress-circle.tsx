import type * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const progressCircleVariants = cva("", {
  variants: {
    variant: {
      default: "stroke-primary",
      success: "stroke-emerald-500",
      warning: "stroke-amber-500",
      danger: "stroke-rose-500",
    },
    size: {
      sm: "h-16 w-16",
      md: "h-24 w-24",
      lg: "h-32 w-32",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressCircleVariants> {
  value: number
  max?: number
  showValue?: boolean
  strokeWidth?: number
}

export function ProgressCircle({
  value,
  max = 100,
  showValue = true,
  strokeWidth = 8,
  variant,
  size,
  className,
  ...props
}: ProgressCircleProps) {
  const percentage = (value / max) * 100
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative", progressCircleVariants({ variant, size, className }))} {...props}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle className="fill-none stroke-muted" cx="50" cy="50" r={radius} strokeWidth={strokeWidth} />
        <circle
          className={cn("fill-none transition-all duration-300 ease-in-out", progressCircleVariants({ variant }))}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}
