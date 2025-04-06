"use client"

import { useEffect, useState } from "react"

export interface Email {
  title: string
  body: string
  classification: string
  from: string
  subject: string
  timestamp: string
  to: string
}

export function useLiveMail() {
  const [emails, setEmails] = useState<Email[]>([])
  const [lastCount, setLastCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/")
        const data = await res.json()

        const count = data[0].num
        const newEmails = data.slice(1)

        if (count > lastCount) {
          const diff = count - lastCount
          const added = newEmails.slice(-diff)
          setEmails((prev) => [...prev, ...added])
          setLastCount(count)
        }
      } catch (err) {
        console.error("Error fetching mail:", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [lastCount])

  return emails
}