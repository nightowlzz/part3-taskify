import { NavContainer } from '@/components/nav-container'
import { UserButton } from '@/components/user-button'

type Props = {
  userImg?: string
  username: string
}

export const Navbar = ({ userImg, username }: Props) => {
  const firstName = username ? username[0] : 'U'

  return (
    <NavContainer>
      <div className='flex h-16 items-center justify-between bg-white px-5 md:px-10'>
        <h1 className='text-lg font-bold'>계정 관리</h1>
        <UserButton firstName={firstName} name={username} imgUrl={userImg} />
      </div>
    </NavContainer>
  )
}
