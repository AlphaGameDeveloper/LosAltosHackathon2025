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

  React.useEffect(() => {
    const fetchEmails = async () => {
      try {
        console.log(`[📤] Sending request to http://127.0.0.1:5000/`)
        const res = await fetch("http://127.0.0.1:5000/")
        const data = await res.json()
        console.log(`[📥] Received response:`, data)

        const count = data[0].num
        const newEmails: EmailAPI[] = data.slice(1)

        if (count > lastCount) {
          const diff = count - lastCount
          const added = newEmails.slice(-diff).map((e, i) => ({
            id: String(emails.length + i),
            name: e.from,
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
              <MailList items={emails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={emails.filter((item) => !item.read)} />
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