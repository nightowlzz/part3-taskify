import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import RecoilContextProvider from './_recoil/recoilContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Taskify로 일정 관리를 하세요.',
  keywords: ['Taskify', '새로운 일정 관리', '일의 우선순위 관리'],
  // viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RecoilContextProvider>
          <Toaster position='top-center' />
          {children}
        </RecoilContextProvider>
      </body>
    </html>
  )
}
