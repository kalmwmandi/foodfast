"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RestaurantCard } from "@/components/restaurant-card"
import { CategoryFilter } from "@/components/category-filter"
import { restaurants } from "@/lib/data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [maxDistance, setMaxDistance] = useState([5])
  const [isOpenOnly, setIsOpenOnly] = useState(false)

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory
    const matchesOpen = !isOpenOnly || restaurant.isOpen
    const distance = Number.parseFloat(restaurant.distance)
    const matchesDistance = distance <= maxDistance[0]

    return matchesSearch && matchesCategory && matchesOpen && matchesDistance
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari restoran atau makanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 bg-secondary border-0 rounded-xl"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <Label>Jarak Maksimum</Label>
                  <Slider value={maxDistance} onValueChange={setMaxDistance} max={10} step={0.5} className="w-full" />
                  <p className="text-sm text-muted-foreground">{maxDistance[0]} km</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="open-only"
                    checked={isOpenOnly}
                    onCheckedChange={(checked) => setIsOpenOnly(checked as boolean)}
                  />
                  <Label htmlFor="open-only">Hanya yang buka</Label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <CategoryFilter onCategoryChange={setSelectedCategory} />
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">{filteredRestaurants.length} restoran ditemukan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Tidak Ditemukan</h2>
            <p className="text-muted-foreground">Coba kata kunci atau filter lain</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
