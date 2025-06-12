"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ChatPreview } from "@/components/ui/chat-preview"
import { EmptyState } from "@/components/ui/empty-state"
import { motion } from "framer-motion"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample message data
  const messages = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      message: "Your appointment is confirmed for tomorrow at 2 PM. Reply YES to confirm or NO to reschedule.",
      time: "10:30 AM",
      status: "delivered",
      unreadCount: 0,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1987654321",
      message: "Thank you for your purchase! Your order #12345 has been shipped and will arrive in 2-3 business days.",
      time: "Yesterday",
      status: "read",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Robert Johnson",
      phone: "+1122334455",
      message: "Happy Birthday! As a valued customer, enjoy 20% off your next purchase with code BIRTHDAY20.",
      time: "Yesterday",
      status: "delivered",
      unreadCount: 2,
    },
    {
      id: 4,
      name: "Sarah Williams",
      phone: "+1555666777",
      message: "Your appointment is scheduled for next Monday at 11 AM. Would you like a reminder the day before?",
      time: "May 17",
      status: "sent",
      unreadCount: 0,
    },
    {
      id: 5,
      name: "Michael Brown",
      phone: "+1999888777",
      message: "We miss you! It's been a while since your last visit. Book an appointment this week and get 15% off.",
      time: "May 16",
      status: "delivered",
      unreadCount: 1,
    },
    {
      id: 6,
      name: "Emily Davis",
      phone: "+1777888999",
      message: "Your membership is expiring in 7 days. Renew now to continue enjoying your benefits.",
      time: "May 15",
      status: "read",
      unreadCount: 0,
    },
    {
      id: 7,
      name: "David Wilson",
      phone: "+1444555666",
      message: "Thank you for your feedback! We're constantly working to improve our services.",
      time: "May 14",
      status: "read",
      unreadCount: 0,
    },
  ]

  // Filter messages based on search query and active tab
  const filteredMessages = messages
    .filter(
      (message) =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.phone.includes(searchQuery) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((message) => {
      if (activeTab === "all") return true
      if (activeTab === "unread") return message.unreadCount > 0
      return message.status === activeTab
    })

  return (
    <PageContainer>
      <PageSection>
        <PageHeader heading="Messages" description="Manage and send WhatsApp messages to your contacts.">
          <Link href="/dashboard/messages/new">
            <Button className="gap-1 shadow-sm transition-all hover:shadow-md">
              <Plus className="h-4 w-4" />
              New Message
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
                  placeholder="Search messages..."
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
                <Link href="/dashboard/messages/new">
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    New Message
                  </Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Messages</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="space-y-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message, index) => (
                    <ChatPreview
                      key={message.id}
                      name={message.name}
                      message={message.message}
                      time={message.time}
                      unreadCount={message.unreadCount}
                      status={message.status as any}
                      onClick={() => {
                        // In a real app, this would navigate to the chat
                        console.log(`Navigating to chat with ${message.name}`)
                      }}
                      delay={index * 0.05}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={<MessageSquare className="h-10 w-10" />}
                    title="No messages found"
                    description="Try adjusting your search or filters"
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
