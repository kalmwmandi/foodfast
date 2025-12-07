"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Flame } from "lucide-react"
import type { MenuItem } from "@/lib/data"
import { useAppStore } from "@/lib/store"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useAppStore()

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 })
  }

  return (
    <Card className="overflow-hidden border-border hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{item.name}</h4>
              {item.isPopular && <Badge className="bg-accent text-accent-foreground text-xs">Populer</Badge>}
              {item.isSpicy && <Flame className="w-4 h-4 text-destructive" />}
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
            <p className="font-bold text-primary">Rp {item.price.toLocaleString("id-ID")}</p>
          </div>
          <div className="relative">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg"
              onClick={handleAddToCart}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
