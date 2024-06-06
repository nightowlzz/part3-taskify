interface AddColumnProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function AddColumn({
  onClick,
}: AddColumnProps) {

  return (
    <button
      className='
          flex h-full w-full items-center
          justify-center gap-[10px]
          rounded-lg border 
          border-gray_dark3 bg-white text-[4px] 
          shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[17.5px] 
          md:w-[136px] md:text-[4.5px] xl:h-[17.5px] xl:w-[88.5px] xl:text-[4.5px] 
        '
      onClick={onClick}
    >
      <span className='text-black_light_2'>새로운 대시보드</span>
      <span className='rounded bg-violet_light px-1 text-violet'>+</span>
    </button>
  )
}
