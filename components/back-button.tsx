import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  href: string
}

export const BackButton = ({ href }: Props) => {
  return (
    <Button variant={'ghost'} className='p-0'>
      <Link href={href} className='flex items-center'>
        <ChevronLeft />
        <span>돌아가기</span>
      </Link>
    </Button>
  )
}
