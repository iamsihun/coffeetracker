import Link from 'next/link'
import { ChevronRight, Coffee, Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { deleteBean } from '@/app/actions'
import { SwipeableItem } from '@/app/components/swipeable-item'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">My Beans</h1>
        <Button asChild size="sm">
          <Link href="/beans/new">
            <Plus />
            Add Bean
          </Link>
        </Button>
      </div>

      {beans.length === 0 ? (
        <Card className="flex flex-col items-center border-dashed py-16 text-center shadow-none">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <Coffee className="h-8 w-8 text-accent-foreground" />
          </div>
          <p className="text-lg font-medium">No beans yet</p>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">
            Add your first coffee bean to get started
          </p>
          <Button asChild>
            <Link href="/beans/new">
              <Plus />
              Add Your First Bean
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {beans.map((bean) => {
            const deleteBeanAction = deleteBean.bind(null, bean.id)
            return (
              <SwipeableItem
                key={bean.id}
                deleteAction={deleteBeanAction}
                className="transition-shadow hover:shadow-md"
              >
                <Link href={`/beans/${bean.id}`} className="block p-4 active:bg-muted/50">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">{bean.name}</h2>
                      {(bean.roaster || bean.origin) && (
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {[bean.roaster, bean.origin].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground/40" />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="font-medium">
                      {bean._count.brews} {bean._count.brews === 1 ? 'brew' : 'brews'}
                    </Badge>
                    {bean.brews[0] && (
                      <>
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
