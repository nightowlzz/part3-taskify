'use client'

import React from 'react'
import Link from 'next/link'
import { FaChevronRight, FaCrown, FaCircle } from 'react-icons/fa'


// color : "#76A5EA"
// createdAt : "2024-06-02T23:13:12.899Z"
// createdByMe : true
// id : 8689
// title : "hi"
// updatedAt : "2024-06-02T23:13:12.899Z"
// userId : 3562

interface DashboardCtaProps {
  id: Number
  color: String
  createdByMe: Boolean
  title: String
}

const DashboardCta: React.FC<DashboardCtaProps> = ({
  id,
  color,
  createdByMe,
  title,
}) => {
  return (
    <Link
      className='
      flex h-[58px] w-[260px]
	  items-center justify-center
	  gap-[10px] rounded-lg 
	  border border-gray_dark3 bg-white 
	  shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[68px] 
	  md:w-[247px] xl:h-[70px] xl:w-[332px] 
      '
      href={`/dashboard/${id}`}
    >
      <div className='flex h-[18px] w-[220px] items-center justify-between md:h-[19px] md:w-[206px] xl:h-[19px] xl:w-[292px] '>
        <div className='gap-3 flex h-[17px] items-center justify-between md:h-[19px] xl:h-[19px]'>
		  <FaCircle className='h-[8px] w-[8px]' style={{ color: color as string }} />
		  <div className='gap-1.5 flex font-semibold text-sm md:text-base xl:text-base h-[17px] items-center justify-between md:h-[19px] xl:h-[19px]'>
			{title}
			{createdByMe && <FaCrown className='text-yellow-500 h-[14px] w-[17.6px]' />}
		  </div>
        </div>
        <FaChevronRight className='h-[18px] w-[18px]' />
      </div>
    </Link>
  )
}

export default DashboardCta
