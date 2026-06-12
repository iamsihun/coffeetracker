import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createBean } from '@/app/actions'
import { SubmitButton } from '@/app/components/submit-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function NewBeanPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="-ml-2 h-8 w-8 text-muted-foreground">
          <Link href="/" aria-label="Back to all beans">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Add New Bean</h1>
      </div>

      <Card>
        <CardContent className="p-4 pt-4">
          <form action={createBean} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Bean Name <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                autoFocus
                placeholder="e.g. Ethiopia Yirgacheffe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roaster">Roaster</Label>
              <Input type="text" id="roaster" name="roaster" placeholder="e.g. Blue Bottle Coffee" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input type="text" id="origin" name="origin" placeholder="e.g. Colombia, Huila" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roastDate">Roast Date</Label>
              <Input type="date" id="roastDate" name="roastDate" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Tasting notes, first impressions..."
                rows={3}
                className="resize-none"
              />
            </div>

            <SubmitButton label="Add Bean" pendingLabel="Adding..." className="mt-2 w-full" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
