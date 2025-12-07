"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Phone, MessageCircle, MapPin, CheckCircle2, ChefHat, Bike, Home } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { BottomNav } from "@/components/bottom-nav"

const orderStatuses = [
  {
    id: "confirmed",
    label: "Pesanan Dikonfirmasi",
    icon: CheckCircle2,
    description: "Restoran telah menerima pesananmu",
  },
  {
    id: "preparing",
    label: "Sedang Dimasak",
    icon: ChefHat,
    description: "Pesananmu sedang dipersiapkan",
  },
  {
    id: "on-the-way",
    label: "Dalam Perjalanan",
    icon: Bike,
    description: "Driver sedang menuju lokasimu",
  },
  {
    id: "delivered",
    label: "Terkirim",
    icon: Home,
    description: "Pesanan telah sampai",
  },
]

export default function TrackingPage() {
  const { currentOrder } = useAppStore()
  const [currentStatus, setCurrentStatus] = useState(1)
  const [progress, setProgress] = useState(25)

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev < 4) {
          setProgress((prev + 1) * 25)
          return prev + 1
        }
        return prev
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-card-foreground">Lacak Pesanan</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Tidak Ada Pesanan Aktif</h2>
          <p className="text-muted-foreground mb-6">Kamu belum memiliki pesanan yang sedang diproses</p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground">Pesan Sekarang</Button>
          </Link>
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">Lacak Pesanan</h1>
              <p className="text-sm text-muted-foreground">{currentOrder.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <Card className="overflow-hidden border-border">
          <div className="relative h-48 bg-secondary">
            <Image src="/delivery-map-route.jpg" alt="Map" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <p className="text-sm font-medium text-card-foreground">
                  Estimasi tiba: {currentOrder.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-6">
              {orderStatuses.map((status, index) => {
                const isCompleted = index < currentStatus
                const isCurrent = index === currentStatus - 1
                const StatusIcon = status.icon

                return (
                  <div key={status.id} className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted || isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pb-6 border-b border-border last:border-0 last:pb-0">
                      <h4
                        className={`font-semibold ${
                          isCompleted || isCurrent ? "text-card-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {status.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{status.description}</p>
                      {isCurrent && <p className="text-xs text-primary mt-1">Sedang berlangsung...</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        {currentStatus >= 3 && currentOrder.driverName && (
          <Card className="border-border">
            <CardContent className="p-4">
              <h3 className="font-semibold text-card-foreground mb-4">Driver Kamu</h3>
              <div className="flex items-center gap-4">
                <Image
                  src="/delivery-driver-avatar.png"
                  alt="Driver"
                  width={60}
                  height={60}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground">{currentOrder.driverName}</h4>
                  <p className="text-sm text-muted-foreground">Honda Vario • B 1234 ABC</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Address */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Alamat Pengiriman</h3>
                <p className="text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold text-card-foreground mb-4">Detail Pesanan</h3>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={currentOrder.restaurant.image || "/placeholder.svg"}
                alt={currentOrder.restaurant.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-medium text-card-foreground">{currentOrder.restaurant.name}</h4>
                <p className="text-sm text-muted-foreground">{currentOrder.items.length} item</p>
              </div>
            </div>
            <div className="space-y-2">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-card-foreground">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span className="text-card-foreground">Total</span>
                <span className="text-primary">Rp {currentOrder.totalAmount.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
