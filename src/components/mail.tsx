"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AccountSwitcher } from "@/components/account-switcher"
import { MailDisplay } from "@/components/mail-display"
import { MailList } from "@/components/mail-list"
import { MailLoadingAnimation } from "@/components/ui/mail-loading-animation"
import { useMail } from "../app/use-mail"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  defaultLayout: number[] | undefined
}

interface EmailAPI {
  title: string
  body: string
  classification: string
  from: string
  subject: string
  timestamp: string
  to: string
}

interface MailItem {
  id: string
  name: string
  email: string
  subject: string
  date: string
  text: string
  read: boolean
  labels: string[]
}

export function Mail({
  accounts,
  defaultLayout = [265, 440, 655],
}: MailProps) {
  const [mail, setMail] = useMail()
  const [emails, setEmails] = React.useState<MailItem[]>([])
  const [lastCount, setLastCount] = React.useState(0)
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true)
      try {
        var data; // Declare data variable here for scoping :3
        const endpoint = "https://spam-assassin.boisvert.org:3000/?fromLogin=1"
        console.log(`[📤] Sending request to ${endpoint}`)
        const params = new URLSearchParams(window.location.search);
        console.log(`[🔍] Search params:`, params)
        if (params.has("animtest")) {
          return;
        }
        if (!params.has("panic")) {
          console.log(`[✅] Panic mode is disabled, fetching data from ${endpoint}`)
          const res = await fetch(endpoint)
          data = await res.json()
          // dummy data
          if (!res.ok) {
            throw new Error("Network response was not ok")
          }
        } else {
          console.warn(`[⚠️] Panic mode is enabled, using dummy data`)
          data = [
            { num: 5 }, // First item with total count
            { 
              title: "Welcome Email",
              body: "Thank you for signing up! We're excited to have you on board.",
              classification: "not-spam",
              from: "welcome@company.com",
              subject: "Welcome to Our Platform",
              timestamp: "2023-11-10T09:30:00Z",
              to: "user@example.com"
            },
            { 
              title: "Special Offer",
              body: "LIMITED TIME OFFER: Get 50% off all products this weekend only! Click here to claim your discount now before it expires!",
              classification: "spam",
              from: "marketing@deals.com",
              subject: "URGENT: Your Special Discount Inside",
              timestamp: "2023-11-09T14:22:00Z",
              to: "user@example.com"
            },
            { 
              title: "Meeting Reminder",
              body: "This is a reminder that we have a team meeting tomorrow at 10:00 AM in Conference Room A. Please bring your project updates.",
              classification: "not-spam",
              from: "manager@company.com",
              subject: "Tomorrow's Team Meeting",
              timestamp: "2023-11-08T16:45:00Z",
              to: "user@example.com"
            },
            { 
              title: "Account Verification",
              body: "Please verify your account by clicking the link below. Your account will be locked if you don't verify within 24 hours.",
              classification: "not-spam",
              from: "security@service.com",
              subject: "Action Required: Verify Your Account",
              timestamp: "2023-11-10T07:15:00Z",
              to: "user@example.com"
            },
            { 
              title: "Prize Winner",
              body: "Congratulations! You have won $1,000,000 in our lottery. Send your bank details to claim now!",
              classification: "spam",
              from: "lottery@winners.com",
              subject: "YOU WON! $1,000,000 Prize Awaits",
              timestamp: "2023-11-07T23:10:00Z",
              to: "user@example.com"
            }
          ]
        }
        console.log(`[📥] Received response:`, data)

        const count = data[0].num
        const newEmails: EmailAPI[] = data.slice(1)

        if (count > lastCount) {
          const diff = count - lastCount;
          const added = newEmails.slice(-diff).map((e, i) => ({
            id: String(emails.length + i),
            name: e.from,
            email: e.from,
            subject: e.subject,
            date: new Date().toISOString(),
            text: e.body,
            read: false,
            labels: [e.classification],
          }))
          setEmails(prev => [...prev, ...added])
          setLastCount(count)
        }
      } catch (err) {
        console.error("[❌] Error fetching mail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmails()
    const interval = setInterval(fetchEmails, 5000)
    return () => clearInterval(interval)
  }, [lastCount, emails.length])

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <div className="px-2">
                <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
              </div>
              <TabsList className="ml-auto">
                <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                  All mail
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              {loading && emails.length === 0 ? (
                <MailLoadingAnimation message="Checking your inbox..." />
              ) : (
                <MailList items={emails} />
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {loading && emails.filter((item) => !item.read).length === 0 ? (
                <MailLoadingAnimation message="Checking unread messages..." />
              ) : (
                <MailList items={emails.filter((item) => !item.read)} />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay mail={emails.find((item) => item.id === mail.selected) || null} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}