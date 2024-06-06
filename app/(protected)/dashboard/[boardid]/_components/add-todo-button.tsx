interface AddTodoProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function AddTodo({ onClick }: AddTodoProps) {
  return (
    <button
      className='
	    flex h-full items-center
	    justify-center gap-[10px]
	    rounded-lg border 
    	border-gray_dark3 bg-white text-[4px] 
	    shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[10px] 
	    md:text-[4.5px] xl:h-[10px] xl:text-[4.5px] 
      '
      onClick={onClick}
    >
      <span className='rounded bg-violet_light px-1 text-violet'>+</span>
    </button>
  )
}
