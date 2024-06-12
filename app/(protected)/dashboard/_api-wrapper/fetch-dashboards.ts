import { api } from '@/lib/utils'

export interface Dashboard {
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
  page: number = 1,
  size: number = 1000,
  navigationMethod: 'infiniteScroll' | 'pagination' = 'infiniteScroll',
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
    throw new Error(`Failed to fetch dashboardID: ${error}`)
  }
}
