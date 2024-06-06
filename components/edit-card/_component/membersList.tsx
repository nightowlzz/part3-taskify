import {
  fetchMembers,
  Member,
} from '@/app/(protected)/dashboard/_utils/fetch-members'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PaginationBtn } from '@/components/ui/pagination'
import { useEffect, useState } from 'react'
import { EditCardProps } from '../editCard-layout'
import { api } from '@/lib/utils'

const MembersList: React.FC<EditCardProps> = ({ dashboardId }) => {
  const [members, setMembers] = useState<Member[]>([])

  const handleClickButton = async () => {
    const url = `/members?dashboardId=${dashboardId}`
    try {
      await api.delete(url, {})
    } catch (error) {
      throw new Error(`Failed to delete member: ${error}`)
    }
  }

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

  return (
    <Card className='mt-3'>
      <div className='flex justify-between'>
        <span className='text-2xl font-bold'>구성원</span>
        <PaginationBtn />
      </div>
      <span>이름</span>
      <ul>
        {members.map((member) => (
          <li key={member.id} className='flex items-center justify-between'>
            <span>{member.nickname}</span>
            <Button variant='w_btn' size='dele' onClick={handleClickButton}>
              삭제
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MembersList
