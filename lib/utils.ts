import { getAccessToken } from '@/app/api/cookie'
import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/5-1',
})

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export async function fetchDashboards() {
  try {
    const response = await api.get('/dashboards', {
      params: {
        navigationMethod: 'manual', // 필요한 경우 유효한 값을 사용하십시오
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching dashboards:')
    throw error
  }
}
