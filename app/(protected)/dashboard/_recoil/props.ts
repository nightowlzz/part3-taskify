export interface DashboardProps {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

export interface DashboardListProps {
  cursorId: number
  dashboards: DashboardProps[]
  totalCount: number
}
