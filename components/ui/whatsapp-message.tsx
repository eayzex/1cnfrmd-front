"use client"

import { cn } from "@/lib/utils"
import { CheckCheck, Check } from "lucide-react"
import { motion } from "framer-motion"

type MessageStatus = "sent" | "delivered" | "read"

interface WhatsAppMessageProps {
  content: string
  timestamp: string
  type: "incoming" | "outgoing"
  status?: MessageStatus
  senderName?: string
  delay?: number
}

export function WhatsAppMessage({
  content,
  timestamp,
  type,
  status = "delivered",
  senderName,
  delay = 0,
}: WhatsAppMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn("mb-4 flex", type === "incoming" ? "justify-start" : "justify-end")}
    >
      <div
        className={cn("relative max-w-[80%]", type === "incoming" ? "chat-bubble-incoming" : "chat-bubble-outgoing")}
      >
        {senderName && type === "incoming" && <div className="mb-1 text-xs font-medium text-primary">{senderName}</div>}
        <div className="whitespace-pre-wrap break-words">{content}</div>
        <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <span>{timestamp}</span>
          {type === "outgoing" && (
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
        </div>
      </div>
    </motion.div>
  )
}
