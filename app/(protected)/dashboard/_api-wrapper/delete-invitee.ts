import { api } from '@/lib/utils'

export async function deleteInvitee(dashboardId: number, invitationId: number) {
  const url = `/dashboards/${dashboardId}/invitations/${invitationId}`
  try {
    await api.delete(url)
  } catch (error) {
    throw new Error(`Failed to delete invitation: ${error}`)
  }
}
