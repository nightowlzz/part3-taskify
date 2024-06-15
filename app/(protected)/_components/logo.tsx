import Image from 'next/image'

export const Logo = () => {
  return (
    <div className='flex items-center px-5 pt-4'>
      <Image src={'/logo.png'} alt={'logo'} width={28} height={33} />
      <Image
        src={'/logo-letter.png'}
        alt={'logo'}
        width={80}
        height={22}
        className='hidden md:block'
      />
    </div>
  )
}
