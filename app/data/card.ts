import { api } from '@/lib/utils'
import { CardIdModel, CardsResponse } from '@/type'

export const getCards = async (columnId: number) => {
  try {
    const response = await api.get<CardsResponse>(`/cards?columnId=${columnId}`)
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getCardById = async ({ cardId }: { cardId: number }) => {
  try {
    const response = await api.get<CardIdModel>(`/cards/${cardId}`)
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
