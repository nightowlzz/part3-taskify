'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
  currentPage: number
  maxPage: number
}

export const PaginationButtons = ({ currentPage, maxPage }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: URLSearchParams, name: string, value: string) => {
      const newParams = new URLSearchParams(params.toString())
      newParams.set(name, value)
      return newParams.toString()
    },
    [],
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newQueryString = createQueryString(
        searchParams,
        'page',
        `${newPage}`,
      )
      router.push(`${pathname}?${newQueryString}`)
    },
    [createQueryString, searchParams, pathname, router],
  )

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === maxPage
  const prevPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(maxPage, currentPage + 1)

  return (
    <div className='mt-4 flex items-center justify-end gap-x-4'>
      <span>
        {maxPage} 페이지 중 {currentPage}
      </span>
      <div>
        <Button
          variant={'outline'}
          className='p-2'
          disabled={isFirstPage}
          onClick={() => handlePageChange(prevPage)}
        >
          <ChevronLeft className='text-gray-500' />
        </Button>
        <Button
          variant={'outline'}
          className='p-2'
          disabled={isLastPage}
          onClick={() => handlePageChange(nextPage)}
        >
          <ChevronRight className='text-gray-500' />
        </Button>
      </div>
    </div>
  )
}
