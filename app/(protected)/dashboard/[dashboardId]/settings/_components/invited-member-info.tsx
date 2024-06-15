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
    <div className='flex flex-col rounded-lg bg-white p-8'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>초대 내역</h2>
        <div className='flex items-center gap-x-3'>
          <div>
            <span>1 / 1</span>
          </div>
          <div>
            <Button className='px-2' variant={'outline'}>
              <ChevronLeft />
            </Button>
            <Button className='px-2' variant={'outline'}>
              <ChevronRight />
            </Button>
          </div>
          <InvitedButton dashboardId={dashboardId} />
        </div>
      </div>
      <span className='my-6 text-muted-foreground'>이메일</span>
      {invitations.map((invitation) => (
        <div key={invitation.id} className='flex justify-between border-b py-4'>
          <span>{invitation.invitee.email}</span>
          <Button
            onClick={() => onCancel(invitation.id)}
            className='px-8'
            variant={'outline'}
          >
            취소
          </Button>
        </div>
      ))}
    </div>
  )
}
