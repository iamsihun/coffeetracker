import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { deleteBean } from '@/app/actions'
import { SwipeableItem } from '@/app/components/swipeable-item'

export default async function Home() {
  const beans = await prisma.bean.findMany({
    include: {
      brews: {
        orderBy: { date: 'desc' },
        take: 1,
      },
      _count: { select: { brews: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-stone-800">My Beans</h1>
        <Link
          href="/beans/new"
          className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors"
        >
          + Add Bean
        </Link>
      </div>

      {beans.length === 0 ? (
        <div className="text-center py-20 text-stone-500">
          <div className="text-5xl mb-4">☕</div>
          <p className="font-medium text-stone-700 text-lg">No beans yet</p>
          <p className="text-sm mt-1 mb-6">Add your first coffee bean to get started</p>
          <Link
            href="/beans/new"
            className="bg-amber-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors inline-block"
          >
            Add Your First Bean
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {beans.map((bean) => {
            const deleteBeanAction = deleteBean.bind(null, bean.id)
            return (
              <SwipeableItem
                key={bean.id}
                deleteAction={deleteBeanAction}
                className="shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/beans/${bean.id}`}
                  className="block p-4 active:bg-stone-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-stone-800 truncate">{bean.name}</h2>
                      {(bean.roaster || bean.origin) && (
                        <p className="text-sm text-stone-500 mt-0.5 truncate">
                          {[bean.roaster, bean.origin].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <svg
                      className="w-5 h-5 text-stone-300 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
                    <span>
                      {bean._count.brews} {bean._count.brews === 1 ? 'brew' : 'brews'}
                    </span>
                    {bean.brews[0] && (
                      <>
                        <span>·</span>
                        <span>Last: {bean.brews[0].brewMethod}</span>
                        <span>·</span>
                        <span>
                          {new Date(bean.brews[0].date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </SwipeableItem>
            )
          })}
        </div>
      )}
    </div>
  )
}
