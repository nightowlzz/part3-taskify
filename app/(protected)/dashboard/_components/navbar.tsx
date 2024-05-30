'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const router = useRouter()

  const onClick = () => {
    localStorage.removeItem('token')
    router.push('/sign-in')
  }

  return (
    <nav className='flex items-center justify-between bg-slate-200 px-10'>
      <span>logo</span>
      <Button onClick={onClick}>로그아웃</Button>
    </nav>
  )
}
