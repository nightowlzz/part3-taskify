type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className='flex h-screen items-center justify-center'>
      {children}
    </main>
  )
}

export default AuthLayout
