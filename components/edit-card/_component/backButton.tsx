import { Button } from '@/components/ui/button'
import arrowleft from '@/public/arrowleft.svg'
import Image from 'next/image'
import { EditCardProps } from '../editCard-layout'
import { useRouter } from 'next/navigation'

const BackButton: React.FC<EditCardProps> = ({ dashboardId }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/${dashboardId}`)
  }

  return (
    <Button variant='ghost' className='flex justify-start '>
      <Image src={arrowleft} alt='이전 페이지' width={17} className='mr-1' />
      <span className='text-sm' onClick={handleClick}>
        돌아가기
      </span>
    </Button>
  )
}

export default BackButton
