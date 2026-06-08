export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-24 bg-stone-200 rounded-lg" />
        <div className="h-9 w-24 bg-stone-200 rounded-lg" />
      </div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-40 bg-stone-200 rounded" />
                <div className="h-4 w-28 bg-stone-100 rounded" />
              </div>
              <div className="h-5 w-5 bg-stone-100 rounded" />
            </div>
            <div className="mt-3 flex gap-2">
              <div className="h-3 w-12 bg-stone-100 rounded" />
              <div className="h-3 w-20 bg-stone-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
