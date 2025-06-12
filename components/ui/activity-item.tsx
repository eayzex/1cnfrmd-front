import type * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

interface ActivityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string
    image?: string
  }
  action: string
  timestamp: string
  description?: string
}

export function ActivityItem({ user, action, timestamp, description, className, ...props }: ActivityItemProps) {
  return (
    <div
      className={cn("flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50", className)}
      {...props}
    >
      <Avatar className="h-9 w-9">
        {user.image ? (
          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
        ) : (
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-medium leading-none">{user.name}</p>
          <p className="text-sm text-muted-foreground">{action}</p>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  )
}
