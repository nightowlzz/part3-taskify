import { getCurrentUser } from '@/app/api/user'
import { ChangePassword } from './_component/change-password'
import { Profile } from './_component/profile'
import { BackButton } from '@/components/back-button'

const UserPage = async () => {
  const user = await getCurrentUser()

  if (user === null)
    throw new Error('현재 로그인이 되어있지 않습니다. 로그인을 해주세요.')

  return (
    <main className='min-h-full bg-stone-100 p-3 '>
      <div className='w-full space-y-4 xl:max-w-2xl'>
        <BackButton href='/dashboard' />
        <Profile
          name={user.nickname}
          email={user.email}
          ImgUrl={user.profileImageUrl}
        />
        <ChangePassword />
      </div>
    </main>
  )
}

export default UserPage
