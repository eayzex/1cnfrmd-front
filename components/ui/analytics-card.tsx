"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsCardProps {
  title: string
  value: string | number
  change: {
    value: string | number
    trend: "up" | "down" | "neutral"
  }
  data: Array<{ name: string; value: number }>
  icon?: React.ReactNode
  className?: string
  delay?: number
}

export function AnalyticsCard({ title, value, change, data, icon, className, delay = 0 }: AnalyticsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="rounded-full bg-primary/10 p-1.5">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div
            className={cn("mt-1 flex items-center text-xs", {
              "text-emerald-500": change.trend === "up",
              "text-rose-500": change.trend === "down",
              "text-muted-foreground": change.trend === "neutral",
            })}
          >
            {change.trend === "up" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3">
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {change.trend === "down" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3">
                <path
                  fillRule="evenodd"
                  d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-.916.369l-4.453-1.675a.75.75 0 01.526-1.406l3.094 1.161A19.422 19.422 0 0010.971 8.29L7 12.26 1.22 6.483a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{change.value}</span>
          </div>
          <div className="mt-4 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
