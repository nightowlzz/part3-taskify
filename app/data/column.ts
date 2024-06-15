import { api } from '@/lib/utils'
import { ColumnResponse } from '@/type'

export const getColumns = async (dashboardId: number) => {
  try {
    const res = await api.get<ColumnResponse>(
      `/columns?dashboardId=${dashboardId}`,
    )
    const data = res.data

    return data
  } catch (error) {
    return null
  }
}
