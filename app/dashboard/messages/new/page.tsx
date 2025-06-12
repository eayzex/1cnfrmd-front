"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, ChevronLeft, Phone, User, Calendar, Clock, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer, PageSection } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContactCard } from "@/components/ui/contact-card"
import { WhatsAppMessage } from "@/components/ui/whatsapp-message"

type Contact = {
  id: number
  name: string
  phone: string
  email?: string
  tags?: string[]
}

export default function NewMessagePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    recipient: "",
    phone: "",
    message: "",
    template: "custom",
    scheduleForLater: false,
    scheduleDate: "",
    scheduleTime: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // In a real app, this would be fetched from an API
    setContacts([
      { id: 1, name: "John Doe", phone: "+1234567890", email: "john@example.com", tags: ["Customer", "VIP"] },
      { id: 2, name: "Jane Smith", phone: "+1987654321", email: "jane@example.com", tags: ["Customer"] },
      { id: 3, name: "Robert Johnson", phone: "+1122334455", email: "robert@example.com", tags: ["Lead"] },
      { id: 4, name: "Sarah Williams", phone: "+1555666777", email: "sarah@example.com", tags: ["Customer", "New"] },
      { id: 5, name: "Michael Brown", phone: "+1999888777", email: "michael@example.com", tags: ["Customer"] },
      { id: 6, name: "Emily Davis", phone: "+1777888999", email: "emily@example.com", tags: ["Lead", "VIP"] },
      { id: 7, name: "David Wilson", phone: "+1444555666", email: "david@example.com", tags: ["Customer"] },
    ])
  }, [])

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Set template message if a predefined template is selected
    if (name === "template" && value !== "custom") {
      let templateMessage = ""

      if (value === "appointment") {
        templateMessage =
          "Hello [Name], this is a reminder about your appointment scheduled for [Date] at [Time]. Please reply YES to confirm or NO to reschedule."
      } else if (value === "birthday") {
        templateMessage =
          "Happy Birthday, [Name]! As a valued customer, enjoy 20% off your next purchase with code BIRTHDAY20."
      } else if (value === "promotion") {
        templateMessage =
          "Special offer for our valued customers! Get 15% off your next purchase with code PROMO15. Valid until [Date]."
      }

      setFormData((prev) => ({ ...prev, message: templateMessage }))
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setFormData((prev) => ({
      ...prev,
      recipient: contact.name,
      phone: contact.phone,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, scheduleForLater: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!formData.recipient || !formData.phone || !formData.message) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number")
      setIsLoading(false)
      return
    }

    try {
      // In a real application, this would be an API call to send the message
      // For demo purposes, we'll simulate a successful message send
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store the message in localStorage for demo purposes
      const messages = JSON.parse(localStorage.getItem("sent-messages") || "[]")
      messages.push({
        id: Date.now(),
        recipient: formData.recipient,
        phone: formData.phone,
        content: formData.message,
        status: "Delivered",
        timestamp: new Date().toISOString(),
        scheduled: formData.scheduleForLater,
        scheduleDate: formData.scheduleDate,
        scheduleTime: formData.scheduleTime,
      })
      localStorage.setItem("sent-messages", JSON.stringify(messages))

      setSuccess(true)

      // Redirect to messages page after a short delay
      setTimeout(() => {
        router.push("/dashboard/messages")
      }, 2000)
    } catch (err) {
      setError("An error occurred while sending the message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  // Replace placeholders in the message with actual values
  const getPreviewMessage = () => {
    let previewMessage = formData.message
    if (selectedContact) {
      previewMessage = previewMessage.replace(/\[Name\]/g, selectedContact.name)
    }
    previewMessage = previewMessage.replace(/\[Date\]/g, new Date().toLocaleDateString())
    previewMessage = previewMessage.replace(
      /\[Time\]/g,
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    )
    return previewMessage
  }

  return (
    <PageContainer>
      <PageSection>
        <PageHeader heading="New Message" separator>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/messages">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        </PageHeader>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl border bg-card shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  <div className="mb-6 space-y-4">
                    <h2 className="text-lg font-medium">Compose Message</h2>
                    <p className="text-sm text-muted-foreground">
                      Send a WhatsApp message to your contacts or customers
                    </p>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription>Message sent successfully! Redirecting...</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Recipient</Label>
                        <Tabs defaultValue="search" className="w-full">
                          <TabsList className="mb-4 w-full">
                            <TabsTrigger value="search" className="flex-1">
                              Search Contacts
                            </TabsTrigger>
                            <TabsTrigger value="manual" className="flex-1">
                              Enter Manually
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="search" className="space-y-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                              />
                            </div>
                            <div className="grid max-h-[300px] grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
                              {filteredContacts.length > 0 ? (
                                filteredContacts.map((contact, index) => (
                                  <ContactCard
                                    key={contact.id}
                                    name={contact.name}
                                    phone={contact.phone}
                                    email={contact.email}
                                    tags={contact.tags}
                                    isSelected={selectedContact?.id === contact.id}
                                    onClick={() => handleContactSelect(contact)}
                                    onMessageClick={() => handleContactSelect(contact)}
                                    delay={index * 0.05}
                                  />
                                ))
                              ) : (
                                <div className="col-span-full flex h-20 items-center justify-center rounded-lg border border-dashed">
                                  <p className="text-sm text-muted-foreground">No contacts found</p>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end">
                              <Button type="button" variant="outline" size="sm" className="gap-1">
                                <Plus className="h-4 w-4" />
                                Add New Contact
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="manual" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="recipient">Recipient Name</Label>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id="recipient"
                                    name="recipient"
                                    placeholder="John Doe"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    className="pl-9"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="+1234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-9"
                                    required
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground">Include country code (e.g., +1 for US)</p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template">Message Template</Label>
                        <Select
                          value={formData.template}
                          onValueChange={(value) => handleSelectChange("template", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom Message</SelectItem>
                            <SelectItem value="appointment">Appointment Reminder</SelectItem>
                            <SelectItem value="birthday">Birthday Greeting</SelectItem>
                            <SelectItem value="promotion">Promotional Offer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="message">Message Content</Label>
                          <Button type="button" variant="outline" size="sm" onClick={togglePreview} className="text-xs">
                            {previewMode ? "Edit Message" : "Preview Message"}
                          </Button>
                        </div>
                        {previewMode ? (
                          <div className="rounded-lg border bg-muted/30 p-4">
                            <WhatsAppMessage
                              content={getPreviewMessage()}
                              timestamp={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              type="outgoing"
                              status="sent"
                            />
                          </div>
                        ) : (
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Type your message here..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="resize-none"
                            required
                          />
                        )}
                        <p className="text-xs text-muted-foreground">
                          Replace placeholders like [Name], [Date], [Time] with actual values before sending.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="schedule"
                            checked={formData.scheduleForLater}
                            onCheckedChange={handleSwitchChange}
                          />
                          <Label htmlFor="schedule">Schedule for later</Label>
                        </div>

                        {formData.scheduleForLater && (
                          <motion.div
                            className="grid gap-4 rounded-lg border bg-muted/50 p-4 md:grid-cols-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="space-y-2">
                              <Label htmlFor="scheduleDate">Date</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="scheduleDate"
                                  name="scheduleDate"
                                  type="date"
                                  value={formData.scheduleDate}
                                  onChange={handleChange}
                                  className="pl-9"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="scheduleTime">Time</Label>
                              <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="scheduleTime"
                                  name="scheduleTime"
                                  type="time"
                                  value={formData.scheduleTime}
                                  onChange={handleChange}
                                  className="pl-9"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 border-t bg-muted/50 p-6">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/dashboard/messages">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || success}
                    className="gap-2 shadow-sm transition-all hover:shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M22 2L11 13" />
                          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Message Tips</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <h4 className="mb-2 font-medium">Personalization</h4>
                  <p className="text-sm text-muted-foreground">
                    Use placeholders like [Name] to personalize your messages. Personalized messages have 40% higher
                    response rates.
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <h4 className="mb-2 font-medium">Keep it Concise</h4>
                  <p className="text-sm text-muted-foreground">
                    Messages under 160 characters have the highest read and response rates. Be clear and to the point.
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <h4 className="mb-2 font-medium">Include a Call to Action</h4>
                  <p className="text-sm text-muted-foreground">
                    Always include a clear call to action like "Reply YES to confirm" or "Click the link to learn more".
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <h4 className="mb-2 font-medium">Best Sending Times</h4>
                  <p className="text-sm text-muted-foreground">
                    Messages sent between 10 AM - 12 PM and 5 PM - 7 PM typically have the highest open rates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </PageSection>
    </PageContainer>
  )
}
