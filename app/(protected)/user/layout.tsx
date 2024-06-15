import { getCurrentUser } from '@/app/data/user'
import { Navbar } from './_component/navbar'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

const DashboardIdPageLayout = async ({ children }: Props) => {
  const user = await getCurrentUser()
  if (!user) return redirect('/sign-in')

  return (
    <div className='flex h-full flex-col'>
      <Navbar username={user.nickname} userImg={user.profileImageUrl} />
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default DashboardIdPageLayout
