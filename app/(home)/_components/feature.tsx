import Image from 'next/image'

export const Feature = ({
  imageSrc,
  title,
  description,
  imageWidth,
  imageHeight,
}: {
  imageSrc: string
  title: string
  description: string
  imageWidth: number
  imageHeight: number
}) => (
  <div className='flex flex-col'>
    <div className='flex h-[260px] items-center justify-center rounded-t-md bg-gray-600'>
      <Image
        src={imageSrc}
        alt={title}
        width={imageWidth}
        height={imageHeight}
      />
    </div>
    <div className='flex h-[124px] items-center rounded-b-md bg-slate-900'>
      <div className='mx-10 space-y-5'>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
)
