import { api } from '@/lib/utils' // Adjust the path as necessary

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
  title: string,
  color: string,
): Promise<CreateDashboardResponse> {
  const url = `/dashboards`
  const requestBody = {
    title,
    color,
  }
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
