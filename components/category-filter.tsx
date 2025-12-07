"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [selected, setSelected] = useState("all")

  const handleSelect = (categoryId: string) => {
    setSelected(categoryId)
    onCategoryChange?.(categoryId)
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-3 pb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selected === category.id ? "default" : "outline"}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 shrink-0",
              selected === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-secondary",
            )}
            onClick={() => handleSelect(category.id)}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
