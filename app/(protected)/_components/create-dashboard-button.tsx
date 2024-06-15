'use client'

import { CreateDashboardModal } from '@/components/create-dashboard-modal'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const CreateDashboardButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='text-gray-500 flex w-full px-4 md:justify-between'
        >
          <span className='hidden text-sm md:block'>Dash Boards</span>
          <Plus className='h-4 w-4 ' />
        </Button>
      </AlertDialogTrigger>
      <CreateDashboardModal />
    </AlertDialog>
  )
}
