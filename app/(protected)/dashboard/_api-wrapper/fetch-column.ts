import { api } from '@/lib/utils'

interface FetchColumnsResponse {
  result: string
  data: {
    id: number
    title: string
    teamId: string
    createdAt: string
    updatedAt: string
  }[]
}

export async function fetchColumns(
  dashboardId: number,
): Promise<FetchColumnsResponse> {
  const url = `/columns`
  const params = { dashboardId }

  try {
    const response = await api.get<FetchColumnsResponse>(url, { params })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch columns: ${error}`)
  }
}
