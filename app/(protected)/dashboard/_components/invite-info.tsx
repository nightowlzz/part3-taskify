'use client'

import { updateDashboardInvitations } from '@/app/action/invitation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  id: number
  title: string
  nickname: string
}

export const InviteInfo = ({ id, title, nickname }: Props) => {
  const onAccept = async () => {
    const res = await updateDashboardInvitations({
      invitationId: id,
      inviteAccepted: true,
    })
    if (!res) {
      toast.error('실패')
      return
    }
    toast.success('성공')
  }

  const onCancel = async () => {
    const res = await updateDashboardInvitations({
      invitationId: id,
      inviteAccepted: false,
    })
    if (!res) {
      toast.error('실패')
      return
    }
    toast.success('성공')
  }

  return (
    <div className='grid grid-cols-3 items-center border-b py-4'>
      <div>{title}</div>
      <span>{nickname}</span>
      <div className='space-x-3'>
        <Button onClick={onAccept} size={'lg'}>
          수락
        </Button>
        <Button onClick={onCancel} size={'lg'} variant={'outline'}>
          취소
        </Button>
      </div>
    </div>
  )
}
