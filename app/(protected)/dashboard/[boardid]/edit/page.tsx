'use client'

import { useEffect, useState } from 'react'
import EditCard from '@/components/edit-card/editCard-layout'
import { fetchDashboardId } from '../../_utils/fetch-dashboards'
import { usePathname } from 'next/navigation'
import { Loading } from '@/components/loading'

export interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

export default function EditBoardPage({ boardid = 8689 }) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [dashboardId, setDashboardId] = useState<string | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    const match = pathname.match(/\/dashboard\/(\d+)\/edit/)
    if (match) {
      setDashboardId(match[1])
    }
  }, [pathname])

  useEffect(() => {
    if (boardid) {
      fetchDashboardId(Number(boardid))
        .then((data) => {
          setDashboard(data)
        })
        .catch((err) => {
          throw new Error(`Failed to fetch dashboard with ID ${err}`)
        })
    }
  }, [boardid])

  return (
    <div className='bg-gray_light'>
      {dashboard ? (
        <EditCard dashboard={dashboard} dashboardId={dashboardId} />
      ) : (
        <Loading />
      )}
    </div>
  )
}
