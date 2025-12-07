"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star, Camera, X } from "lucide-react"

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push("/orders")
  }

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=100&width=100&query=food photo ${images.length + 1}`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/orders">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-card-foreground">Beri Ulasan</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-lg">
        {/* Restaurant Info */}
        <Card className="mb-6 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/padang-restaurant.jpg"
                alt="Restaurant"
                width={60}
                height={60}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-semibold text-card-foreground">Warung Padang Sederhana</h4>
                <p className="text-sm text-muted-foreground">Pesanan #{id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card className="mb-6 border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold text-card-foreground text-center mb-4">Bagaimana pengalamanmu?</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating) ? "fill-primary text-primary" : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-2">
              {rating === 0 && "Ketuk bintang untuk memberi rating"}
              {rating === 1 && "Sangat Buruk"}
              {rating === 2 && "Buruk"}
              {rating === 3 && "Cukup"}
              {rating === 4 && "Baik"}
              {rating === 5 && "Sangat Baik"}
            </p>
          </CardContent>
        </Card>

        {/* Review Text */}
        <Card className="mb-6 border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold text-card-foreground mb-4">Tulis ulasanmu</h3>
            <Textarea
              placeholder="Ceritakan pengalamanmu dengan restoran ini..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card className="mb-6 border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold text-card-foreground mb-4">Tambahkan foto (opsional)</h3>
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <button
                  type="button"
                  className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  onClick={handleImageUpload}
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-xs">Tambah</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          className="w-full bg-primary text-primary-foreground py-6 text-lg"
          disabled={rating === 0 || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
        </Button>
      </div>
    </div>
  )
}
