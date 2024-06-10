import React from 'react'
import { FaCrown } from 'react-icons/fa'
import Link from 'next/link'
import classNames from 'classnames'

interface DashboardItemProps {
  id: number
  title: string
  color: string
  isOwner: boolean
  isSelected?: boolean
}

const SidebarCta: React.FC<DashboardItemProps> = ({
  id: boardid,
  title,
  color,
  isOwner,
  isSelected,
}) => {
  return (
    <Link
      className={classNames(
        'ml-5 flex h-[40px] w-[40px] items-center justify-center p-0 hover:bg-accent hover:text-accent-foreground md:ml-0 md:h-[43px] md:w-[134px] md:justify-between xl:ml-0 xl:h-[45px] xl:w-[276px] xl:justify-between xl:px-[12px]',
        { 'bg-violet_light': isSelected },
      )}
      href={`/dashboard/${boardid}`}
    >
      <div
        className={`h-3 w-3 rounded-full`}
        style={{ backgroundColor: color }}
      />
      <div className='w-0 truncate md:w-[90px] xl:w-[220px]'>{title}</div>
      {isOwner && (
        <FaCrown className='h-0 w-0 text-yellow-500 md:h-4 md:w-4 xl:h-4 xl:w-4' />
      )}
    </Link>
  )
}

export default SidebarCta
