import { FieldValues } from 'react-hook-form'
import { api } from '@/lib/utils'

export async function updateColumn(data: FieldValues, columnId: number) {
  try {
    const res = await api.put(`columns/${columnId}`, {
      ...data,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
