import { api } from '@/lib/utils'
import { User } from '@/type'

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/users/me')
    const user = response.data
    return user
  } catch (error) {
    return null
  }
}
