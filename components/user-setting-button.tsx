import Link from 'next/link'
import { Button } from './ui/button'

export const UserSettingButton = () => {
  return (
    <Button asChild variant={'ghost'}>
      <Link href={'/dashboard/user'} className='flex w-full justify-center'>
        내 정보
      </Link>
    </Button>
  )
}
