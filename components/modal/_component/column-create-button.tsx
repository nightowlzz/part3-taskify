'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import ColumnAdd from '../column-add'

export const ColumnCreactButton = ({
  dashboardId,
}: {
  dashboardId: number
}) => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='w-[200px] bg-orange p-3'>
        새로 컬럼 추가
      </AlertDialogTrigger>
      <ColumnAdd dashboardId={dashboardId} setOpen={setOpen} />
    </AlertDialog>
  )
}
