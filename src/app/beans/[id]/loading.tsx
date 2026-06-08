export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-20 bg-stone-200 rounded mb-6" />

      {/* Bean info card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-5">
        <div className="flex justify-between items-start gap-2">
          <div className="h-7 w-48 bg-stone-200 rounded" />
          <div className="flex gap-1.5">
            <div className="h-7 w-12 bg-stone-100 rounded-md" />
            <div className="h-7 w-14 bg-stone-100 rounded-md" />
          </div>
        </div>
        <div className="h-4 w-36 bg-stone-100 rounded mt-2" />
        <div className="h-4 w-56 bg-stone-100 rounded mt-1.5" />
      </div>

      {/* Log a brew card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-5">
        <div className="h-5 w-24 bg-stone-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-10 w-full bg-stone-100 rounded-lg" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-stone-100 rounded-lg" />
            <div className="h-10 bg-stone-100 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-stone-100 rounded-lg" />
            <div className="h-10 bg-stone-100 rounded-lg" />
          </div>
          <div className="h-10 w-full bg-stone-100 rounded-lg" />
          <div className="h-16 w-full bg-stone-100 rounded-lg" />
          <div className="h-11 w-full bg-stone-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
