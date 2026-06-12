import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-7 w-32" />
      </div>
      <Card>
        <CardContent className="space-y-4 p-4 pt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="mt-2 h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
