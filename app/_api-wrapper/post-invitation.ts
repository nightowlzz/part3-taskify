import { api } from '@/lib/utils'
import { Invitations } from './fetch-invitees'

export async function postInvitation(
  email: string,
  dashboardId?: number,
): Promise<Invitations> {
  const url = `/dashboards/${dashboardId}/invitations`
  const requestBody = {
    email,
  }
  try {
    const response = await api.post<Invitations>(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to post invitation: ${error}`)
  }
}
