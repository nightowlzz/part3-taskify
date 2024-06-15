import SidebarCta from './sidebar-cta'
import { Logo } from './logo'
import { getDashboards } from '@/app/data/dashboard'
import { CreateDashboardButton } from './create-dashboard-button'
import Link from 'next/link'

const SideBar = async () => {
  const dashboardRes = await getDashboards({ page: 1, size: 100 })
  if (!dashboardRes) return

  const dashboards = dashboardRes.dashboards

  return (
    <div className=' scrollbar-hide fixed z-30 h-screen w-[67px] overflow-y-scroll border-r bg-white md:w-[160px] xl:w-[300px]'>
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className='mt-12'>
        <CreateDashboardButton />
        <div className='mt-4 flex w-full flex-col items-start gap-y-2'>
          {dashboards.map((dashboard) => (
            <SidebarCta
              key={dashboard.id}
              dashboardId={dashboard.id}
              title={dashboard.title}
              color={dashboard.color}
              isOwner={dashboard.createdByMe}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
