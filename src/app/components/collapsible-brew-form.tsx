'use client'

import { useState } from 'react'
import { SubmitButton } from './submit-button'

const BREW_METHODS = [
  'Espresso',
  'Pour Over',
  'French Press',
  'AeroPress',
  'Chemex',
  'Moka Pot',
  'Drip',
  'Cold Brew',
  'Other',
]

function today() {
  return new Date().toISOString().split('T')[0]
}

export function CollapsibleBrewForm({
  beanId,
  createBrewAction,
}: {
  beanId: string
  createBrewAction: (formData: FormData) => Promise<void>
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 mb-5">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <h2 className="text-base font-semibold text-stone-800">Log a Brew</h2>
        <svg
          className="w-4 h-4 text-stone-400 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.2s ease-out',
        }}
      >
        <div className="overflow-hidden">
          <form action={createBrewAction} className="space-y-3 px-4 pb-4">
            <input type="hidden" name="beanId" value={beanId} />

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Brew Method</label>
              <select
                name="brewMethod"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-800"
              >
                {BREW_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Grams In</label>
                <input
                  type="number" name="gramsIn" step="0.1" min="0" required placeholder="18"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Grams Out</label>
                <input
                  type="number" name="gramsOut" step="0.1" min="0" required placeholder="36"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Grind Size</label>
                <input
                  type="text" name="grindSize" required placeholder="e.g. 20 clicks"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Brew Time</label>
                <input
                  type="text" name="brewTime" required placeholder="e.g. 2:30"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Date</label>
              <input
                type="date" name="date" defaultValue={today()}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Notes</label>
              <textarea
                name="notes" placeholder="How did it taste?" rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 resize-none"
              />
            </div>

            <SubmitButton
              label="Log Brew"
              pendingLabel="Logging..."
              className="w-full bg-amber-700 text-white py-3 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-60"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
