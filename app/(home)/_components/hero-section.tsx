import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const HeroSection = () => (
  <section className='mt-32 flex flex-col items-center'>
    <Image src={'/home-hero.png'} alt={'hero'} width={722} height={422} />
    <h1 className='mt-12 text-center text-3xl font-bold md:text-5xl xl:text-7xl'>
      새로운 일정 관리 <span className='text-indigo-500'>Taskify</span>
    </h1>
    <p className='mt-10'>서비스의 메인 설명 들어갑니다.</p>
    <Button
      className='mt-20 w-full bg-indigo-500 hover:bg-indigo-600 md:w-[300px]'
      asChild
    >
      <Link href={'/sign-in'}>로그인 하기</Link>
    </Button>
  </section>
)
