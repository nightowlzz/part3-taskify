import { api } from '@/lib/utils' // Adjust the path as necessary

interface CreateDashboardRequest {
  title: string
  color: string
}

interface CreateDashboardResponse {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

export async function createDashboard(
  teamId: string,
  requestBody: CreateDashboardRequest,
): Promise<CreateDashboardResponse> {
  const url = `/${teamId}/dashboards`
  try {
    const response = await api.post<CreateDashboardResponse>(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to create dashboard: ${error}`)
  }
}
