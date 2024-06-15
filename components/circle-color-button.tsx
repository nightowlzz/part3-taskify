import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { Colors } from './create-dashboard-modal'

type Props = {
  color: Colors
  isSelected: boolean
  onClick: () => void
}

export const CircleColorButton = ({ onClick, color, isSelected }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn('relative rounded-full p-4')}
      style={{ background: color }}
    >
      {isSelected && (
        <Check className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform text-white' />
      )}
    </button>
  )
}
