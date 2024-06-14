import { getAccessToken } from '@/app/data/cookie'
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

export function generateFixedColors(item: string): string {
  let hash = 0
  for (let i = 0; i < item.length; i++) {
    hash = item.charCodeAt(i) + ((hash << 5) - hash)
  }

  const color = '#' + ((hash & 0xffffff) | 0x1000000).toString(16).slice(1)

  return color
}

export function makeColorsBrighter(color: string): string {
  const [r, g, b] = color
    .slice(1)
    .match(/.{2}/g)!
    .map((hex) => parseInt(hex, 16))

  const newColor = `rgba(${r},${g},${b}, 0.4)`

  return newColor
}

export function makeTextDarker(color: string): string {
  const [r, g, b] = color
    .slice(1)
    .match(/.{2}/g)!
    .map((hex) => parseInt(hex, 16))

  const newR = Math.min(0, r - 100)
  const newG = Math.min(0, g - 100)
  const newB = Math.min(0, b - 100)

  const newColor = `rgb(${newR},${newG},${newB})`

  return newColor
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}
