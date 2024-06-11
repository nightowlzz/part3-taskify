'use client'

import React, { useState, useEffect } from 'react'
import CreateDashboard from './_components/create-dashboard'
import FetchDashboardBtn from './_components/api_test/fetch-dashboard-btn'
import DashboardCta from './_components/dashboardCta'
import { fetchDashboards } from './_api-wrapper/fetch-dashboards'

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

  useEffect(() => {
    const loadDashboards = async () => {
      try {
        const data = await fetchDashboards('pagination', page, 5)
        setDashboards(data.dashboards)
        setTotalPages(Math.ceil(data.totalCount / 5))
      } catch (error) {
        console.error('Failed to fetch dashboards:', error)
      }
    }

    loadDashboards()
  }, [page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
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
      <div className='flex justify-between mt-4'>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <FetchDashboardBtn />
    </main>
  )
}
