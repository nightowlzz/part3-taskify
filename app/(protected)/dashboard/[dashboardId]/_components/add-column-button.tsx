interface AddColumnProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function AddColumn({ onClick }: AddColumnProps) {
  return (
    <button
      className='
          border-gray_dark3 flex h-full w-full
          items-center justify-center
          gap-[10px] rounded-lg 
          border bg-white text-[16px] 
          shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[70px]
          md:text-[18px] xl:h-[70px] xl:text-[18px] 
        '
      onClick={onClick}
    >
      <span className='text-black_light_2'>새로운 컬럼 추가하기</span>
      <span className='rounded bg-violet-300 px-1 text-violet-500'>+</span>
    </button>
  )
}
