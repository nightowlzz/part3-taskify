'use server'

import { api } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

type UpdateDashboardInvitationsProps = {
  invitationId: number
  inviteAccepted: boolean
}

export const updateDashboardInvitations = async ({
  invitationId,
  inviteAccepted,
}: UpdateDashboardInvitationsProps) => {
  try {
    const response = await api.put(`/invitations/${invitationId}`, {
      inviteAccepted,
    })
    const data = response.data

    revalidatePath('/dashboard')

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
