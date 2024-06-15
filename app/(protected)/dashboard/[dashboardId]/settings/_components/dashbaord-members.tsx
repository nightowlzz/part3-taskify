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
    <div className='flex flex-col rounded-lg bg-white p-6 md:p-8'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>구성원</h2>
        <div className='flex flex-col items-center justify-center gap-x-3 md:flex-row'>
          <div>
            <span>1 / 1</span>
          </div>
          <div className='pt-2 md:pt-0'>
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
        </div>
      </div>
      <span className='my-3 text-muted-foreground md:my-6'>이름</span>
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
