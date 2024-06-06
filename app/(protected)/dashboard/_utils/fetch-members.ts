import { api } from '@/lib/utils'

export interface Member {
  id: number
  useId: number
  email: string
  nickname: string
  profileImageUrl: string
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

interface FetchMembersResponse {
  members: Member[]
  totalCount: number
}

export async function fetchMembers(
  dashboardId: string,
): Promise<FetchMembersResponse> {
  const url = `/members?dashboardId=${dashboardId}`
  try {
    const response = await api.get<FetchMembersResponse>(url)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch members: ${error}`)
  }
}
