'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import TaskCreate from '../task-create'
import { IColumnDashboardId } from '../types/modal-type'

// 추 후 삭제예정[파일]
export const TaskCreactButton = ({
  dashboardId,
  columnId,
}: IColumnDashboardId) => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='bg-violet_light p-3'>
        할 일 카드 생성
      </AlertDialogTrigger>
      <TaskCreate
        dashboardId={dashboardId}
        columnId={columnId}
        setOpen={setOpen}
      />
    </AlertDialog>
  )
}
