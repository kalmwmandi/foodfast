"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Clock, MapPin, Heart, Share2, Info } from "lucide-react"
import { restaurants, menuItems, reviews } from "@/lib/data"
import { MenuItemCard } from "@/components/menu-item-card"
import { ReviewCard } from "@/components/review-card"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore } from "@/lib/store"

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const restaurant = restaurants.find((r) => r.id === id)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("all")
  const { cart, getCartTotal, getCartCount } = useAppStore()

  const menuCategories = [
    { id: "all", name: "Semua" },
    { id: "main", name: "Makanan Utama" },
    { id: "drink", name: "Minuman" },
  ]

  const filteredMenu =
    selectedMenuCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedMenuCategory)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Restoran tidak ditemukan</p>
      </div>
    )
  }

  const cartTotal = getCartTotal()
  const cartCount = getCartCount()

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-20">
      {/* Header Image */}
      <div className="relative h-64">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href="/">
            <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-background/80 backdrop-blur"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-background/80 backdrop-blur">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground mb-1">{restaurant.name}</h1>
              <p className="text-muted-foreground text-sm">{restaurant.address}</p>
            </div>
            <Badge className={restaurant.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
              {restaurant.isOpen ? "Buka" : "Tutup"}
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-bold text-card-foreground">{restaurant.rating}</span>
              <span className="text-muted-foreground">({restaurant.reviewCount} ulasan)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 p-3 bg-accent/50 rounded-xl">
            <Info className="w-5 h-5 text-accent-foreground" />
            <p className="text-sm text-accent-foreground">
              Ongkir Rp {restaurant.deliveryFee.toLocaleString("id-ID")} • Min. order Rp 20.000
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="menu" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-4">
            {/* Menu Categories */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {menuCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedMenuCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full shrink-0"
                  onClick={() => setSelectedMenuCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredMenu.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-40">
          <Link href="/cart">
            <Button className="w-full bg-primary text-primary-foreground py-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary-foreground text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {cartCount}
                  </span>
                  <span className="font-semibold">Lihat Keranjang</span>
                </div>
                <span className="font-bold">Rp {cartTotal.toLocaleString("id-ID")}</span>
              </div>
            </Button>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
