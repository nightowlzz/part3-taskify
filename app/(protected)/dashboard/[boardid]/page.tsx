'use client'
import { RecoilRoot } from 'recoil'
import DashboardId from './dashboard-id'

export default function Page({ params }: { params: { boardid: string } }) {
  return (
    <RecoilRoot>
      <DashboardId params={params} />
    </RecoilRoot>
  )
}
