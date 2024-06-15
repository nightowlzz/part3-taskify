import { getCurrentUser } from '@/app/data/user'
import { ChangePassword } from './_component/change-password'
import { Profile } from './_component/profile'
import { BackButton } from '@/components/back-button'
import { PageContainer } from '@/components/page-container'
import { redirect } from 'next/navigation'

const UserPage = async () => {
  const user = await getCurrentUser()

  if (user === null) return redirect('/sign-in')

  return (
    <PageContainer>
      <div className='mt-12 w-full space-y-4 px-4 xl:max-w-3xl'>
        <BackButton href='/dashboard' />
        <Profile
          name={user.nickname}
          email={user.email}
          ImgUrl={user.profileImageUrl}
        />
        <ChangePassword />
      </div>
    </PageContainer>
  )
}

export default UserPage
