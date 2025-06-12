"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare, Users, Calendar, BarChart3, ArrowUpRight, Plus, Bell, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { AnalyticsCard } from "@/components/ui/analytics-card"
import { WhatsAppMessage } from "@/components/ui/whatsapp-message"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user info from localStorage
    const currentUser = localStorage.getItem("current-user")
    if (currentUser) {
      const { email } = JSON.parse(currentUser)
      // Extract name from email (before @)
      const name = email.split("@")[0]
      setUserName(name.charAt(0).toUpperCase() + name.slice(1))
    }
  }, [])

  // Sample data for analytics charts
  const messageData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 150 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 220 },
    { name: "Fri", value: 300 },
    { name: "Sat", value: 250 },
    { name: "Sun", value: 280 },
  ]

  const contactData = [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 25 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 35 },
    { name: "Fri", value: 40 },
    { name: "Sat", value: 42 },
    { name: "Sun", value: 45 },
  ]

  const campaignData = [
    { name: "Mon", value: 2 },
    { name: "Tue", value: 3 },
    { name: "Wed", value: 4 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 6 },
    { name: "Sat", value: 7 },
    { name: "Sun", value: 8 },
  ]

  const responseData = [
    { name: "Mon", value: 60 },
    { name: "Tue", value: 62 },
    { name: "Wed", value: 64 },
    { name: "Thu", value: 65 },
    { name: "Fri", value: 67 },
    { name: "Sat", value: 68 },
    { name: "Sun", value: 68 },
  ]

  return (
    <PageContainer>
      <PageSection>
        <PageHeader
          heading={`Welcome back, ${userName || "User"}`}
          description="Here's what's happening with your WhatsApp Business Platform today."
        >
          <Link href="/dashboard/messages/new">
            <Button className="gap-1 shadow-sm transition-all hover:shadow-md">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </Link>
        </PageHeader>
      </PageSection>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Messages"
            value="1,248"
            icon={<MessageSquare className="h-4 w-4" />}
            change={{ value: "+12% from last month", trend: "up" }}
            data={messageData}
            delay={0.1}
          />
          <AnalyticsCard
            title="Active Contacts"
            value="342"
            icon={<Users className="h-4 w-4" />}
            change={{ value: "+5% from last month", trend: "up" }}
            data={contactData}
            delay={0.2}
          />
          <AnalyticsCard
            title="Active Campaigns"
            value="8"
            icon={<Calendar className="h-4 w-4" />}
            change={{ value: "+2 from last month", trend: "up" }}
            data={campaignData}
            delay={0.3}
          />
          <AnalyticsCard
            title="Response Rate"
            value="68%"
            icon={<BarChart3 className="h-4 w-4" />}
            change={{ value: "+4% from last month", trend: "up" }}
            data={responseData}
            delay={0.4}
          />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border bg-card shadow-sm"
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-medium">Recent Conversations</h3>
                <Link href="/dashboard/messages">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-1 px-6 pb-6">
                <div className="rounded-lg border bg-background p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium">John Doe</h4>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <div className="space-y-2">
                    <WhatsAppMessage
                      content="Hello! I'd like to reschedule my appointment for next week."
                      timestamp="10:30 AM"
                      type="incoming"
                      delay={0.1}
                    />
                    <WhatsAppMessage
                      content="Of course! I can help you reschedule. What day works best for you next week?"
                      timestamp="10:32 AM"
                      type="outgoing"
                      status="read"
                      delay={0.2}
                    />
                    <WhatsAppMessage
                      content="Would Tuesday at 2 PM work?"
                      timestamp="10:35 AM"
                      type="incoming"
                      delay={0.3}
                    />
                    <WhatsAppMessage
                      content="Yes, Tuesday at 2 PM is available. I've rescheduled your appointment. You'll receive a confirmation shortly."
                      timestamp="10:36 AM"
                      type="outgoing"
                      status="read"
                      delay={0.4}
                    />
                    <WhatsAppMessage content="Thank you so much!" timestamp="10:37 AM" type="incoming" delay={0.5} />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border bg-card shadow-sm"
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-medium">Campaign Performance</h3>
                <Link href="/dashboard/campaigns">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                {[
                  {
                    name: "Weekend Sale",
                    deliveryRate: 98,
                    openRate: 72,
                    responseRate: 45,
                    recipients: 120,
                  },
                  {
                    name: "Appointment Reminders",
                    deliveryRate: 99,
                    openRate: 85,
                    responseRate: 60,
                    recipients: 45,
                  },
                ].map((campaign, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                        {campaign.recipients} recipients
                      </div>
                    </div>
                    <div className="mb-2 grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-sm font-medium">{campaign.deliveryRate}%</div>
                        <div className="text-xs text-muted-foreground">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{campaign.openRate}%</div>
                        <div className="text-xs text-muted-foreground">Opened</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{campaign.responseRate}%</div>
                        <div className="text-xs text-muted-foreground">Responded</div>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary transition-all" style={{ width: `${campaign.openRate}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl border bg-card shadow-sm"
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-medium">Upcoming Campaigns</h3>
                <Link href="/dashboard/campaigns">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4 px-6 pb-6">
                {[
                  {
                    name: "Weekend Sale",
                    time: "Tomorrow",
                    desc: "Promotional message to 120 contacts",
                    icon: Bell,
                  },
                  {
                    name: "Appointment Reminders",
                    time: "Daily",
                    desc: "Automated reminders for upcoming appointments",
                    icon: Calendar,
                  },
                  {
                    name: "Customer Feedback",
                    time: "Next Week",
                    desc: "Follow-up survey to recent customers",
                    icon: CheckCircle,
                  },
                ].map((campaign, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="rounded-lg border p-4 transition-all hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <campaign.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{campaign.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {campaign.time}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{campaign.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-medium">Message Delivery</h3>
              <div className="flex items-center justify-center">
                <ProgressCircle value={92} variant="success" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium">92% Success Rate</p>
                <p className="text-xs text-muted-foreground">1,148 of 1,248 messages delivered</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Active Team</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <AvatarGroup
                  items={[
                    { name: "John Doe" },
                    { name: "Jane Smith" },
                    { name: "Robert Johnson" },
                    { name: "Sarah Williams" },
                    { name: "Michael Brown" },
                    { name: "Emily Davis" },
                  ]}
                  max={5}
                />
                <p className="mt-2 text-sm text-muted-foreground">6 team members active today</p>
              </div>
            </motion.div>
          </div>
        </div>
      </PageSection>
    </PageContainer>
  )
}
