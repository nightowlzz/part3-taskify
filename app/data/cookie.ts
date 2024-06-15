'use server'

import { cookies } from 'next/headers'

export const setAccessToken = async (data: string) => {
  cookies().set('accessToken', data)
}

export const getAccessToken = async (): Promise<string | null> => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) return null

  return accessToken.value
}

export const logout = async (): Promise<void> => {
  const cookieStore = cookies()
  cookieStore.delete('accessToken')
}
