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
        <Button className='flex h-7 w-[80px] gap-x-2 md:h-10 md:w-auto'>
          <Plus className='hidden h-5 w-5 md:block' />
          <span>초대하기</span>
        </Button>
      </AlertDialogTrigger>

      <InviteModalContent dashboardId={dashboardId} />
    </AlertDialog>
  )
}
