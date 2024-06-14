'use server'

import { api } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const createColumn = async ({
  title,
  dashboardId,
}: {
  title: string
  dashboardId: number
}) => {
  try {
    await api.post(`/columns`, { title, dashboardId })

    revalidatePath('/dashboard')
    return true
  } catch (error) {
    return null
  }
}

export const editColumn = async ({
  columnId,
  title,
}: {
  columnId: number
  title: string
}) => {
  try {
    await api.put(`/columns/${columnId}`, { title })

    revalidatePath('/dashboard/[dashboardId]', 'page')
    return true
  } catch (error) {
    return null
  }
}

export const deleteColumn = async (columnId: number) => {
  try {
    await api.delete(`/columns/${columnId}`)

    revalidatePath('/dashboard/[dashboardId]', 'page')
    return true
  } catch (error) {
    return null
  }
}
