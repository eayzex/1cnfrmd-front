"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { CampaignCard } from "@/components/ui/campaign-card"
import { EmptyState } from "@/components/ui/empty-state"
import { motion } from "framer-motion"

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample campaign data
  const campaigns = [
    {
      id: 1,
      name: "Weekend Sale",
      status: "Scheduled" as const,
      type: "Promotional",
      recipients: 120,
      schedule: "May 25, 2025 - 9:00 AM",
      description: "Special weekend sale promotion with 20% discount on all products.",
    },
    {
      id: 2,
      name: "Appointment Reminders",
      status: "Active" as const,
      type: "Automated",
      recipients: 45,
      schedule: "Daily - 8:00 AM",
      description: "Automated reminders sent 24 hours before scheduled appointments.",
    },
    {
      id: 3,
      name: "Customer Feedback",
      status: "Scheduled" as const,
      type: "Survey",
      recipients: 200,
      schedule: "May 30, 2025 - 10:00 AM",
      description: "Post-purchase survey to collect customer feedback and satisfaction ratings.",
    },
    {
      id: 4,
      name: "New Product Launch",
      status: "Draft" as const,
      type: "Promotional",
      recipients: 350,
      schedule: "Not scheduled",
      description: "Announcement for our upcoming product launch with special early-bird pricing.",
    },
    {
      id: 5,
      name: "Birthday Greetings",
      status: "Active" as const,
      type: "Automated",
      recipients: 78,
      schedule: "Daily - 9:00 AM",
      description: "Automated birthday greetings with special discount offers for customers.",
    },
    {
      id: 6,
      name: "Service Follow-up",
      status: "Completed" as const,
      type: "Automated",
      recipients: 156,
      schedule: "Completed on May 15, 2025",
      description: "Follow-up messages sent to customers after receiving services.",
    },
    {
      id: 7,
      name: "Holiday Special",
      status: "Draft" as const,
      type: "Promotional",
      recipients: 500,
      schedule: "Not scheduled",
      description: "Special holiday promotion with exclusive offers for loyal customers.",
    },
  ]

  // Filter campaigns based on search query and active tab
  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((campaign) => {
      if (activeTab === "all") return true
      return campaign.status.toLowerCase() === activeTab.toLowerCase()
    })

  return (
    <PageContainer>
      <PageSection>
        <PageHeader heading="Campaigns" description="Create and manage your WhatsApp messaging campaigns.">
          <Link href="/dashboard/campaigns/new">
            <Button className="gap-1 shadow-sm transition-all hover:shadow-md">
              <Plus className="h-4 w-4" />
              New Campaign
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
                  placeholder="Search campaigns..."
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
                <Link href="/dashboard/campaigns/new">
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Campaign
                  </Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Campaigns</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="space-y-4">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign, index) => (
                    <CampaignCard
                      key={campaign.id}
                      name={campaign.name}
                      status={campaign.status}
                      type={campaign.type}
                      recipients={campaign.recipients}
                      schedule={campaign.schedule}
                      description={campaign.description}
                      onViewClick={() => {
                        // In a real app, this would navigate to the campaign details
                        console.log(`Viewing campaign: ${campaign.name}`)
                      }}
                      onEditClick={() => {
                        // In a real app, this would navigate to the campaign edit page
                        console.log(`Editing campaign: ${campaign.name}`)
                      }}
                      delay={index * 0.05}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={<Calendar className="h-10 w-10" />}
                    title="No campaigns found"
                    description="Try adjusting your search or filters"
                    action={{
                      label: "Create Campaign",
                      onClick: () => {
                        // In a real app, this would navigate to the new campaign page
                        console.log("Creating new campaign")
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
