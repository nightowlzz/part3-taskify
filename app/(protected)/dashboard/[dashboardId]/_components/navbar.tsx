import { Button } from '@/components/ui/button'
import { Send, Settings } from 'lucide-react'
import { UserButton } from '@/components/user-button'
import { Member } from '@/type'
import Link from 'next/link'
import { NavContainer } from '@/components/nav-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { InviteModalContent } from '@/components/invite-modal-content'
import { Title } from './title'

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
      <div className='flex h-full items-center justify-between px-3 md:px-8'>
        <Title title={title} isOwner={isOwner} />
        <div
          className={`flex flex-1  ${isOwner ? 'justify-end' : 'justify-end'} items-center gap-x-2 md:gap-x-4`}
        >
          {isOwner && (
            <>
              <Button variant={'outline'} asChild>
                <Link
                  href={`/dashboard/${dashboardId}/settings`}
                  className='flex w-[36px] gap-x-1 p-1 md:w-auto md:gap-x-2'
                >
                  <Settings className='hidden h-4 w-4 text-gray-400 md:block md:h-5 md:w-5' />
                  <span>관리</span>
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={'outline'}
                    className='fflex gap-x-1 p-1 md:gap-x-2'
                  >
                    <Send className='hidden h-4 w-4 text-gray-400 md:block md:h-auto md:w-auto' />
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
                  className='-ml-2 h-7 w-7 rounded-full md:-ml-4 md:h-10 md:w-10'
                >
                  <AvatarImage src={member.profileImageUrl} />
                  <AvatarFallback className='text-xs md:text-lg'>
                    {member.nickname[0]}
                  </AvatarFallback>
                </Avatar>
              )
            })}
            {!!remainingMembersCount && (
              <Avatar className='-ml-2 h-7 w-7 rounded-full p-0 md:-ml-3'>
                <AvatarFallback className='text-xs md:text-lg'>
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
