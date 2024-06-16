'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Invitation } from '@/type'
import { revokeDashboardInvite } from '@/app/action/dashboard'
import { toast } from 'sonner'
import { InvitedButton } from './invated-button'

type Props = {
  dashboardId: number
  invitations: Invitation[]
}
export const InvitedMemberInfo = ({ dashboardId, invitations }: Props) => {
  const onCancel = async (invitationId: number) => {
    const res = await revokeDashboardInvite({ dashboardId, invitationId })
    if (res === null) {
      toast.error('삭제 실패')
      return
    }
    toast.success('삭제 성공')
  }

  return (
    <div className='flex flex-col rounded-lg bg-white p-6 md:p-8'>
      <div className='relative flex justify-between'>
        <h2 className='text-xl font-bold'>초대 내역</h2>
        <div className='flex flex-col items-end gap-x-3 md:flex-row md:items-center'>
          <div className='pr-2.5'>
            <span>1 / 1</span>
          </div>
          <div>
            <Button
              className='h-7 w-7 px-2 md:h-10 md:w-10'
              variant={'outline'}
            >
              <ChevronLeft />
            </Button>
            <Button
              className='h-7 w-7 px-2 md:h-10 md:w-10'
              variant={'outline'}
            >
              <ChevronRight />
            </Button>
          </div>
          <div className='absolute left-0 top-8 md:static'>
            <InvitedButton dashboardId={dashboardId} />
          </div>
        </div>
      </div>
      <span className='my-6 text-muted-foreground'>이메일</span>
      {invitations.map((invitation) => (
        <div key={invitation.id} className='flex justify-between border-b py-4'>
          <span>{invitation.invitee.email}</span>
          <Button
            onClick={() => onCancel(invitation.id)}
            className='md:w-100px h-8 w-[52px] p-0'
            variant={'outline'}
          >
            취소
          </Button>
        </div>
      ))}
    </div>
  )
}
