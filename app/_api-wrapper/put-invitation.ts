import { api } from '@/lib/utils'

export async function putInvitation(invitationId: number, accepted: boolean) {
  try {
    const res = await api.put(`invitations/${invitationId}`, {
      inviteAccepted: accepted,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
