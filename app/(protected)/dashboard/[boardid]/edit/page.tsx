// app/dashboard/[boardid]/edit/page.tsx
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function EditBoardPage() {
  const router = useRouter()
  const { boardid } = router.query

  return (
    <div>
      <Button
        variant='ghost'
        className='mt-14 flex w-full justify-between text-gray-500'
      >
        <ArrowLeft />
        <span className='text-sm'>돌아가기가가가</span>
      </Button>
    </div>
  )
}
