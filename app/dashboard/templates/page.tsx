"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { TemplateCard } from "@/components/ui/template-card"
import { EmptyState } from "@/components/ui/empty-state"
import { motion } from "framer-motion"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample template data
  const templates = [
    {
      id: 1,
      name: "Appointment Reminder",
      content:
        "Hello [Name], this is a reminder about your appointment scheduled for [Date] at [Time]. Please reply YES to confirm or NO to reschedule.",
      category: "Reminders",
      status: "Approved" as const,
    },
    {
      id: 2,
      name: "Birthday Greeting",
      content: "Happy Birthday, [Name]! As a valued customer, enjoy 20% off your next purchase with code BIRTHDAY20.",
      category: "Greetings",
      status: "Approved" as const,
    },
    {
      id: 3,
      name: "Order Confirmation",
      content:
        "Thank you for your order, [Name]! Your order #[OrderID] has been confirmed and will be processed shortly. We'll notify you when it ships.",
      category: "Transactional",
      status: "Approved" as const,
    },
    {
      id: 4,
      name: "Shipping Notification",
      content:
        "Good news, [Name]! Your order #[OrderID] has been shipped and is on its way. You can track your package using this link: [TrackingLink]",
      category: "Transactional",
      status: "Approved" as const,
    },
    {
      id: 5,
      name: "Promotional Offer",
      content:
        "Special offer for our valued customers! Get 15% off your next purchase with code PROMO15. Valid until [Date].",
      category: "Marketing",
      status: "Pending" as const,
    },
    {
      id: 6,
      name: "Feedback Request",
      content:
        "Hello [Name], thank you for your recent purchase. We'd love to hear your feedback. Please take a moment to complete this short survey: [SurveyLink]",
      category: "Customer Service",
      status: "Pending" as const,
    },
    {
      id: 7,
      name: "Abandoned Cart",
      content:
        "Hello [Name], we noticed you left some items in your cart. Complete your purchase now and get free shipping with code FREESHIP.",
      category: "Marketing",
      status: "Rejected" as const,
    },
  ]

  // Filter templates based on search query and active tab
  const filteredTemplates = templates
    .filter(
      (template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((template) => {
      if (activeTab === "all") return true
      return template.status.toLowerCase() === activeTab.toLowerCase()
    })

  return (
    <PageContainer>
      <PageSection>
        <PageHeader heading="Message Templates" description="Create and manage your WhatsApp message templates.">
          <Link href="/dashboard/templates/new">
            <Button className="gap-1 shadow-sm transition-all hover:shadow-md">
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </Link>
        </PageHeader>
      </PageSection>

      <PageSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border bg-card shadow-sm"
        >
          <div className="p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Link href="/dashboard/templates/new">
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Template
                  </Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="space-y-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template, index) => (
                    <TemplateCard
                      key={template.id}
                      name={template.name}
                      content={template.content}
                      category={template.category}
                      status={template.status}
                      onCopyClick={() => {
                        navigator.clipboard.writeText(template.content)
                        alert("Template copied to clipboard!")
                      }}
                      onEditClick={() => {
                        // In a real app, this would navigate to the template edit page
                        console.log(`Editing template: ${template.name}`)
                      }}
                      onDeleteClick={() => {
                        // In a real app, this would show a confirmation dialog
                        console.log(`Deleting template: ${template.name}`)
                      }}
                      delay={index * 0.05}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={<FileText className="h-10 w-10" />}
                    title="No templates found"
                    description="Try adjusting your search or filters"
                    action={{
                      label: "Create Template",
                      onClick: () => {
                        // In a real app, this would navigate to the new template page
                        console.log("Creating new template")
                      },
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </PageSection>
    </PageContainer>
  )
}
