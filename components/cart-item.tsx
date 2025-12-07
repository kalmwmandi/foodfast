"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem as CartItemType } from "@/lib/data"
import { useAppStore } from "@/lib/store"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useAppStore()

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-xl object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
        <p className="text-primary font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
        <Input placeholder="Catatan (opsional)" className="mt-2 text-sm h-8" />
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
