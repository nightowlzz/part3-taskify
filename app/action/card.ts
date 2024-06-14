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
  formData: FormData
}

export const createCard = async ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  formData,
}: CreateCardProps) => {
  try {
    if (formData) {
      const res = await api.post(`/columns/${columnId}/card-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const imageUrl = res.data.imageUrl
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
    }

    await api.post('/cards', {
      assigneeUserId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate,
      tags,
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

export const editCard = async ({
  assigneeUserId,
  cardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  formData,
  imgUrl,
}: {
  assigneeUserId: number
  cardId: number
  columnId: number
  title: string
  description: string
  dueDate?: string
  tags?: string[]
  formData: FormData
  imgUrl?: string
}) => {
  try {
    if (imgUrl) {
      await api.put(`/cards/${cardId}`, {
        assigneeUserId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl: imgUrl,
      })
      revalidatePath('/dashboard')
      return true
    }
    if (formData) {
      const res = await api.post(`/columns/${columnId}/card-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const imageUrl = res.data.imageUrl
      await api.put(`/cards/${cardId}`, {
        assigneeUserId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      })
      revalidatePath('/dashboard')
      return true
    }

    await api.put(`/cards/${cardId}`, {
      assigneeUserId,
      columnId,
      title,
      description,
      dueDate,
      tags,
    })
    revalidatePath('/dashboard')

    return true
  } catch (error) {
    console.log(error)
    return null
  }
}
