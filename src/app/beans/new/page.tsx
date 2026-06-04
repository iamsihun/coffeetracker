import Link from 'next/link'
import { createBean } from '@/app/actions'

export default function NewBeanPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-stone-500 hover:text-stone-700 p-1 -ml-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold text-stone-800">Add New Bean</h1>
      </div>

      <form action={createBean} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Bean Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            placeholder="e.g. Ethiopia Yirgacheffe"
            className="w-full px-3 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Roaster</label>
          <input
            type="text"
            name="roaster"
            placeholder="e.g. Blue Bottle Coffee"
            className="w-full px-3 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Origin</label>
          <input
            type="text"
            name="origin"
            placeholder="e.g. Colombia, Huila"
            className="w-full px-3 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Notes</label>
          <textarea
            name="notes"
            placeholder="Tasting notes, first impressions..."
            rows={3}
            className="w-full px-3 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-700 text-white py-3 rounded-lg font-medium hover:bg-amber-800 transition-colors mt-2"
        >
          Add Bean
        </button>
      </form>
    </div>
  )
}
