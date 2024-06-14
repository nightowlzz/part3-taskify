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
