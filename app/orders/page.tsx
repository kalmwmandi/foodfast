"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ChevronRight } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"

const orderHistory = [
  {
    id: "ORD-001",
    restaurant: {
      name: "Warung Padang Sederhana",
      image: "/padang-restaurant.jpg",
    },
    items: ["Nasi Padang Komplit", "Es Teh Manis"],
    total: 53000,
    date: "5 Des 2024",
    status: "delivered",
    hasReviewed: false,
  },
  {
    id: "ORD-002",
    restaurant: {
      name: "Sushi Tei Express",
      image: "/bustling-sushi-restaurant.png",
    },
    items: ["Salmon Sashimi", "Miso Soup"],
    total: 125000,
    date: "3 Des 2024",
    status: "delivered",
    hasReviewed: true,
  },
  {
    id: "ORD-003",
    restaurant: {
      name: "Kopi Kenangan",
      image: "/placeholder.svg?height=60&width=60",
    },
    items: ["Kopi Kenangan Mantan", "Croissant"],
    total: 42000,
    date: "1 Des 2024",
    status: "cancelled",
    hasReviewed: false,
  },
]

const activeOrders = [
  {
    id: "ORD-004",
    restaurant: {
      name: "Din Tai Fung",
      image: "/placeholder.svg?height=60&width=60",
    },
    items: ["Xiao Long Bao", "Fried Rice"],
    total: 185000,
    date: "Hari ini",
    status: "preparing",
    estimatedTime: "25 min",
  },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  preparing: { label: "Diproses", color: "bg-amber-100 text-amber-700" },
  "on-the-way": { label: "Dalam Perjalanan", color: "bg-blue-100 text-blue-700" },
  delivered: { label: "Selesai", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700" },
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Pesanan Saya</h1>

        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
            <TabsTrigger value="active">Aktif ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>

          {/* Active Orders */}
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-xl font-bold text-foreground mb-2">Tidak Ada Pesanan Aktif</h2>
                <p className="text-muted-foreground mb-6">Yuk, mulai pesan makanan favoritmu!</p>
                <Link href="/">
                  <Button className="bg-primary text-primary-foreground">Cari Restoran</Button>
                </Link>
              </div>
            ) : (
              activeOrders.map((order) => (
                <Link key={order.id} href="/tracking">
                  <Card className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{order.id}</span>
                        <Badge className={statusLabels[order.status].color}>{statusLabels[order.status].label}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src={order.restaurant.image || "/placeholder.svg"}
                          alt={order.restaurant.name}
                          width={60}
                          height={60}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-card-foreground">{order.restaurant.name}</h4>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                          <p className="text-sm font-medium text-primary mt-1">
                            Rp {order.total.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="mt-3 p-3 bg-accent/50 rounded-xl">
                        <p className="text-sm text-accent-foreground">Estimasi tiba: {order.estimatedTime}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>

          {/* Order History */}
          <TabsContent value="history" className="space-y-4">
            {orderHistory.map((order) => (
              <Card key={order.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {order.date} • {order.id}
                    </span>
                    <Badge className={statusLabels[order.status].color}>{statusLabels[order.status].label}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={order.restaurant.image || "/placeholder.svg"}
                      alt={order.restaurant.name}
                      width={60}
                      height={60}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{order.restaurant.name}</h4>
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                      <p className="text-sm font-medium text-primary mt-1">Rp {order.total.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href={`/restaurant/1`}>Pesan Lagi</Link>
                    </Button>
                    {order.status === "delivered" && !order.hasReviewed && (
                      <Button className="flex-1 bg-primary text-primary-foreground" asChild>
                        <Link href={`/review/${order.id}`}>
                          <Star className="w-4 h-4 mr-2" />
                          Beri Ulasan
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}
