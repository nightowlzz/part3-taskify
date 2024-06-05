'use client'

import React from 'react'
import { fetchDashboards } from '../../_api-wrapper/fetch-dashboards'

const FetchDashboardBtn = () => {
  const handleClick = async () => {
    try {
      const data = await fetchDashboards('infiniteScroll')
      console.log('Fetched dashboards:', data)
    } catch (error) {
      console.error('Error fetching dashboards:', error)
    }
    console.log('button')
  }

  return (
    <button
      className='
        ml-[13px] mt-[10px] flex
        h-[58px] w-[260px] 
        items-center justify-center 
        gap-[10px] rounded-lg border 
        border-gray_dark3 bg-white shadow-sm transition-shadow duration-300 
        hover:shadow-md md:h-[68px] md:w-[247px]
		xl:h-[70px] xl:w-[332px]
      '
      onClick={handleClick}
    >
      <span className='text-black_light_2'>FetchDashboardBtn</span>
      <span className='rounded bg-violet_light px-1 text-violet'>+</span>
    </button>
  )
}

export default FetchDashboardBtn
