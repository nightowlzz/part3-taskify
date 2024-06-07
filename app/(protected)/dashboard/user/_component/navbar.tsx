import { UserButton } from '@/components/user-button'
import { User } from '@/type'

type Props = {
  user: User
}

export const Navbar = ({ user }: Props) => {
  return (
    <nav className='flex h-14 items-center justify-between border-b px-10'>
      <span className='text-sm font-bold'>계정 관리</span>
      <UserButton
        firstName={user.nickname[0]}
        nickname={user.nickname}
        profileImageUrl={user.profileImageUrl}
      />
    </nav>
  )
}
