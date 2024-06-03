import { api } from '@/lib/utils' // Adjust the path as necessary

interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

interface FetchDashboardsResponse {
  cursorId: number
  totalCount: number
  dashboards: Dashboard[]
}

export async function fetchDashboards(
  navigationMethod: 'infiniteScroll' | 'pagination',
  page: number = 1,
  cursorId?: number,
  size: number = 5,
): Promise<FetchDashboardsResponse> {
  const url = `/dashboards`
  const params = {
    navigationMethod,
    cursorId,
    page,
    size,
  }
  try {
    const response = await api.get<FetchDashboardsResponse>(url, { params })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch dashboards: ${error}`)
  }
}
