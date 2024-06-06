import { Button } from '@/components/ui/button'
import arrowleft from '@/public/arrowleft.svg'
import Image from 'next/image'

const BackButton: React.FC = () => {
  return (
    <Button variant='ghost' className='flex justify-start'>
      <Image
        src={arrowleft}
        alt='이전 페이지'
        className='fill-custom-color text-[#333236]'
      />
      <span className='text-sm'>돌아가기</span>
    </Button>
  )
}

export default BackButton
