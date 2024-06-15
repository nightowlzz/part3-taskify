export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen bg-stone-100 pl-[67px] pt-16 md:pl-[160px] xl:pl-[300px]'>
      {children}
    </main>
  )
}
