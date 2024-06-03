'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import arrowright from '@/public/arrowright.svg'
import arrowleft from '@/public/arrowleft.svg'

function PaginationBtn() {
  const [page, setPage] = useState<number>(1)

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <span>99 페이지 중 {page}</span>
      <Button variant='outline' size='icon' onClick={handlePrevPage}>
        <Image src={arrowleft} alt='이전 페이지' />
      </Button>
      <Button variant='outline' size='icon' onClick={handleNextPage}>
        <Image src={arrowright} alt='다음 페이지' />
      </Button>
    </div>
  )
}

export { PaginationBtn }
