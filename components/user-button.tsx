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
import { generateFixedColors, makeTextDarker } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  firstName: string
  imgUrl?: string
  name: string
}

export const UserButton = ({ firstName, imgUrl, name }: Props) => {
  const bgColor = generateFixedColors(name)
  const textColor = makeTextDarker(bgColor)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='flex items-center gap-x-2 px-2'>
          <Avatar>
            <AvatarImage src={imgUrl} />
            <AvatarFallback style={{ background: bgColor, color: textColor }}>
              {firstName}
            </AvatarFallback>
          </Avatar>
          <span className='hidden md:block'>{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='p-0'>
          <UserSettingButton />
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <Button asChild variant={'ghost'}>
            <Link href={'/dashboard'} className='flex w-full justify-center'>
              내 대시보드
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
