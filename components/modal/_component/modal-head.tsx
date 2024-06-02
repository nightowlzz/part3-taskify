import { DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@/components/ui/dialog'
import React from 'react'

export const ModalHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogHeader>
      <DialogTitle className='pb-6 sm:text-2xl md:pb-8'>{children}</DialogTitle>
    </DialogHeader>
  )
}
