import { api } from '@/lib/utils'
import { LogoutButton } from './logout-button'

export const Navbar = async () => {
  const user = await api.get('/users/me')
  // console.log(user.data)

  return (
    <nav className='flex h-14 items-center justify-between border-b px-10'>
      <span className='text-sm font-bold'>내 대시보드</span>
      <LogoutButton />
    </nav>
  )
}
