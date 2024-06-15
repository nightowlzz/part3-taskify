import { api } from '@/lib/utils'

export async function deleteColumn(columnId: number) {
  try {
    const res = await api.delete(`columns/${columnId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
