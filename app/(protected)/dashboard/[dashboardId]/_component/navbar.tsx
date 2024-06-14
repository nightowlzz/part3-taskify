import { Title } from './title'
import { Button } from '@/components/ui/button'
import { Send, Settings } from 'lucide-react'
import { UserButton } from '@/components/user-button'
import { Member } from '@/type'
import Link from 'next/link'
import { NavContainer } from '@/components/nav-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { InviteModalContent } from '@/components/invite-modal-content'

type Props = {
  dashboardId: number
  title: string
  isOwner: boolean
  username: string
  userImg?: string
  members: Member[]
}

export const Navbar = async ({
  dashboardId,
  title,
  isOwner,
  username,
  userImg,
  members,
}: Props) => {
  const firstName = username ? username[0] : 'U'
  const maxVisibleAvatars = 3
  const remainingMembersCount = Math.max(0, members.length - maxVisibleAvatars)

  return (
    <NavContainer>
      <div className='flex h-full items-center justify-between px-8'>
        <Title title={title} isOwner={isOwner} />
        <div className='flex items-center gap-x-4'>
          {isOwner && (
            <>
              <Button variant={'outline'} asChild>
                <Link
                  href={`/dashboard/${dashboardId}/settings`}
                  className='flex gap-x-2'
                >
                  <Settings className='text-gray-400 h-5 w-5' />
                  <span>관리</span>
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'outline'} className='flex gap-x-2'>
                    <Send className='text-gray-400 h-5 w-5' />
                    초대하기
                  </Button>
                </AlertDialogTrigger>
                <InviteModalContent dashboardId={dashboardId} />
              </AlertDialog>
            </>
          )}
          <div className='ml-5 flex'>
            {members.map((member, index) => {
              if (index > 2) return
              return (
                <Avatar
                  key={member.id}
                  className='-ml-4 min-h-10 min-w-10 rounded-full'
                >
                  <AvatarImage src={member.profileImageUrl} />
                  <AvatarFallback>{member.nickname[0]}</AvatarFallback>
                </Avatar>
              )
            })}
            {!!remainingMembersCount && (
              <Avatar className='-ml-3 min-h-10 min-w-10 rounded-full'>
                <AvatarFallback className='text-lg'>
                  +{remainingMembersCount}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <UserButton firstName={firstName} name={username} imgUrl={userImg} />
        </div>
      </div>
    </NavContainer>
  )
}
