'use client'
import { useState, useEffect } from 'react'

interface TagProps {
  content: string
}

export default function Tag({ content }: TagProps) {
  const [bgColor, setBgColor] = useState('')
  const [color, setColor] = useState('')
  const [tagName, setTagName] = useState('')

  useEffect(() => {
    const handleRandom = () => {
      const parts = content.split('-#')
      const tag = parts[0]
      const color = parts[1]

      setTagName(tag)
      if (color) {
        const [r, g, b] = color.split(',').map(Number)
        setBgColor(`rgba(${r},${g},${b},0.5)`)
        setColor(`rgb(${r},${g},${b})`)
      } else {
        // fallback in case color is not provided
        const defaultColor = '0,0,0' // black
        setBgColor(`rgba(${defaultColor},0.5)`)
        setColor(`rgb(${defaultColor})`)
      }
    }
    handleRandom()
  }, [content])

  return (
    <div
      className={`inline-flex items-center justify-center gap-[0.625rem] rounded-[0.25rem] px-[0.375rem] py-[0.25rem] text-[0.625rem] md:text-[0.75rem]`}
      style={{ backgroundColor: bgColor, color: color }}
    >
      {tagName}
    </div>
  )
}
