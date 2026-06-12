import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div>
      <Skeleton className="mb-6 h-4 w-20" />

      {/* Bean info card */}
      <Card className="mb-5 p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-7 w-48" />
          <div className="flex gap-1.5">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <Skeleton className="mt-2 h-4 w-36" />
        <Skeleton className="mt-1.5 h-4 w-56" />
      </Card>

      {/* Log a brew card */}
      <Card className="mb-5 p-4">
        <Skeleton className="mb-4 h-5 w-24" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    </div>
  )
}
