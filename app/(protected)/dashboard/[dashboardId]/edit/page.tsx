'use client'

import {
  Dashboard,
  fetchDashboardId,
} from '@/app/_api-wrapper/fetch-dashboards'
import EditCard from '@/components/edit-card/editCard-layout'

import { useState, useEffect } from 'react'

interface EditBoardPageProps {
  boardId: number
}

export default function EditBoardPage({ boardId }: EditBoardPageProps) {
  const [dashboard, setDashboard] = useState<Dashboard>()

  useEffect(() => {
    const getDashboard = async () => {
      const fetchedDashboard = await fetchDashboardId(Number(boardId))
      setDashboard(fetchedDashboard)
    }

    getDashboard()
  }, [boardId])

  return (
    <div className='bg-gray_light'>
      {dashboard ? (
        <EditCard dashboard={dashboard} dashboardId={boardId} />
      ) : (
        <span>404</span>
      )}
    </div>
  )
}
