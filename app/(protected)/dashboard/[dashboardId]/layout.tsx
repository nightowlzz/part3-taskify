import { getCurrentUser } from '@/app/data/user'
import { Navbar } from './_component/navbar'
import { redirect } from 'next/navigation'
import { getDashboardById, getDashboardMembers } from '@/app/data/dashboard'

type Props = {
  children: React.ReactNode
  params: { dashboardId: string }
}

const DashboardIdPageLayout = async ({ children, params }: Props) => {
  const dashboardId = Number(params.dashboardId)

  const dashboardDetails = await getDashboardById(dashboardId)
  const user = await getCurrentUser()
  const members = await getDashboardMembers(dashboardId)

  if (!members) return <div>대시보드 맴버 패치 실패</div>
  if (dashboardDetails === null) return <div>대시보드 조회 실패</div>
  if (!user) return redirect('/sign-in')

  return (
    <div className='flex h-full flex-col'>
      <Navbar
        dashboardId={dashboardId}
        title={dashboardDetails.title}
        isOwner={dashboardDetails.createdByMe}
        username={user.nickname}
        userImg={user.profileImageUrl}
        members={members.members}
      />
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default DashboardIdPageLayout
