import { api } from '@/lib/utils'

interface Inviter {
  nickname: string
  email: string
  id: number
}

interface Dashboard {
  title: string
  id: number
}

interface Invitee extends Inviter {}

export interface Invitations {
  id: number
  inviter: Inviter
  teamId: string
  dashboard: Dashboard
  invitee: Invitee
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

interface FetchInviteesResponse {
  totalCount: number
  invitations: Invitations[]
}

export async function fetchInvitees(
  dashboardId: number,
): Promise<FetchInviteesResponse> {
  const url = `/dashboards/${dashboardId}/invitations`
  try {
    const response = await api.get<FetchInviteesResponse>(url)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch members: ${error}`)
  }
}
