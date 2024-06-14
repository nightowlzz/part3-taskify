'use client'

import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  dashboardId: number
  title: string
  color: string
  isOwner: boolean
}

const SidebarCta = ({ dashboardId, title, color, isOwner }: Props) => {
  const params = useParams()
  const isSelected = params.dashboardId
    ? params.dashboardId === dashboardId.toString()
    : false

  return (
    <Button
      variant={'ghost'}
      asChild
      className={cn(
        'flex w-full items-center md:justify-start',
        isSelected && 'bg-slate-100',
      )}
    >
      <Link href={`/dashboard/${dashboardId}`}>
        <div
          className={`rounded-full p-1`}
          style={{ backgroundColor: color }}
        />
        <div className='ml-2 hidden truncate text-base md:block'>{title}</div>
        {isOwner && (
          <FaCrown className='ml-auto hidden min-h-5 min-w-5 text-yellow-500 md:block' />
        )}
      </Link>
    </Button>
  )
}

export default SidebarCta
