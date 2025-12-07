"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, CreditCard, Bell, HelpCircle, Shield, LogOut, ChevronRight, Heart, Gift } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore } from "@/lib/store"

const menuItems = [
  {
    icon: User,
    label: "Edit Profil",
    href: "/profile/edit",
  },
  {
    icon: MapPin,
    label: "Alamat Tersimpan",
    href: "/profile/addresses",
  },
  {
    icon: CreditCard,
    label: "Metode Pembayaran",
    href: "/profile/payment",
  },
  {
    icon: Heart,
    label: "Favorit",
    href: "/profile/favorites",
  },
  {
    icon: Gift,
    label: "Promo & Voucher",
    href: "/profile/promos",
  },
]

const settingsItems = [
  {
    icon: Bell,
    label: "Notifikasi",
    href: "/settings/notifications",
  },
  {
    icon: Shield,
    label: "Keamanan",
    href: "/settings/security",
  },
  {
    icon: HelpCircle,
    label: "Bantuan",
    href: "/help",
  },
]

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAppStore()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Belum Masuk</h2>
          <p className="text-muted-foreground mb-6">Masuk untuk mengakses profil dan pesananmu</p>
          <Link href="/login">
            <Button className="bg-primary text-primary-foreground">Masuk / Daftar</Button>
          </Link>
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">{user?.name?.charAt(0) || "U"}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-card-foreground">{user?.name || "User"}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground">{user?.phone}</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="mb-6 border-border">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <Link href={item.href} className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-6 border-border">
          <CardContent className="p-0">
            {settingsItems.map((item, index) => (
              <div key={item.label}>
                <Link href={item.href} className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                {index < settingsItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Keluar
        </Button>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground mt-6">FoodFast v1.0.0</p>
      </div>

      <BottomNav />
    </div>
  )
}
