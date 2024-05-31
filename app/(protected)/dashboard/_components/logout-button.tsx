'use client'

import { logout } from '@/app/api/cookie'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()

  const onClick = async () => {
    await logout()
    router.push('/sign-in')
  }
  return <Button onClick={onClick}>로그아웃</Button>
}
