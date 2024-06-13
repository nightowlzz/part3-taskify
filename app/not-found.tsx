import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className='flex h-[100vh] flex-col flex-col items-center justify-center'>
      <h2 className='text-7xl font-bold text-gray_dark1 md:text-8xl'>404</h2>
      <h1 className='pb-2 pt-8 text-center font-bold text-gray_dark1 md:text-2xl'>
        찾을수 없는 페이지 입니다.
      </h1>
      <p className='text-4 font-bold text-gray_dark1'>Page Note Found</p>
      <Link
        href='/dashboard'
        className='mt-8 rounded-lg bg-violet px-5 py-3 font-bold text-white hover:bg-gray_dark2 md:px-6 md:py-4'
      >
        대쉬보드로 이동하기
      </Link>
    </div>
  )
}
