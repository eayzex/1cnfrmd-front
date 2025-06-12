"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn, getInitials } from "@/lib/utils"
import { MessageSquare, Phone } from "lucide-react"
import { motion } from "framer-motion"

interface ContactCardProps {
  name: string
  phone: string
  email?: string
  tags?: string[]
  image?: string
  isSelected?: boolean
  onClick?: () => void
  onMessageClick?: () => void
  onCallClick?: () => void
  delay?: number
}

export function ContactCard({
  name,
  phone,
  email,
  tags,
  image,
  isSelected = false,
  onClick,
  onMessageClick,
  onCallClick,
  delay = 0,
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className={cn("cursor-pointer overflow-hidden transition-all hover:shadow-md", isSelected && "border-primary")}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {image ? (
                <AvatarImage src={image || "/placeholder.svg"} alt={name} />
              ) : (
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{phone}</p>
              {email && <p className="text-xs text-muted-foreground">{email}</p>}
              {tags && tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              onClick={(e) => {
                e.stopPropagation()
                onMessageClick?.()
              }}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Message</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              onClick={(e) => {
                e.stopPropagation()
                onCallClick?.()
              }}
            >
              <Phone className="h-4 w-4" />
              <span className="sr-only">Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
