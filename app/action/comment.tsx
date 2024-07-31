'use server'

import { api } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const createComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: {
  content: string
  cardId: number
  columnId: number
  dashboardId: number
}) => {
  try {
    const response = await api.post('/comments', {
      content,
      cardId,
      columnId,
      dashboardId,
    })
    const data = response.data
    revalidatePath('/dashboard/[dashboardId]', 'page')
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number
  content: string
}) => {
  try {
    const response = await api.put(`/comments/${commentId}`, { content })
    revalidatePath('/dashboard/[dashboardId]', 'page')
    return true
  } catch (error) {
    return false
  }
}

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  try {
    const response = await api.delete(`/comments/${commentId}`)
    revalidatePath('/dashboard/[dashboardId]', 'page')
    return true
  } catch (error) {
    return null
  }
}
