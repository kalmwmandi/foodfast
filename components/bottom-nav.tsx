"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Receipt, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/search", label: "Cari", icon: Search },
  { href: "/orders", label: "Pesanan", icon: Receipt },
  { href: "/profile", label: "Profil", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
