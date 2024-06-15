export const NavContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className='fixed z-20 h-16 w-full bg-white pl-[67px] shadow-md md:pl-[160px] xl:pl-[300px]'>
      {children}
    </nav>
  )
}
