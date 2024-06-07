import { api } from '@/lib/utils'

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
  size: number = 1000,
  cursorId?: number,
) {
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

export async function fetchDashboardId(
  dashboardId: number,
): Promise<Dashboard> {
  const url = `/dashboards/${dashboardId}`
  try {
    const response = await api.get<Dashboard>(url)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch dashboard with ID ${id}: ${error}`)
  }
}
