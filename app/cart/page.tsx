"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Clock, CreditCard } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { CartItem } from "@/components/cart-item"
import { BottomNav } from "@/components/bottom-nav"
import { restaurants } from "@/lib/data"

export default function CartPage() {
  const { cart, getCartTotal, clearCart, setCurrentOrder } = useAppStore()
  const cartTotal = getCartTotal()
  const deliveryFee = 10000
  const serviceFee = 2000
  const total = cartTotal + deliveryFee + serviceFee

  const restaurant = restaurants[0] // Default restaurant for demo

  const handleCheckout = () => {
    // Create order and redirect to tracking
    const order = {
      id: `ORD-${Date.now()}`,
      restaurant,
      items: cart,
      status: "confirmed" as const,
      totalAmount: total,
      orderTime: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      estimatedDelivery: "30-40 min",
      driverName: "Budi Setiawan",
      driverPhone: "081234567890",
    }
    setCurrentOrder(order)
    clearCart()
    window.location.href = "/tracking"
  }

  if (cart.length === 0) {
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
              <h1 className="text-xl font-bold text-card-foreground">Keranjang</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground mb-6">Yuk, mulai pesan makanan favoritmu!</p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground">Cari Restoran</Button>
          </Link>
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-40 md:pb-32">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-card-foreground">Keranjang</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Delivery Address */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">Alamat Pengiriman</h3>
                <p className="text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ubah
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-card-foreground">Pesanan Kamu</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </CardContent>
        </Card>

        {/* Delivery Time */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">Estimasi Pengiriman</h3>
                <p className="text-sm text-muted-foreground">30-40 menit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">Metode Pembayaran</h3>
                <p className="text-sm text-muted-foreground">GoPay</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ubah
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-card-foreground">Ringkasan Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-card-foreground">Rp {cartTotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span className="text-card-foreground">Rp {deliveryFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Biaya Layanan</span>
              <span className="text-card-foreground">Rp {serviceFee.toLocaleString("id-ID")}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span className="text-card-foreground">Total</span>
              <span className="text-primary">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-20 md:bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <Button
          className="w-full bg-primary text-primary-foreground py-6 text-lg font-semibold"
          onClick={handleCheckout}
        >
          Bayar Rp {total.toLocaleString("id-ID")}
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
