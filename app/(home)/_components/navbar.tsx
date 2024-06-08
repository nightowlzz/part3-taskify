import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const NavBar = () => (
  <nav className='fixed w-full'>
    <div className='z-20 flex h-16 items-center justify-between border-b border-white bg-black px-8 text-white'>
      <div className='flex items-center'>
        <Image
          src={'/logo-home1.png'}
          alt={'home logo'}
          width={28}
          height={33}
        />
        <Image
          src={'/logo-home2.png'}
          alt={'home logo'}
          width={80}
          height={22}
        />
      </div>
      <div className='flex items-center'>
        <Button asChild variant={'ghost'}>
          <Link href={'/sign-in'}>로그인</Link>
        </Button>
        <Button asChild variant={'ghost'}>
          <Link href={'/sign-up'}>회원가입</Link>
        </Button>
      </div>
    </div>
  </nav>
)
