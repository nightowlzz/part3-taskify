import { getCurrentUser } from '@/app/data/user'
import { redirect } from 'next/navigation'
import { getDashboardById, getDashboardMembers } from '@/app/data/dashboard'
import { Navbar } from './_components/navbar'

type Props = {
  children: React.ReactNode
  params: { dashboardId: string }
}

const DashboardIdLayout = async ({ children, params }: Props) => {
  const dashboardId = Number(params.dashboardId)

  const dashboardDetails = await getDashboardById(dashboardId)
  const user = await getCurrentUser()
  const members = await getDashboardMembers(dashboardId)

  if (!members) return <div>대시보드 맴버 패치 실패</div>
  if (dashboardDetails === null) return <div>대시보드 조회 실패</div>
  if (!user) return redirect('/sign-in')

  return (
    <>
      <Navbar
        dashboardId={dashboardId}
        title={dashboardDetails.title}
        isOwner={dashboardDetails.createdByMe}
        username={user.nickname}
        userImg={user.profileImageUrl}
        members={members.members}
      />
      <div className='h-screen pl-[67px] md:pl-[160px] xl:pl-[300px]'>
        {children}
      </div>
    </>
  )
}

export default DashboardIdLayout
