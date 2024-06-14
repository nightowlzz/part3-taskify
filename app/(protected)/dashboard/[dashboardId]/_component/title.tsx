import { FaCrown } from 'react-icons/fa'

type Props = {
  title: string
  isOwner: boolean
}

export const Title = ({ title, isOwner }: Props) => {
  return (
    <div className='flex items-center gap-x-3'>
      <h1 className='text-lg font-bold'>{title}</h1>
      {isOwner && <FaCrown className='h-6 w-6 text-yellow-500' />}
    </div>
  )
}
