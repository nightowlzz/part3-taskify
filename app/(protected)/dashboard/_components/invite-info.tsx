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
    <div className='flex flex-col items-start border-b py-4 md:grid md:grid-cols-3 md:flex-row md:items-center'>
      <div className='flex'>
        <span className='block w-[60px] text-[#aaa] md:hidden md:w-0'>
          이름
        </span>
        {title}
      </div>
      <span className='mt-2 flex md:mt-0'>
        <span className='block w-[60px] text-[#aaa] md:hidden md:w-0'>
          초대자
        </span>
        {nickname}
      </span>
      <div className='mt-6 flex w-full space-x-3 md:mt-0 md:block md:w-auto'>
        <Button onClick={onAccept} className='h-7 flex-1 md:h-8 md:w-[80px]'>
          수락
        </Button>
        <Button
          onClick={onCancel}
          className='h-7 flex-1 md:h-8 md:w-[80px]'
          variant={'outline'}
        >
          취소
        </Button>
      </div>
    </div>
  )
}
