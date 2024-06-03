// const DashboardPage = () => {
//   return <main>asd</main>

// }

// export default DashboardPage

// app/(protected)/dashboard/page.tsx
'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PaginationBtn } from '@/components/ui/pagination'
import { fetchDashboards } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function EditBoardPage() {
  // const router = useRouter()
  // const { boardid } = router.query
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const dashboardData = await fetchDashboards()
        setData(dashboardData)
        console.log(dashboardData)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])
  return (
    <div>
      <Button variant='ghost' className='flex justify-start text-gray-500'>
        <ArrowLeft />
        <span className='text-sm'>돌아가기</span>
      </Button>
      <Card>
        <div>
          <span className='text-xl font-bold'>대시보드 네임</span>
        </div>
        <span className='text-lg'>대시보드 이름</span>
        <Input />
        <Button variant='p_btn' size='dele'>
          변경
        </Button>
      </Card>
      <Card className='mt-7'>
        <div>
          <span className='text-xl font-bold'>구성원</span>
          <PaginationBtn />
        </div>
        <span>이름</span>
        <ul>
          <li>das</li>
          <Button variant='w_btn' size='dele'>
            삭제
          </Button>
        </ul>
      </Card>
      <Card className='mt-7'>
        <div>
          <span className='text-xl font-bold'>초대 내역</span>
          <PaginationBtn />
          <Button variant='p_btn'>초대하기</Button>
        </div>
        <span>이메일</span>
      </Card>
      <Button>대시보드 삭제하기</Button>
    </div>
  )
}
