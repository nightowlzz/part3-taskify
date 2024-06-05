import { api } from '@/lib/utils'

export async function deleteColumn(columnId: number): Promise<void> {
  const url = `/columns/${columnId}`

  try {
    await api.delete(url)
  } catch (error) {
    throw new Error(`Failed to delete column: ${error}`)
  }
}
