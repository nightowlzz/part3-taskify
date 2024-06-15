'use client'

import { deleteDashboardMember } from '@/app/action/dashboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Crown } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  memberId: number
  userImgUrl: string
  username: string
  isOwner: boolean
}

export const MemberInfo = ({
  memberId,
  userImgUrl,
  username,
  isOwner,
}: Props) => {
  const onDelete = async () => {
    const res = await deleteDashboardMember({ memberId })
    if (!res) {
      toast.error('애러리')
      return
    }
    toast.success('맴버삭제완료')
  }

  return (
    <div className='flex justify-between border-b py-4'>
      <div className='flex items-center gap-x-2'>
        <Avatar>
          <AvatarImage src={userImgUrl} />
          <AvatarFallback>{username[0] ? username[0] : 'N'}</AvatarFallback>
        </Avatar>
        <span>{username}</span>
        {isOwner && <Crown className='text-yellow-500' />}
      </div>
      {!isOwner && (
        <Button onClick={onDelete} size={'lg'} variant={'outline'}>
          삭제
        </Button>
      )}
    </div>
  )
}
