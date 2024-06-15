import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className='flex h-[100vh] flex-col flex-col items-center justify-center'>
      <h2 className='text-gray_dark1 text-7xl font-bold md:text-8xl'>404</h2>
      <h1 className='text-gray_dark1 pb-2 pt-8 text-center font-bold md:text-2xl'>
        찾을수 없는 페이지 입니다.
      </h1>
      <p className='text-4 text-gray_dark1 mb-8 font-bold'>Page Note Found</p>
      <Link
        href='/dashboard'
        className='h-auto rounded-lg bg-[#5534DA] px-5 py-3 text-base font-bold text-white hover:bg-[#5534DA]/70 md:px-6 md:py-4'
      >
        대쉬보드로 이동하기
      </Link>
    </div>
  )
}
