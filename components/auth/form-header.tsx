import Image from 'next/image'
import Link from 'next/link'

type Props = {
  text: string
}

export const FormHeader = ({ text }: Props) => {
  return (
    <div className='flex flex-col items-center'>
      <Link href={'/'}></Link>
      <Image src={'/logo.png'} alt={'logo'} width={140} height={160} />
      <Image
        src={'/logo-letter.png'}
        alt={'taskify'}
        width={180}
        height={50}
        className='mt-3'
      />
      <span className='mt-1'>{text}</span>
    </div>
  )
}
