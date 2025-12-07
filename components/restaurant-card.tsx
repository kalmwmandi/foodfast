"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"
import type { Restaurant } from "@/lib/data"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-border">
        <div className="relative">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="text-background font-semibold">Tutup</span>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-background text-foreground">{restaurant.priceRange}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground text-lg mb-1 truncate">{restaurant.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground text-sm">({restaurant.reviewCount})</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Ongkir Rp {restaurant.deliveryFee.toLocaleString("id-ID")}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
