import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'

export const SideBar = () => {
  return (
    <div className='w-[80px] border-r px-2 py-5 md:w-[150px] xl:w-[300px]'>
      <Image
        src={'/logo2.png'}
        alt={'logo'}
        width={108}
        height={33}
        className='mx-3'
      />
      <Button
        variant='ghost'
        className='mt-14 flex w-full justify-between text-gray-500'
      >
        <span className='text-sm'>Dash Boards</span>
        <Plus />
      </Button>
    </div>
  )
}
