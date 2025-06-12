"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [apiSettings, setApiSettings] = useState({
    apiKey: "••••••••••••••••••••••",
    phoneNumberId: "1234567890",
    businessAccountId: "9876543210",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    messageDelivery: true,
    messageFailure: true,
    customerResponses: true,
  })

  const [profileSettings, setProfileSettings] = useState({
    businessName: "Acme Inc.",
    email: "contact@acmeinc.com",
    phone: "+1234567890",
    address: "123 Business St, Suite 101\nNew York, NY 10001",
    website: "https://acmeinc.com",
  })

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setApiSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveApiSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("API settings saved successfully!")
    } catch (err) {
      setError("An error occurred while saving API settings.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotificationSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Notification settings saved successfully!")
    } catch (err) {
      setError("An error occurred while saving notification settings.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfileSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Profile settings saved successfully!")
    } catch (err) {
      setError("An error occurred while saving profile settings.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveApiSettings}>
              <CardHeader>
                <CardTitle>1Confirmed API Settings</CardTitle>
                <CardDescription>Configure your WhatsApp Business API credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    value={apiSettings.apiKey}
                    onChange={handleApiChange}
                    type="password"
                  />
                  <p className="text-xs text-muted-foreground">Your 1Confirmed API key for authentication</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                  <Input
                    id="phoneNumberId"
                    name="phoneNumberId"
                    value={apiSettings.phoneNumberId}
                    onChange={handleApiChange}
                  />
                  <p className="text-xs text-muted-foreground">The ID of your WhatsApp Business phone number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAccountId">Business Account ID</Label>
                  <Input
                    id="businessAccountId"
                    name="businessAccountId"
                    value={apiSettings.businessAccountId}
                    onChange={handleApiChange}
                  />
                  <p className="text-xs text-muted-foreground">Your WhatsApp Business Account ID</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save API Settings"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveNotificationSettings}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messageDelivery">Message Delivery</Label>
                      <p className="text-sm text-muted-foreground">Get notified when messages are delivered</p>
                    </div>
                    <Switch
                      id="messageDelivery"
                      checked={notificationSettings.messageDelivery}
                      onCheckedChange={(checked) => handleNotificationChange("messageDelivery", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messageFailure">Message Failures</Label>
                      <p className="text-sm text-muted-foreground">Get notified when messages fail to send</p>
                    </div>
                    <Switch
                      id="messageFailure"
                      checked={notificationSettings.messageFailure}
                      onCheckedChange={(checked) => handleNotificationChange("messageFailure", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="customerResponses">Customer Responses</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when customers respond to your messages
                      </p>
                    </div>
                    <Switch
                      id="customerResponses"
                      checked={notificationSettings.customerResponses}
                      onCheckedChange={(checked) => handleNotificationChange("customerResponses", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveProfileSettings}>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Update your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={profileSettings.businessName}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={profileSettings.phone} onChange={handleProfileChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={profileSettings.address}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={profileSettings.website} onChange={handleProfileChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
