"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { CategoryFilter } from "@/components/category-filter"
import { RestaurantCard } from "@/components/restaurant-card"
import { PromoBanner } from "@/components/promo-banner"
import { restaurants } from "@/lib/data"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredRestaurants =
    selectedCategory === "all"
      ? restaurants
      : restaurants.filter((r) => r.category === selectedCategory)

  // ❗ FIX HYDRATION ERROR — clone dulu sebelum sort
  const popularRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6">

        {/* Promo Banner */}
        <section className="mb-8">
          <PromoBanner />
        </section>

        {/* Categories */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Kategori</h2>
          <CategoryFilter onCategoryChange={setSelectedCategory} />
        </section>

        {/* Nearby Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Restoran Terdekat</h2>
            <button className="text-primary text-sm font-medium">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Paling Populer</h2>
            <button className="text-primary text-sm font-medium">Lihat Semua</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
