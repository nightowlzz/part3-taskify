'use client'
import { DialogContent } from '@/components/ui/dialog'
import { z } from 'zod'
import { ModalFoot } from './modal-foot'
import React from 'react'
import { modalType } from '../modal-layout'

export const Alert = ({ children, confirmText }: modalType) => {
  return (
    <DialogContent>
      <div className='px-7 py-7 md:py-8'>
        <div className='flex items-center justify-center pb-[26px] pt-[49px] text-lg font-medium md:pb-[13px] md:pt-[70px]'>
          {children}
        </div>
        <ModalFoot confirmText={confirmText} />
      </div>
    </DialogContent>
  )
}
