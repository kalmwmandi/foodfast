import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Review } from "@/lib/data"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Image
            src={review.userAvatar || "/placeholder.svg"}
            alt={review.userName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-foreground">{review.userName}</h4>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img || "/placeholder.svg"}
                    alt="Review"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
