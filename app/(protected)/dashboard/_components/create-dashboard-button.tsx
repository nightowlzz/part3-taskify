import { CreateDashboardModal } from '@/components/create-dashboard-modal'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const CreateDashboardButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} className='h-16 space-x-2'>
          <span>새로운 대시보드</span>
          <Plus className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <CreateDashboardModal />
    </AlertDialog>
  )
}
