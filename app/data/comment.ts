import { api } from '@/lib/utils'
import { CommentsByCardIdResponse } from '@/type'

export const getComments = async ({ cardId }: { cardId: number }) => {
  try {
    const response = await api.get<CommentsByCardIdResponse>(
      `/comments?cardId=${cardId}`,
    )
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
