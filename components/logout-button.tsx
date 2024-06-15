'use client'

import { logout } from '@/app/data/cookie'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const onClick = async () => {
    await logout()
    router.push('/sign-in')
  }
  return (
    <Button asChild onClick={onClick} variant={'ghost'}>
      <span className='w-full cursor-pointer font-bold'>로그아웃</span>
    </Button>
  )
}
