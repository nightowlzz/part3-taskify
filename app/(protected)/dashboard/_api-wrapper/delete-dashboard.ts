import { api } from '@/lib/utils'

export async function deleteDashboard(dashboardId: number) {
  const url = `/dashboards/${dashboardId}`
  try {
    await api.delete(url)
  } catch (error) {
    throw new Error(`Failed to delete invitation: ${error}`)
  }
}
