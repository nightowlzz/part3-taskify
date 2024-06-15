'use client'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import TaskCreate from '../task-create'
import { columnDashboardId } from '../types/modal-type'

export const TaskCreactButton = ({
  dashboardId,
  columnId,
}: columnDashboardId) => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className='
	    border-gray_dark3 flex h-[32px] w-full
	    items-center justify-center
	    gap-[10px] rounded-lg 
    	border bg-white text-[10px] 
	    shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[40px] 
	    md:text-[18px] xl:h-[40px] xl:text-[18px] 
      '
      >
        <span className='h-[24px] w-[24px] rounded bg-violet-200 px-1 leading-5 text-violet-500'>
          +
        </span>
      </AlertDialogTrigger>
      <TaskCreate
        dashboardId={dashboardId}
        columnId={columnId}
        setOpen={setOpen}
      />
    </AlertDialog>
  )
}
