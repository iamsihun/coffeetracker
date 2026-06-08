import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { updateBean, deleteBean, createBrew, deleteBrew } from '@/app/actions'
import { SubmitButton } from '@/app/components/submit-button'

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

export default async function BeanPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { edit?: string }
}) {
  const bean = await prisma.bean.findUnique({
    where: { id: params.id },
    include: {
      brews: { orderBy: { date: 'desc' } },
    },
  })

  if (!bean) notFound()

  const isEditing = searchParams.edit === 'true'
  const updateBeanWithId = updateBean.bind(null, bean.id)
  const deleteBeanWithId = deleteBean.bind(null, bean.id)

  return (
    <div>
      <Link
        href="/"
        className="flex items-center gap-1 text-stone-500 hover:text-stone-700 text-sm mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Beans
      </Link>

      {/* Bean info card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-5">
        {isEditing ? (
          <form action={updateBeanWithId} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">
                Bean Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                defaultValue={bean.name}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Roaster</label>
              <input
                name="roaster"
                defaultValue={bean.roaster ?? ''}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Origin</label>
              <input
                name="origin"
                defaultValue={bean.origin ?? ''}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Notes</label>
              <textarea
                name="notes"
                defaultValue={bean.notes ?? ''}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 resize-none"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <SubmitButton
                label="Save Changes"
                pendingLabel="Saving..."
                className="flex-1 bg-amber-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-60"
              />
              <Link
                href={`/beans/${bean.id}`}
                className="flex-1 text-center bg-stone-100 text-stone-700 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-start gap-2">
              <h1 className="text-xl font-bold text-stone-800 leading-tight">{bean.name}</h1>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Link
                  href={`/beans/${bean.id}?edit=true`}
                  className="text-xs text-amber-700 font-medium border border-amber-200 px-2.5 py-1 rounded-md hover:bg-amber-50 transition-colors"
                >
                  Edit
                </Link>
                <form action={deleteBeanWithId}>
                  <SubmitButton
                    label="Delete"
                    pendingLabel="Deleting..."
                    className="text-xs text-stone-400 border border-stone-200 px-2.5 py-1 rounded-md hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-60"
                  />
                </form>
              </div>
            </div>
            {(bean.roaster || bean.origin) && (
              <p className="text-sm text-stone-500 mt-1">
                {[bean.roaster, bean.origin].filter(Boolean).join(' · ')}
              </p>
            )}
            {bean.notes && (
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">{bean.notes}</p>
            )}
          </>
        )}
      </div>

      {/* Log a brew */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 mb-5">
        <h2 className="text-base font-semibold text-stone-800 mb-4">Log a Brew</h2>
        <form action={createBrew} className="space-y-3">
          <input type="hidden" name="beanId" value={bean.id} />

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Brew Method</label>
            <select
              name="brewMethod"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-800"
            >
              {BREW_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Grams In</label>
              <input
                type="number"
                name="gramsIn"
                step="0.1"
                min="0"
                required
                placeholder="18"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Grams Out</label>
              <input
                type="number"
                name="gramsOut"
                step="0.1"
                min="0"
                required
                placeholder="36"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Grind Size</label>
              <input
                type="text"
                name="grindSize"
                required
                placeholder="e.g. 20 clicks"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Brew Time</label>
              <input
                type="text"
                name="brewTime"
                required
                placeholder="e.g. 2:30"
                className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Date</label>
            <input
              type="date"
              name="date"
              defaultValue={today()}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Notes</label>
            <textarea
              name="notes"
              placeholder="How did it taste?"
              rows={2}
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

      {/* Brew history */}
      {bean.brews.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-stone-800 mb-3">
            Brew History
            <span className="ml-2 text-xs font-normal text-stone-400">({bean.brews.length})</span>
          </h2>
          <div className="space-y-3">
            {bean.brews.map((brew) => {
              const deleteBrewWithIds = deleteBrew.bind(null, brew.id, bean.id)
              const ratio = brew.gramsOut / brew.gramsIn
              return (
                <div
                  key={brew.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-stone-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-medium text-stone-800 text-sm">{brew.brewMethod}</span>
                      <span className="text-stone-400 text-xs ml-2">
                        {new Date(brew.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <form action={deleteBrewWithIds}>
                      <SubmitButton
                        label="✕"
                        pendingLabel="..."
                        className="text-stone-300 hover:text-red-400 transition-colors text-base leading-none p-1 -mr-1 -mt-1 disabled:opacity-40"
                        aria-label="Delete brew"
                      />
                    </form>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-stone-50 rounded-lg py-2">
                      <div className="text-xs text-stone-400 mb-0.5">In</div>
                      <div className="text-sm font-semibold text-stone-700">{brew.gramsIn}g</div>
                    </div>
                    <div className="bg-stone-50 rounded-lg py-2">
                      <div className="text-xs text-stone-400 mb-0.5">Out</div>
                      <div className="text-sm font-semibold text-stone-700">{brew.gramsOut}g</div>
                    </div>
                    <div className="bg-stone-50 rounded-lg py-2">
                      <div className="text-xs text-stone-400 mb-0.5">Ratio</div>
                      <div className="text-sm font-semibold text-stone-700">
                        1:{ratio.toFixed(1)}
                      </div>
                    </div>
                    <div className="bg-stone-50 rounded-lg py-2">
                      <div className="text-xs text-stone-400 mb-0.5">Time</div>
                      <div className="text-sm font-semibold text-stone-700">{brew.brewTime}</div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-500">
                    <span>Grind: {brew.grindSize}</span>
                  </div>

                  {brew.notes && (
                    <p className="mt-1.5 text-xs text-stone-500 italic">{brew.notes}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
