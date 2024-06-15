import { api } from '@/lib/utils'
import { InvitationResponse2 } from '@/type'

export const getDashboardInvitations = async (title?: string) => {
  try {
    const url = title ? `/invitations?title=${title}` : '/invitations'
    const response = await api.get<InvitationResponse2>(url)
    const data = response.data

    return data
  } catch (error) {
    return null
  }
}
