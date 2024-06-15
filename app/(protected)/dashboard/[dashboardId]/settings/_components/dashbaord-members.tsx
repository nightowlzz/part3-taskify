import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MemberInfo } from './member-info'
import { getDashboardMembers } from '@/app/data/dashboard'

type Props = {
  dashboardId: number
}

export const DashboardMembers = async ({ dashboardId }: Props) => {
  const memberRes = await getDashboardMembers(dashboardId)
  if (!memberRes) return <div>대시보드 맴버 에러</div>

  return (
    <div className='flex flex-col rounded-lg bg-white p-8'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>구성원</h2>
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
        </div>
      </div>
      <span className='my-6 text-muted-foreground'>이름</span>
      {memberRes.members.map((member) => (
        <MemberInfo
          key={member.id}
          memberId={member.id}
          userImgUrl={member.profileImageUrl}
          username={member.nickname}
          isOwner={member.isOwner}
        />
      ))}
    </div>
  )
}
