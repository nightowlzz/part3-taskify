'use server'

import { api } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

type CreateCardProps = {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate?: string
  tags?: string[]
  imageUrl?: string
}

export const createCard = async ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: CreateCardProps) => {
  try {
    await api.post('/cards', {
      assigneeUserId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    })
    revalidatePath('/dashboard')

    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteCard = async ({ cardId }: { cardId: number }) => {
  try {
    await api.delete(`/cards/${cardId}`)
    revalidatePath('dashboard/[dashbaordId]', 'page')
  } catch (error) {
    return null
  }
}
