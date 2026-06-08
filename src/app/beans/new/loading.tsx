export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-5 w-5 bg-stone-200 rounded" />
        <div className="h-7 w-32 bg-stone-200 rounded-lg" />
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-stone-200 rounded mb-1.5" />
            <div className="h-12 w-full bg-stone-100 rounded-lg" />
          </div>
        ))}
        <div className="h-12 w-full bg-stone-200 rounded-lg mt-2" />
      </div>
    </div>
  )
}
