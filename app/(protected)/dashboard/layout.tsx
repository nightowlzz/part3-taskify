import { Navbar } from './_components/navbar'
import SideBar from '../sidebar/sidebar'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
