'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import ColumnAdd from '../column-add'
import TaskCardCreate from '../task-create copy'

export const TaskCreactButton = ({ dashboardId }: { dashboardId: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger className='bg-violet_light p-3'>
        할 일 카드 생성
      </AlertDialogTrigger>
      <TaskCardCreate dashboardId={Number(dashboardId)} />
    </AlertDialog>
  )
}
