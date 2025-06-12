"use client"

import { useState } from "react"
import { Download, BarChart2, MessageSquare, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const messageData = [
    { name: "Mon", sent: 120, delivered: 118, read: 95 },
    { name: "Tue", sent: 150, delivered: 145, read: 120 },
    { name: "Wed", sent: 180, delivered: 178, read: 150 },
    { name: "Thu", sent: 220, delivered: 215, read: 180 },
    { name: "Fri", sent: 300, delivered: 295, read: 250 },
    { name: "Sat", sent: 250, delivered: 245, read: 200 },
    { name: "Sun", sent: 280, delivered: 275, read: 230 },
  ]

  const responseRateData = [
    { name: "Mon", rate: 60 },
    { name: "Tue", rate: 62 },
    { name: "Wed", rate: 64 },
    { name: "Thu", rate: 65 },
    { name: "Fri", rate: 67 },
    { name: "Sat", rate: 68 },
    { name: "Sun", rate: 68 },
  ]

  const messageStatusData = [
    { name: "Delivered", value: 85 },
    { name: "Read", value: 10 },
    { name: "Failed", value: 5 },
  ]

  const campaignPerformanceData = [
    { name: "Weekend Sale", sent: 120, delivered: 118, read: 95, responded: 45 },
    { name: "Appointment Reminders", sent: 45, delivered: 44, read: 40, responded: 30 },
    { name: "Customer Feedback", sent: 200, delivered: 195, read: 150, responded: 80 },
    { name: "New Product Launch", sent: 350, delivered: 340, read: 280, responded: 120 },
    { name: "Birthday Greetings", sent: 78, delivered: 76, read: 70, responded: 50 },
  ]

  const COLORS = ["#25D366", "#34B7F1", "#FF4136", "#AAAAAA"]

  return (
    <PageContainer>
      <PageSection>
        <PageHeader
          heading="Analytics"
          description="Track and analyze your WhatsApp messaging performance."
        >
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </PageHeader>
      </PageSection>

      <PageSection>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="mt-1 flex items-center text-xs text-emerald-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98.2%</div>
                    <div className="mt-1 flex items-center text-xs text-emerald-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>+1.5% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82.5%</div>
                    <div className="mt-1 flex items-center text-xs text-emerald-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>+3.2% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <BarChart2 className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <div className="mt-1 flex items-center text-xs text-emerald-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>+4% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-4 text-lg font-medium">Message Activity</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={messageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sent" stroke="#25D366" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="delivered" stroke="#34B7F1" strokeWidth={2} />
                      <Line type="monotone" dataKey="read" stroke="#128C7E" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-4 text-lg font-medium">Message Status</h3>
                <div className="flex h-[300px] items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                          <Pie
                            data={messageStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {messageStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--background)",
                              borderColor: "var(--border)",
                              borderRadius: "var(--radius)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      {messageStatusData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm">{entry.name}</span>
                            <span className="text-sm font-medium">{entry.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-medium">Campaign Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sent" fill="#25D366" />
                    <Bar dataKey="delivered" fill="#34B7F1" />
                    <Bar dataKey="read" fill="#128C7E" />
                    <Bar dataKey="responded" fill="#075E54" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className\
