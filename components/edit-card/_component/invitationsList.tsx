import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EditCardProps } from '../editCard-layout'
import { useState, useEffect } from 'react'
import {
  fetchInvitees,
  Invitations,
} from '@/app/(protected)/dashboard/_api-wrapper/fetch-invitees'
import { deleteInvitee } from '@/app/(protected)/dashboard/_api-wrapper/delete-invitee'
import { MyPaginationComponent } from '@/components/ui/myPagination'
import Invitation from '@/components/modal/invitation'

const InvitationsList: React.FC<EditCardProps> = ({ dashboardId }) => {
  const [invitations, setInvitations] = useState<Invitations[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const getInvitations = async () => {
      try {
        if (dashboardId) {
          const data = await fetchInvitees(dashboardId)
          setInvitations(data.invitations)
        }
      } catch (error) {
        console.error('Error fetching members:', error)
      }
    }

    getInvitations()
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

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentInvitations = invitations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  )
  const totalPages = Math.ceil(invitations.length / itemsPerPage)

  return (
    <Card className='mt-3 py-8'>
      <div className='mb-4 flex justify-between'>
        <span className='text-2xl font-bold'>초대 내역</span>
        <div className='flex'>
          <MyPaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <Invitation dashboardId={dashboardId} />
        </div>
      </div>
      <span className='text-gray_dark2'>이메일</span>
      <ul>
        {currentInvitations.map((invitation, index) => (
          <li
            key={invitation.id}
            className={`flex items-center justify-between ${
              index !== currentInvitations.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className='py-4'>{invitation.invitee.email}</span>
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
