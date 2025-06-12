"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn, getInitials, truncateText } from "@/lib/utils"
import { CheckCheck, Check } from "lucide-react"
import { motion } from "framer-motion"

type MessageStatus = "sent" | "delivered" | "read"

interface ChatPreviewProps {
  name: string
  message: string
  time: string
  unreadCount?: number
  status?: MessageStatus
  isActive?: boolean
  image?: string
  onClick?: () => void
  delay?: number
}

export function ChatPreview({
  name,
  message,
  time,
  unreadCount = 0,
  status,
  isActive = false,
  image,
  onClick,
  delay = 0,
}: ChatPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all hover:bg-muted/50",
        isActive && "bg-muted",
      )}
    >
      <Avatar className="h-12 w-12">
        {image ? (
          <AvatarImage src={image || "/placeholder.svg"} alt={name} />
        ) : (
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{truncateText(message, 30)}</p>
          <div className="flex items-center gap-1">
            {status && (
              <span
                className={cn("flex", {
                  "text-gray-400": status === "sent" || status === "delivered",
                  "text-blue-500": status === "read",
                })}
              >
                {status === "sent" && <Check className="h-3 w-3" />}
                {(status === "delivered" || status === "read") && <CheckCheck className="h-3 w-3" />}
              </span>
            )}
            {unreadCount > 0 && (
              <Badge variant="default" className="h-5 min-w-5 rounded-full px-1.5 py-0">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
