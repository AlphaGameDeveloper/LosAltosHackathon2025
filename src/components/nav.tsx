"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className={`group flex flex-col gap-4 py-2 ${isCollapsed ? "py-2" : ""}`}
    >
      <nav
        className={`grid gap-1 px-2 ${
          isCollapsed ? "justify-center px-2" : ""
        }`}
      >
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={`${buttonVariants({
                    variant: link.variant,
                    size: "icon",
                  })} h-9 w-9 ${
                    link.variant === "default"
                      ? "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      : ""
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={`${buttonVariants({
                variant: link.variant,
                size: "sm",
              })} justify-start ${
                link.variant === "default"
                  ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                  : ""
              }`}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={`ml-auto ${
                    link.variant === "default"
                      ? "text-background dark:text-white"
                      : ""
                  }`}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}