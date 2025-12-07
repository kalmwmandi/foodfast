"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function PromoBanner() {
  return (
    <Card className="bg-gradient-to-r from-primary to-orange-400 border-0 overflow-hidden">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="text-primary-foreground">
          <p className="text-sm font-medium opacity-90">Promo Spesial</p>
          <h3 className="text-2xl font-bold mb-2">Diskon 50%</h3>
          <p className="text-sm opacity-90 mb-3">Untuk pesanan pertamamu!</p>
          <Button variant="secondary" size="sm" className="bg-background text-primary hover:bg-background/90">
            Pesan Sekarang
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="hidden sm:block">
          <div className="w-32 h-32 bg-background/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">🍔</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
