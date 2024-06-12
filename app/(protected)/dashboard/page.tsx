'use client'

import React, { useState, useEffect } from 'react'
import CreateDashboard from './_components/create-dashboard'
import DashboardCta from './_components/dashboardCta'
import { fetchDashboards } from './_api-wrapper/fetch-dashboards'
import InvitationDashboard from './_components/invitation'
import PageNation from './_components/pagenation'

interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

const DashboardPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isActiveBack, setIsActiveBack] = useState(false)
  const [isActiveForward, setIsActiveForward] = useState(false)

  useEffect(() => {
    const loadDashboards = async () => {
      try {
        const data = await fetchDashboards(page, 5, 'pagination')
        setDashboards(data.dashboards)
        setTotalPages(Math.ceil(data.totalCount / 5))
        console.log(totalPages)
        setIsActiveBack(page > 1)
        setIsActiveForward(data.totalCount > page * 5)
      } catch (error) {
        console.error('Failed to fetch dashboards:', error)
      }
    }

    loadDashboards()
  }, [page])

  const handlePageNation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setPage(page - 1)
    } else if (direction === 'forward') {
      setPage(page + 1)
    }
  }

  return (
    <main>
      <div
        className='ml-[13px] mt-[10px] grid auto-rows-auto grid-cols-1 gap-y-[8px] 
       md:w-[504px] md:grid-cols-2 md:gap-x-[10px] md:gap-y-[10px] 
       xl:w-[1024px] xl:grid-cols-3 xl:gap-x-[13px] xl:gap-y-[10px] '
      >
        <CreateDashboard mode={'main'} />
        {dashboards.map((dashboard) => (
          <DashboardCta
            key={dashboard.id}
            id={dashboard.id}
            color={dashboard.color}
            createdByMe={dashboard.createdByMe}
            title={dashboard.title}
          />
        ))}
      </div>
      <div className='w-[200px] ml-auto flex items-center gap-3'>
        <span
          className='flex w-full text-[0.75rem] md:text-[0.875rem]'
        >
          {totalPages} 페이지 중 {page}
        </span>
        <PageNation
          size='small'
          isActiveBack={isActiveBack}
          isActiveForward={isActiveForward}
          onClickBack={() => handlePageNation('back')}
          onClickForward={() => handlePageNation('forward')}
        />
      </div>
      <InvitationDashboard setDashboards={setDashboards} page={page} />
    </main>
  )
}
