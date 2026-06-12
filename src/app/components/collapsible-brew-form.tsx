'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
  initialOpen = true,
  previousGrinders = [],
}: {
  beanId: string
  createBrewAction: (formData: FormData) => Promise<void>
  initialOpen?: boolean
  previousGrinders?: string[]
}) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  useEffect(() => {
    setIsOpen(initialOpen)
  }, [initialOpen])

  return (
    <Card className="mb-5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center justify-between p-4 text-left">
            <h2 className="text-base font-semibold">Log a Brew</h2>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-200',
                !isOpen && '-rotate-90'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <form action={createBrewAction} className="space-y-4 px-4 pb-4">
            <input type="hidden" name="beanId" value={beanId} />

            <div className="space-y-2">
              <Label>Brew Method</Label>
              <Select name="brewMethod" defaultValue="Espresso" required>
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
                <Label htmlFor="gramsIn">Grams In</Label>
                <Input type="number" id="gramsIn" name="gramsIn" step="0.1" min="0" required placeholder="18" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gramsOut">Grams Out</Label>
                <Input type="number" id="gramsOut" name="gramsOut" step="0.1" min="0" required placeholder="36" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="grindSize">Grind Size</Label>
                <Input type="text" id="grindSize" name="grindSize" required placeholder="e.g. 20 clicks" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brewTime">Brew Time</Label>
                <Input type="text" id="brewTime" name="brewTime" required placeholder="e.g. 2:30" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grinder">Grinder</Label>
              <Input type="text" id="grinder" name="grinder" list="grinder-suggestions" placeholder="e.g. Comandante" />
              <datalist id="grinder-suggestions">
                {previousGrinders.map((g) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" name="date" defaultValue={today()} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brew-notes">Notes</Label>
              <Textarea
                id="brew-notes" name="notes" placeholder="How did it taste?" rows={2}
                className="min-h-0 resize-none"
              />
            </div>

            <SubmitButton label="Log Brew" pendingLabel="Logging..." className="w-full" />
          </form>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
