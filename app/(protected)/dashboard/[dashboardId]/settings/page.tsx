import { getDashboardById, getInvitations } from '@/app/data/dashboard'
import { getCurrentUser } from '@/app/data/user'
import { BackButton } from '@/components/back-button'
import { redirect } from 'next/navigation'
import { DashboardInfo } from './_components/dashboard-info'
import { DashboardMembers } from './_components/dashbaord-members'
import { InvitedMemberInfo } from './_components/invited-member-info'
import { DeleteDashboardButton } from './_components/delete-dashboard-button'
import { PageContainer } from '@/components/page-container'

type Props = {
  params: { dashboardId: string }
}

const DashboardSettingPage = async ({ params }: Props) => {
  const dashboardId = Number(params.dashboardId)
  const dashboardDetails = await getDashboardById(dashboardId)
  const invitedMemberRes = await getInvitations(dashboardId)
  const user = await getCurrentUser()

  if (!user) return redirect('/sign-in')
  if (!dashboardId) return <div>대시보드 id가 없습니다.</div>
  if (!dashboardDetails) return <div>대시보드 패치 실패</div>
  if (!invitedMemberRes) return <div>초대 맴버 패치 실패</div>

  return (
    <div className='min-h-screen bg-stone-100 pt-16'>
      <div className='w-full space-y-5 px-5 py-4 md:py-8 xl:max-w-2xl'>
        <BackButton href={`/dashboard/${params.dashboardId}`} />
        <DashboardInfo
          id={dashboardId}
          title={dashboardDetails.title}
          selectedColor={dashboardDetails.color}
        />
        <DashboardMembers dashboardId={dashboardId} />
        <InvitedMemberInfo
          dashboardId={dashboardId}
          invitations={invitedMemberRes.invitations}
        />
        <DeleteDashboardButton
          dashboardId={dashboardId}
          isShow={user!.id === dashboardDetails.userId}
        />
      </div>
    </div>
  )
}

export default DashboardSettingPage
