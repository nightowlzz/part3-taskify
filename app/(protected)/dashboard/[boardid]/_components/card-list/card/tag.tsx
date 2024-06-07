'use client'
import { useState, useEffect } from 'react'
interface TagProps {
  content: string
}

export default function Tag({ content }: TagProps) {
  const [bgColor, setBgColor] = useState('')
  const [color, setColor] = useState('')

  const colors: Record<string, { bgColor: string; color: string }> = {
    '1': { bgColor: 'bg-orange_light', color: 'text-orange' },
    '2': { bgColor: 'bg-green_light', color: 'text-green' },
    '3': { bgColor: 'bg-pink_light', color: 'text-pink' },
    '4': { bgColor: 'bg-blue_light', color: 'text-blue' },
  }

  useEffect(() => {
    const handleRandom = () => {
      const random = Math.floor(Math.random() * 4) + 1
      const randomColors = colors[random.toString()]
      setBgColor(randomColors.bgColor)
      setColor(randomColors.color)
    }
    handleRandom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${bgColor} ${color} inline-flex items-center justify-center gap-[0.625rem] rounded-[0.25rem] px-[0.375rem] py-[0.25rem] text-[0.625rem] md:text-[0.75rem]`}
    >
      {content}
    </div>
  )
}
