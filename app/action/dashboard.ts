'use server'

// import { ValueOfCircleColor } from '@/enum'
import { api } from '@/lib/utils'
import { Dashboard } from '@/type'
import { revalidatePath } from 'next/cache'

type CreateDashboardInput = {
  title: string
  color: string
}

export const createDashboard = async ({
  title,
  color,
}: CreateDashboardInput): Promise<Dashboard | null> => {
  try {
    const response = await api.post<Dashboard>('/dashboards', { title, color })
    const dashboard = response.data

    revalidatePath('/dashboard')

    return dashboard
  } catch (error) {
    // console.log(error)

    return null
  }
}

type UpdateDashboardDetailsInput = {
  id: number
  title: string
  color: string
}
export const updateDashboardDetails = async ({
  id,
  title,
  color,
}: UpdateDashboardDetailsInput) => {
  try {
    const response = await api.put<Dashboard>(`/dashboards/${id}`, {
      title,
      color,
    })
    const dashboard = response.data

    revalidatePath('/dashboard')

    return dashboard
  } catch (error) {
    // console.log(error)

    return null
  }
}

type InviteUserToDashboardProps = {
  dashboardId: number
  email: string
}

export const inviteUserToDashboard = async ({
  dashboardId,
  email,
}: InviteUserToDashboardProps) => {
  try {
    await api.post(`/dashboards/${dashboardId}/invitations`, {
      email,
    })

    revalidatePath('/dashboard')

    return true
  } catch (error) {
    // console.log(error)
    return null
  }
}

type RevokeDashboardInviteProps = {
  dashboardId: number
  invitationId: number
}

export const revokeDashboardInvite = async ({
  dashboardId,
  invitationId,
}: RevokeDashboardInviteProps) => {
  try {
    await api.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`)

    revalidatePath('/dashboard')
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteDashboardMember = async ({
  memberId,
}: {
  memberId: number
}) => {
  try {
    await api.delete(`/members/${memberId}`)

    revalidatePath('/dashboard')
    return true
  } catch (error) {
    // console.log(error)
    return false
  }
}

export const deleteDashboard = async ({
  dashboardId,
}: {
  dashboardId: number
}) => {
  try {
    const res = await api.delete(`/dashboards/${dashboardId}`)
    console.log('sdadasdsadsa', res.status)

    revalidatePath('/dashboard')
    return true
  } catch (error) {
    // console.log(error)
    return null
  }
}
