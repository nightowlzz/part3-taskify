interface AddTodoProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function AddTodo({ onClick }: AddTodoProps) {
  return (
    <button
      className='
	    border-gray_dark3 flex h-[32px] w-full
	    items-center justify-center
	    gap-[10px] rounded-lg 
    	border bg-white text-[10px] 
	    shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[40px] 
	    md:text-[18px] xl:h-[40px] xl:text-[18px] 
      '
      onClick={onClick}
    >
      <span className='rounded bg-violet-300 px-1 text-violet-500'>+</span>
    </button>
  )
}
