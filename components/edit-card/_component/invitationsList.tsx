import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PaginationBtn } from '@/components/ui/pagination'
import { EditCardProps } from '../editCard-layout'
import { useState, useEffect } from 'react'
import {
  fetchInvitees,
  Invitations,
} from '@/app/(protected)/dashboard/_utils/fetch-invitees'
import { deleteInvitee } from '@/app/(protected)/dashboard/_utils/delete-invitee'

const InvitationsList: React.FC<EditCardProps> = ({ dashboardId }) => {
  const [invitations, setInvitations] = useState<Invitations[]>([])

  useEffect(() => {
    const getInvitaions = async () => {
      try {
        if (dashboardId) {
          const data = await fetchInvitees(dashboardId)
          setInvitations(data.invitations)
        }
      } catch (error) {
        console.error('Error fetching members:', error)
      }
    }

    getInvitaions()
  }, [dashboardId])

  const handleDelete = async (invitationId: number) => {
    try {
      if (dashboardId) {
        await deleteInvitee(dashboardId, invitationId)
        setInvitations(
          invitations.filter((invite) => invite.id !== invitationId),
        )
      }
    } catch (error) {
      console.error('Error deleting invitation:', error)
    }
  }

  return (
    <Card className='mt-3'>
      <span className='text-2xl font-bold'>초대 내역</span>
      <div className='flex justify-end'>
        <PaginationBtn />
        <Button variant='p_btn'>초대하기</Button>
      </div>
      <span>이메일</span>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id} className='flex items-center justify-between'>
            <span>{invitation.invitee.email}</span>
            <Button
              variant='w_btn'
              size='dele'
              onClick={() => handleDelete(invitation.id)}
            >
              취소
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default InvitationsList
