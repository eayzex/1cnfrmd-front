import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ArrowUpRight, MoreHorizontal, Upload, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function ContactsPage() {
  // Sample contact data
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      email: "john.doe@example.com",
      status: "Active",
      tags: ["Customer", "VIP"],
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1987654321",
      email: "jane.smith@example.com",
      status: "Active",
      tags: ["Customer"],
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Robert Johnson",
      phone: "+1122334455",
      email: "robert.johnson@example.com",
      status: "Inactive",
      tags: ["Lead"],
      lastContact: "1 month ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      phone: "+1555666777",
      email: "sarah.williams@example.com",
      status: "Active",
      tags: ["Customer", "New"],
      lastContact: "Yesterday",
    },
    {
      id: 5,
      name: "Michael Brown",
      phone: "+1999888777",
      email: "michael.brown@example.com",
      status: "Active",
      tags: ["Customer"],
      lastContact: "3 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">Manage your WhatsApp contacts and recipients.</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <MoreHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                <span>Import Contacts</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Export Contacts</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/dashboard/contacts/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Contact</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Contacts</CardTitle>
              <CardDescription>View and manage your WhatsApp contacts</CardDescription>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search contacts..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] lg:grid-cols-[1fr_1fr_1fr_auto_auto] xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <div className="hidden border-b p-3 font-medium md:block">Name</div>
              <div className="hidden border-b p-3 font-medium md:block">Contact Info</div>
              <div className="hidden border-b p-3 font-medium lg:block">Tags</div>
              <div className="hidden border-b p-3 font-medium xl:block">Last Contact</div>
              <div className="hidden border-b p-3 font-medium md:block">Actions</div>

              {contacts.map((contact) => (
                <React.Fragment key={contact.id}>
                  {/* Mobile view (card-like) */}
                  <div className="col-span-full border-b p-4 md:hidden">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Last contact: {contact.lastContact}</p>
                  </div>

                  {/* Desktop view (table-like) */}
                  <div className="hidden border-b p-4 md:block">{contact.name}</div>
                  <div className="hidden border-b p-4 md:block">
                    <div>{contact.phone}</div>
                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                  </div>
                  <div className="hidden border-b p-4 lg:block">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="hidden border-b p-4 xl:block">{contact.lastContact}</div>
                  <div className="hidden border-b p-4 md:block">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
