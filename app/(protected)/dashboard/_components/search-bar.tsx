'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 100)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm)
    } else {
      params.delete('search')
    }
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }, [debouncedSearchTerm, router])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className='relative'>
      <Search className='text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 transform' />
      <Input
        placeholder='검색'
        className='pl-10'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar
