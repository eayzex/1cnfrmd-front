"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MessageSquare, Users, ArrowUpRight, Edit } from "lucide-react"
import { motion } from "framer-motion"

interface CampaignCardProps {
  name: string
  status: "Active" | "Scheduled" | "Draft" | "Completed"
  type: string
  recipients: number
  schedule: string
  description: string
  onViewClick?: () => void
  onEditClick?: () => void
  delay?: number
}

export function CampaignCard({
  name,
  status,
  type,
  recipients,
  schedule,
  description,
  onViewClick,
  onEditClick,
  delay = 0,
}: CampaignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {type === "Promotional" ? (
                <MessageSquare className="h-5 w-5 text-primary" />
              ) : type === "Automated" ? (
                <Clock className="h-5 w-5 text-primary" />
              ) : (
                <Calendar className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{name}</h3>
                    <Badge
                      variant={
                        status === "Active"
                          ? "default"
                          : status === "Scheduled"
                            ? "outline"
                            : status === "Completed"
                              ? "secondary"
                              : "secondary"
                      }
                      className={status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{recipients} recipients</span>
                  </div>
                </div>
              </div>
              <p className="text-sm">{description}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{schedule}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEditClick}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onViewClick}>
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
