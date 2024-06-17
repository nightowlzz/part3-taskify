'use client'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import React from 'react'

interface IConfirm {
  children: React.ReactNode
  onCancle?: React.MouseEventHandler<HTMLButtonElement>
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
  confirmText: string
  dashboardId?: number
  columnId?: number
}

export const ConfirmAlert = ({
  children,
  onCancle,
  onConfirm,
  confirmText = '확인',
}: IConfirm) => {
  return (
    <AlertDialogContent>
      <div className='py-3 md:py-4'>
        <div className='flex items-center justify-center pb-[26px] pt-[49px] text-lg font-medium md:pb-[13px] md:pt-[70px]'>
          {children}
        </div>
        <AlertDialogFooter className='flex w-full flex-row items-center gap-3 bg-white px-0 pt-6 md:justify-end md:pt-7'>
          <AlertDialogCancel
            className='border-gray_dark3 mt-0 h-10 w-full md:h-12 md:w-[120px]'
            onClick={onCancle}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className='h-10 w-full md:h-12 md:w-[120px]'
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </div>
    </AlertDialogContent>
  )
}
