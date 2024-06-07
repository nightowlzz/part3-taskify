interface AddTodoProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function AddTodo({ onClick }: AddTodoProps) {
  return (
    <button
      className='
	    flex w-full h-[32px] items-center
	    justify-center gap-[10px]
	    rounded-lg border 
    	border-gray_dark3 bg-white text-[10px] 
	    shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[40px] 
	    md:text-[18px] xl:h-[40px] xl:text-[18px] 
      '
      onClick={onClick}
    >
      <span className='rounded bg-violet_light px-1 text-violet'>+</span>
    </button>
  )
}
