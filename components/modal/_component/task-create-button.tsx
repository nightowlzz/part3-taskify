'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import TaskCreate from '../task-create'

export interface ITackCreate {
  dashboardId: number
  columnId: number
}

export const TaskCreactButton = ({ dashboardId, columnId }: ITackCreate) => {
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
