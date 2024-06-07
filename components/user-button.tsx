import { LogoutButton } from './logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { UserSettingButton } from './user-setting-button'

type Props = {
  firstName: string
  profileImageUrl?: string
  nickname: string
}

export const UserButton = async ({
  firstName,
  profileImageUrl,
  nickname,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='flex items-center gap-x-2 px-2'>
          <Avatar>
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback className='bg-green-600 text-white'>
              {firstName}
            </AvatarFallback>
          </Avatar>
          <span className='hidden md:block'>{nickname}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='p-0'>
          <UserSettingButton />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
