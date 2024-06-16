import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MyPaginationComponent } from '@/components/ui/myPagination'
import { useEffect, useState } from 'react'
import { EditCardProps } from '../editCard-layout'
import { toast } from 'sonner'
import { Member, fetchMembers } from '@/app/_api-wrapper/fetch-members'
import { deleteMember } from '@/app/_api-wrapper/delete-member'

const MembersList: React.FC<EditCardProps> = ({ dashboardId }) => {
  const [members, setMembers] = useState<Member[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    const getMembers = async () => {
      try {
        if (dashboardId) {
          const data = await fetchMembers(dashboardId)
          setMembers(data.members)
        }
      } catch (error) {
        console.error('Error fetching members:', error)
      }
    }

    getMembers()
  }, [dashboardId])

  const handleDelete = async (memberId: number) => {
    try {
      const memberToDelete = members.find((member) => member.id === memberId)
      if (memberToDelete && memberToDelete.isOwner) {
        toast.error('대시보드 생성자입니다')
      } else {
        await deleteMember(memberId)
        setMembers(members.filter((member) => member.id !== memberId))
      }
    } catch (error) {
      throw new Error(`Failed to delete member: ${error}`)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(members.length / itemsPerPage)

  return (
    <Card className='mt-3 py-8'>
      <div className='flex justify-between'>
        <span className='text-2xl font-bold'>구성원</span>
        <MyPaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <span className='text-gray_dark2'>이름</span>
      <ul>
        {currentMembers.map((member, index) => (
          <li
            key={member.id}
            className={`flex items-center justify-between ${
              index !== currentMembers.length - 1 ? 'border-b' : ''
            }`}
          >
            <span>{member.nickname}</span>
            <Button
              variant='w_btn'
              size='dele'
              onClick={() => handleDelete(member.id)}
            >
              삭제
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MembersList
