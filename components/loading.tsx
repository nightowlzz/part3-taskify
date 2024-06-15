import { Loader2 } from 'lucide-react'

export const Loading = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='h-24 w-24 animate-spin text-gray-400' />
    </div>
  )
}
