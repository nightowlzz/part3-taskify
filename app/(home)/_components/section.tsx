import Image from 'next/image'

export const Section = ({
  title,
  text1,
  text2,
  imageSrc,
  orderClass,
}: {
  title: string
  text1: string
  text2: string
  imageSrc: string
  orderClass: string
}) => (
  <section className='mt-44 h-auto w-full rounded-xl bg-slate-800 xl:h-[600px]'>
    <div className='grid h-full grid-cols-1 gap-y-56 xl:grid-cols-2 xl:gap-y-0'>
      <div
        className={`ml-10 flex flex-col justify-center pt-36 xl:pt-0 ${orderClass}`}
      >
        <h2 className='relative -top-24 text-xl font-bold text-muted-foreground'>
          {title}
        </h2>
        <h3 className='space-y-4 text-5xl font-bold'>
          <p>{text1}</p>
          <p>{text2}</p>
        </h3>
      </div>
      <div className='flex h-full items-end justify-end xl:justify-normal xl:pl-20'>
        <Image src={imageSrc} alt={title} width={436} height={502} />
      </div>
    </div>
  </section>
)
