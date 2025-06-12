"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Copy, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface TemplateCardProps {
  name: string
  content: string
  category: string
  status: "Approved" | "Pending" | "Rejected"
  onCopyClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
  delay?: number
}

export function TemplateCard({
  name,
  content,
  category,
  status,
  onCopyClick,
  onEditClick,
  onDeleteClick,
  delay = 0,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{name}</h3>
                <Badge
                  variant={status === "Approved" ? "default" : status === "Pending" ? "outline" : "destructive"}
                  className={status === "Approved" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{category}</p>
              <div className="mt-2 rounded-md bg-muted p-3">
                <p className="text-sm">{content}</p>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onCopyClick}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onEditClick}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={onDeleteClick}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
