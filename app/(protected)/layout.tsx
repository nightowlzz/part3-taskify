import SideBar from './_components/sidebar'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar />
      {children}
    </>
  )
}

export default ProtectedLayout
