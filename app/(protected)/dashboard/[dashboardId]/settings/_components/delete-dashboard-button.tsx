'use client'

import { deleteDashboard } from '@/app/action/dashboard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
  dashboardId: number
  isShow: boolean
}

export const DeleteDashboardButton = ({ dashboardId, isShow }: Props) => {
  const router = useRouter()

  const onDelete = async () => {
    const res = await deleteDashboard({ dashboardId })
    if (!res) {
      toast.error('실패')
      return
    }
    toast.success('성공')
    router.push('/dashboard')
  }

  return (
    <>
      {isShow && (
        <Button onClick={onDelete} variant={'destructive'} className='w-full'>
          삭제하기
        </Button>
      )}
    </>
  )
}
