import React from 'react'
import { FaCrown } from 'react-icons/fa'
import Link from 'next/link'
interface DashboardItemProps {
  id: Number
  title: string
  color: string
  isOwner: boolean
}

const SidebarCta: React.FC<DashboardItemProps> = ({
  id,
  title,
  color,
  isOwner,
}) => {
  return (
    <Link
      className='ml-5 flex h-[40px] w-[40px] items-center justify-center p-0 hover:bg-accent hover:text-accent-foreground md:ml-0 md:h-[43px] md:w-[134px] md:justify-between xl:ml-0 xl:h-[45px] xl:w-[276px] xl:justify-between xl:px-[12px]'
      href={`/dashboard/${id}`}
    >
      <div
        className={`h-3 w-3 rounded-full`}
        style={{ backgroundColor: color }}
      />
      <div className='w-0 md:w-[90px] xl:w-[220px] truncate'>{title}</div>
      {isOwner && <FaCrown className='text-yellow-500 w-0 h-0 md:w-4 md:h-4 xl:w-4 xl:h-4' />}
    </Link>
  )
}

export default SidebarCta
