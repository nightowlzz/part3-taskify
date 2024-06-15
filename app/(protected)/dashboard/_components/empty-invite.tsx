import Image from 'next/image'

export const EmptyInvite = () => {
  return (
    <div className='mt-20 rounded-md bg-white py-[85px] text-center md:py-[47px]'>
      <div className='relative mx-auto h-[60px] w-[60px] md:h-[100px] md:w-[100px]'>
        <Image fill src={'/icon-invite-empty.svg'} alt='메시지없음' />
      </div>
      <p className='mt-4 text-sm text-[#9FA6B2] md:mt-6 md:text-lg'>
        아직 초대받은 대시보드가 없어요
      </p>
    </div>
  )
}
