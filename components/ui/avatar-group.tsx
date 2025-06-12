import type * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, getInitials, getRandomColor } from "@/lib/utils"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    name: string
    image?: string
  }[]
  max?: number
}

export function AvatarGroup({ items, max = 4, className, ...props }: AvatarGroupProps) {
  const visibleItems = items.slice(0, max)
  const remainingCount = items.length - max

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visibleItems.map((item, index) => (
        <Avatar key={index} className="ring-2 ring-background transition-transform hover:z-10 hover:scale-110">
          {item.image ? (
            <AvatarImage src={item.image || "/placeholder.svg"} alt={item.name} />
          ) : (
            <AvatarFallback style={{ backgroundColor: getRandomColor(item.name) }} className="text-white">
              {getInitials(item.name)}
            </AvatarFallback>
          )}
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="ring-2 ring-background bg-muted">
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
