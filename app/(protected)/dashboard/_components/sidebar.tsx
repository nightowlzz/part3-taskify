import Image from 'next/image'
import CreateDashboard from './create-dashboard'

export const SideBar = () => {
  return (
    <div className='w-[80px] border-r md:w-[160px] md:px-[14px] xl:w-[300px] xl:px-[12px]'>
      <Image
        src={'/logo2.png'}
        alt={'logo'}
        width={108}
        height={33}
        className='mx-3'
      />
      <CreateDashboard mode={'sidebar'} />
    </div>
  )
}
