interface NumProps {
  num: number | null
}

export default function Number({ num }: NumProps) {
  return (
    <div className='bg-gray20 text-gray50	dark:bg-black80 dark:text-gray35 inline-flex h-5 w-5 flex-col items-center justify-center rounded-[0.25rem] px-1.5 py-[0.1875rem] text-xs'>
      {num}
    </div>
  )
}
