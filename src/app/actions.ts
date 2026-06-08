'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBean(formData: FormData) {
  const name = (formData.get('name') as string).trim()
  const roaster = (formData.get('roaster') as string | null)?.trim()
  const origin = (formData.get('origin') as string | null)?.trim()
  const notes = (formData.get('notes') as string | null)?.trim()

  const bean = await prisma.bean.create({
    data: {
      name,
      roaster: roaster || null,
      origin: origin || null,
      notes: notes || null,
    },
  })

  revalidatePath('/')
  redirect(`/beans/${bean.id}`)
}

export async function updateBean(id: string, formData: FormData) {
  const name = (formData.get('name') as string).trim()
  const roaster = (formData.get('roaster') as string | null)?.trim()
  const origin = (formData.get('origin') as string | null)?.trim()
  const notes = (formData.get('notes') as string | null)?.trim()

  await prisma.bean.update({
    where: { id },
    data: {
      name,
      roaster: roaster || null,
      origin: origin || null,
      notes: notes || null,
    },
  })

  redirect(`/beans/${id}`)
}

export async function deleteBean(id: string) {
  await prisma.bean.delete({ where: { id } })
  revalidatePath('/')
  redirect('/')
}

export async function createBrew(formData: FormData) {
  const beanId = formData.get('beanId') as string
  const grindSize = (formData.get('grindSize') as string).trim()
  const gramsIn = parseFloat(formData.get('gramsIn') as string)
  const gramsOut = parseFloat(formData.get('gramsOut') as string)
  const brewTime = (formData.get('brewTime') as string).trim()
  const brewMethod = formData.get('brewMethod') as string
  const notes = (formData.get('notes') as string | null)?.trim()
  const dateStr = formData.get('date') as string

  await prisma.brew.create({
    data: {
      beanId,
      grindSize,
      gramsIn,
      gramsOut,
      brewTime,
      brewMethod,
      notes: notes || null,
      date: dateStr ? new Date(dateStr) : new Date(),
    },
  })

  revalidatePath(`/beans/${beanId}`)
}

export async function updateBrew(id: string, formData: FormData) {
  const beanId = formData.get('beanId') as string
  const grindSize = (formData.get('grindSize') as string).trim()
  const gramsIn = parseFloat(formData.get('gramsIn') as string)
  const gramsOut = parseFloat(formData.get('gramsOut') as string)
  const brewTime = (formData.get('brewTime') as string).trim()
  const brewMethod = formData.get('brewMethod') as string
  const notes = (formData.get('notes') as string | null)?.trim()
  const dateStr = formData.get('date') as string

  await prisma.brew.update({
    where: { id },
    data: {
      grindSize,
      gramsIn,
      gramsOut,
      brewTime,
      brewMethod,
      notes: notes || null,
      date: dateStr ? new Date(dateStr) : undefined,
    },
  })

  redirect(`/beans/${beanId}`)
}

export async function deleteBrew(id: string, beanId: string) {
  await prisma.brew.delete({ where: { id } })
  revalidatePath(`/beans/${beanId}`)
}
