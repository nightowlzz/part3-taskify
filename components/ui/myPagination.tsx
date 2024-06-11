import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

type MyPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const MyPaginationComponent: React.FC<MyPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className='flex items-center justify-center'>
      <Pagination>
        <PaginationContent>
          <span className='mt-2 text-[14px]'>
            {currentPage} 페이지 중 {totalPages}
          </span>
          <PaginationItem className='ml-4 rounded border'>
            <PaginationPrevious
              onClick={handlePrevious}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem className='rounded border'>
            <PaginationNext
              onClick={handleNext}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
