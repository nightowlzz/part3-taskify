'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { Plus } from 'lucide-react'
import { InviteModalContent } from '@/components/invite-modal-content'
import { useState } from 'react'

type Props = {
  dashboardId: number
}

export const InvitedButton = ({ dashboardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className='flex gap-x-2'>
          <Plus className='h-5 w-5' />
          <span>초대하기</span>
        </Button>
      </AlertDialogTrigger>

      <InviteModalContent dashboardId={dashboardId} />
    </AlertDialog>
  )
}
