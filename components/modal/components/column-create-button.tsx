'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import ColumnAdd from '../column-add'
import { IColumnDashboardId } from '../types/modal-type'

// 추 후 삭제예정[파일]
export const ColumnCreactButton = ({
  dashboardId,
}: {
  dashboardId: IColumnDashboardId['dashboardId']
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
