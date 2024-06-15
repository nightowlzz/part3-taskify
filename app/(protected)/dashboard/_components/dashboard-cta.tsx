'use client'

import React from 'react'
import Link from 'next/link'
import { FaChevronRight, FaCrown } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

type Props = {
  dashboardId: number
  color: string
  createdByMe: boolean
  title: string
}

const DashboardCta = ({ dashboardId, color, createdByMe, title }: Props) => {
  return (
    <Button asChild variant={'outline'} className='flex h-16 w-full'>
      <Link
        href={`/dashboard/${dashboardId}`}
        className='flex flex-1 items-center justify-between'
      >
        <div className='flex items-center gap-x-2 overflow-hidden'>
          <div className='rounded-full p-1' style={{ background: color }} />
          <span className='truncate'>{title}</span>
          {createdByMe && (
            <FaCrown className='h-6 w-6 flex-shrink-0 text-yellow-500' />
          )}
        </div>
        <FaChevronRight className='h-4 w-4 flex-shrink-0' />
      </Link>
    </Button>
  )
}

export default DashboardCta
