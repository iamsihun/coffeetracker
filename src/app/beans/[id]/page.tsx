import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Pencil, X } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { updateBean, deleteBean, createBrew, updateBrew, deleteBrew } from '@/app/actions'
import { SubmitButton } from '@/app/components/submit-button'
import { SwipeableItem } from '@/app/components/swipeable-item'
import { CollapsibleBrewForm } from '@/app/components/collapsible-brew-form'
import { ConfirmDeleteButton } from '@/app/components/confirm-delete-button'
import { ClearCreatedParam } from '@/app/components/clear-created-param'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

export default async function BeanPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { edit?: string; editBrew?: string; created?: string }
}) {
  const [bean, grinderRows] = await Promise.all([
    prisma.bean.findUnique({
      where: { id: params.id },
      include: { brews: { orderBy: [{ date: 'desc' }, { createdAt: 'desc' }] } },
    }),
    prisma.brew.findMany({
      where: { grinder: { not: null } },
      select: { grinder: true },
      distinct: ['grinder'],
    }),
  ])

  if (!bean) notFound()

  const previousGrinders = grinderRows.map((r) => r.grinder as string)

  const isEditing = searchParams.edit === 'true'
  const updateBeanWithId = updateBean.bind(null, bean.id)
  const deleteBeanWithId = deleteBean.bind(null, bean.id)

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4 text-muted-foreground">
        <Link href="/">
          <ArrowLeft />
          All Beans
        </Link>
      </Button>

      {/* Bean info card */}
      <Card className="mb-5">
        <CardContent className="p-4">
          {isEditing ? (
            <form action={updateBeanWithId} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Bean Name <span className="text-destructive">*</span>
                </Label>
                <Input id="name" name="name" defaultValue={bean.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roaster">Roaster</Label>
                <Input id="roaster" name="roaster" defaultValue={bean.roaster ?? ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" name="origin" defaultValue={bean.origin ?? ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roastDate">Roast Date</Label>
                <Input
                  id="roastDate"
                  type="date"
                  name="roastDate"
                  defaultValue={bean.roastDate ? bean.roastDate.toISOString().split('T')[0] : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={bean.notes ?? ''}
                  rows={2}
                  className="min-h-0 resize-none"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <SubmitButton label="Save Changes" pendingLabel="Saving..." className="flex-1" />
                <Button asChild variant="secondary" className="flex-1">
                  <Link href={`/beans/${bean.id}`}>Cancel</Link>
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <h1 className="text-xl font-bold leading-tight">{bean.name}</h1>
                <div className="flex flex-shrink-0 items-center gap-1.5">
                  <Button asChild variant="outline" size="sm" className="h-8">
                    <Link href={`/beans/${bean.id}?edit=true`}>
                      <Pencil />
                      Edit
                    </Link>
                  </Button>
                  <ConfirmDeleteButton
                    deleteAction={deleteBeanWithId}
                    message="Delete this bean and all its brews?"
                    label="Delete"
                    className="h-8 text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                  />
                </div>
              </div>
              {(bean.roaster || bean.origin || bean.roastDate) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {[
                    bean.roaster,
                    bean.origin,
                    bean.roastDate && `Roasted ${new Date(bean.roastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                  ].filter(Boolean).join(' · ')}
                </p>
              )}
              {bean.notes && (
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{bean.notes}</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <CollapsibleBrewForm
        beanId={bean.id}
        createBrewAction={createBrew}
        initialOpen={!searchParams.editBrew && !searchParams.created}
        previousGrinders={previousGrinders}
      />

      {searchParams.created && (
        <ClearCreatedParam beanId={bean.id} createdId={searchParams.created} />
      )}

      {/* Brew history */}
      {bean.brews.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
            Brew History
            <Badge variant="secondary" className="font-normal">
              {bean.brews.length}
            </Badge>
          </h2>
          <div className="space-y-3">
            {bean.brews.map((brew) => {
              const deleteBrewWithIds = deleteBrew.bind(null, brew.id, bean.id)
              const updateBrewWithId = updateBrew.bind(null, brew.id)
              const ratio = brew.gramsOut / brew.gramsIn
              const isEditingBrew = searchParams.editBrew === brew.id

              if (isEditingBrew) {
                return (
                  <Card key={brew.id}>
                    <CardContent className="p-4">
                      <form action={updateBrewWithId} className="space-y-4">
                        <input type="hidden" name="beanId" value={bean.id} />
                        <div className="space-y-2">
                          <Label>Brew Method</Label>
                          <Select name="brewMethod" defaultValue={brew.brewMethod}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a method" />
                            </SelectTrigger>
                            <SelectContent>
                              {BREW_METHODS.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`gramsIn-${brew.id}`}>Grams In</Label>
                            <Input
                              id={`gramsIn-${brew.id}`}
                              type="number" name="gramsIn" step="0.1" min="0" required
                              defaultValue={brew.gramsIn}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`gramsOut-${brew.id}`}>Grams Out</Label>
                            <Input
                              id={`gramsOut-${brew.id}`}
                              type="number" name="gramsOut" step="0.1" min="0" required
                              defaultValue={brew.gramsOut}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`grindSize-${brew.id}`}>Grind Size</Label>
                            <Input
                              id={`grindSize-${brew.id}`}
                              type="text" name="grindSize" required defaultValue={brew.grindSize}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`brewTime-${brew.id}`}>Brew Time</Label>
                            <Input
                              id={`brewTime-${brew.id}`}
                              type="text" name="brewTime" required defaultValue={brew.brewTime}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`grinder-${brew.id}`}>Grinder</Label>
                          <Input
                            id={`grinder-${brew.id}`}
                            type="text" name="grinder" list="grinder-suggestions-edit"
                            placeholder="e.g. Comandante" defaultValue={brew.grinder ?? ''}
                          />
                          <datalist id="grinder-suggestions-edit">
                            {previousGrinders.map((g) => (
                              <option key={g} value={g} />
                            ))}
                          </datalist>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`date-${brew.id}`}>Date</Label>
                          <Input
                            id={`date-${brew.id}`}
                            type="date" name="date"
                            defaultValue={new Date(brew.date).toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${brew.id}`}>Notes</Label>
                          <Textarea
                            id={`notes-${brew.id}`}
                            name="notes" rows={2} defaultValue={brew.notes ?? ''}
                            className="min-h-0 resize-none"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <SubmitButton label="Save" pendingLabel="Saving..." className="flex-1" />
                          <Button asChild variant="secondary" className="flex-1">
                            <Link href={`/beans/${bean.id}`}>Cancel</Link>
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )
              }

              const isJustCreated = brew.id === searchParams.created

              return (
                <SwipeableItem
                  key={brew.id}
                  deleteAction={deleteBrewWithIds}
                  id={`brew-${brew.id}`}
                  className={isJustCreated ? 'animate-brew-highlight' : undefined}
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <span className="text-sm font-medium">{brew.brewMethod}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {new Date(brew.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button asChild variant="outline" size="sm" className="h-7 px-2 text-xs">
                          <Link href={`/beans/${bean.id}?editBrew=${brew.id}`}>
                            <Pencil />
                            Edit
                          </Link>
                        </Button>
                        <ConfirmDeleteButton
                          deleteAction={deleteBrewWithIds}
                          message="Delete this brew?"
                          label={<X />}
                          variant="ghost"
                          size="icon"
                          className="hidden h-7 w-7 text-muted-foreground/60 hover:text-destructive md:inline-flex"
                          aria-label="Delete brew"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="rounded-md bg-muted py-2">
                        <div className="mb-0.5 text-xs text-muted-foreground">In</div>
                        <div className="text-sm font-semibold">{brew.gramsIn}g</div>
                      </div>
                      <div className="rounded-md bg-muted py-2">
                        <div className="mb-0.5 text-xs text-muted-foreground">Out</div>
                        <div className="text-sm font-semibold">{brew.gramsOut}g</div>
                      </div>
                      <div className="rounded-md bg-muted py-2">
                        <div className="mb-0.5 text-xs text-muted-foreground">Ratio</div>
                        <div className="text-sm font-semibold">1:{ratio.toFixed(1)}</div>
                      </div>
                      <div className="rounded-md bg-muted py-2">
                        <div className="mb-0.5 text-xs text-muted-foreground">Time</div>
                        <div className="text-sm font-semibold">{brew.brewTime}</div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      Grind: {brew.grindSize}{brew.grinder && ` · ${brew.grinder}`}
                    </div>

                    {brew.notes && (
                      <p className="mt-1.5 text-xs italic text-muted-foreground">{brew.notes}</p>
                    )}
                  </div>
                </SwipeableItem>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
