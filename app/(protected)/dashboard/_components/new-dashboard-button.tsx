'use client'

import React from 'react'

const NewDashboardButton: React.FC = () => {
  const handleClick = () => {
    console.log('button')
  }

  return (
    <button
      className='
        border-gray_dark3 flex h-[58px]
        w-[260px] items-center 
        justify-center gap-[10px] 
        rounded-lg border bg-white 
        shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[68px] 
        md:w-[247px] xl:h-[70px] xl:w-[332px]
      '
      onClick={handleClick}
    >
      <span className='text-black_light_2'>새로운 대시보드</span>
      <span className='text-violet bg-violet_light rounded px-1'>+</span>
    </button>
  )
}

export default NewDashboardButton
