'use client'

import { Loading } from '@/components/loading'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  const router = useRouter()

  const [token, setToken] = useState<string | null>(null)
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    setIsLoading(false)
  }, [])

  if (loading) {
    return <Loading />
  }
  if (token) {
    router.push('/dashboard')
    return
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className='flex h-screen items-center justify-center'>
        {children}
      </main>
    </Suspense>
  )
}

export default AuthLayout
