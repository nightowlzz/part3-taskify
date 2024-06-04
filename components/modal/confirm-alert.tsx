'use client'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import React from 'react'

export const ConfirmAlert = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
        <div className='flex items-center justify-center pb-[26px] pt-[49px] text-lg font-medium md:pb-[13px] md:pt-[70px]'>
          {children}
        </div>
        <AlertDialogFooter className='flex w-full gap-3 bg-white pt-6 md:justify-end md:pt-7'>
          <AlertDialogCancel className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'>
            취소
          </AlertDialogCancel>
          <AlertDialogAction className='h-10 w-full bg-violet md:h-12 md:w-[120px]'>
            수정
          </AlertDialogAction>
        </AlertDialogFooter>
      </div>
    </AlertDialogContent>
  )
}
