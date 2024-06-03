'use client'

import React from 'react'
import Link from 'next/link'
import { fetchDashboards } from '../_utils/fetch-dashboards'

const NewDashboardButton: React.FC = () => {
  const id : number = 1;

  return (
    <Link
      className='
        ml-[13px] mt-[10px] flex h-[58px] w-[260px]
        items-center justify-center 
        gap-[10px] rounded-lg 
        border border-gray_dark3 bg-white 
        shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[68px] 
        md:w-[247px] xl:h-[70px] xl:w-[332px]
      '
	  href={`/dashboard/${id}`}
    >
    </Link>
  )
}

export default NewDashboardButton
