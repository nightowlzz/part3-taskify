import {
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import React from 'react'

export const ModalHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialogHeader>
      <AlertDialogTitle className='pb-6 sm:text-2xl md:pb-8'>
        {children}
      </AlertDialogTitle>
    </AlertDialogHeader>
  )
}
