import { atom } from 'recoil'
import { DashboardListProps } from './props'

export const dashboardState = atom<DashboardListProps>({
  key: 'dashboard',
  default: {
    cursorId: 0,
    dashboards: [],
    totalCount: 0,
  },
})
