'use server'

import { api } from '@/lib/utils'

type UpdateUserProp = {
  nickname: string
  formData?: FormData
}

export const updateUser = async ({
  nickname,
  formData,
}: UpdateUserProp): Promise<boolean> => {
  try {
    if (formData) {
      const res = await api.post<{ profileImageUrl: string }>(
        '/users/me/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      const profileImageUrl = res.data.profileImageUrl
      await api.put('/users/me', { nickname, profileImageUrl })
      return true
    }
    await api.put('/users/me', { nickname })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

type UpdatePasswordProps = {
  password: string
  newPassword: string
}
export const updatePassword = async ({
  password,
  newPassword,
}: UpdatePasswordProps) => {
  await api.put('/auth/password', { password, newPassword })
}
