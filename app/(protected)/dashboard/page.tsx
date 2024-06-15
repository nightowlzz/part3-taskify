import { PageContainer } from '@/components/page-container'
import DashboardCta from './_components/dashboard-cta'
import { getDashboards } from '@/app/data/dashboard'
import { getCurrentUser } from '@/app/data/user'
import { redirect } from 'next/navigation'
import { CreateDashboardButton } from './_components/create-dashboard-button'
import { PaginationButtons } from './_components/pagination-buttons'
import { getDashboardInvitations } from '@/app/data/invitation'
import { SearchBar } from './_components/search-bar'
import { ResultLabels } from './_components/result-labels'
import { InviteInfo } from './_components/invite-info'
import { Navbar } from './_components/navbar'
import { EmptyInvite } from './_components/empty-invite'

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  console.log('searchParams', searchParams)
  const currentPage = Number(searchParams?.page) || 1
  const search = searchParams?.search || ''
  const size = 5

  const dashboardRes = await getDashboards({ page: currentPage, size })
  const user = await getCurrentUser()
  const invitations = await getDashboardInvitations(search)

  if (dashboardRes === null) return <div>대시보드를 가져오는 중에 오류발생</div>
  if (user === null) return redirect('/sign-in')
  if (!invitations) return <div>초대 리스트 가져오는 중에 오류발생</div>

  const dashboards = dashboardRes.dashboards
  const maxPage = Math.max(1, Math.ceil(dashboardRes.totalCount / size))

  return (
    <>
      <Navbar userImg={user.profileImageUrl} username={user.nickname} />
      <PageContainer>
        <div className='mt-6 max-w-7xl px-6 md:mt-14 md:px-8'>
          <section>
            <div className='grid w-full grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3'>
              <CreateDashboardButton />
              {dashboards.map((dashboard) => (
                <DashboardCta
                  key={dashboard.id}
                  dashboardId={dashboard.id}
                  color={dashboard.color}
                  createdByMe={dashboard.createdByMe}
                  title={dashboard.title}
                />
              ))}
            </div>
            <PaginationButtons currentPage={currentPage} maxPage={maxPage} />
          </section>
          <section className='scrollbar-hide mt-10 h-[500px] space-y-5 overflow-y-scroll rounded-lg bg-white px-5 py-8'>
            <h1 className='text-lg font-bold md:text-2xl'>초대받은 대시보드</h1>
            <SearchBar />
            <ResultLabels />
            {invitations.invitations.map((invitation) => (
              <InviteInfo
                key={invitation.id}
                id={invitation.id}
                title={invitation.dashboard.title}
                nickname={invitation.inviter.nickname}
              />
            ))}
          </section>
        </div>
      </PageContainer>
    </>
  )
}

export default DashboardPage
