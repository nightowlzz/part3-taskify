'use client'

import { Loading } from '@/components/loading'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
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
  if (!token) {
    router.push('/sign-in')
    return
  }
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default ProtectedLayout
