import Link from 'next/link'

type Props = {
  text: string
  linkText: string
  href: string
}

export const FormFooter = ({ text, linkText, href }: Props) => {
  return (
    <div className='mt-4 flex justify-center'>
      <span>{text}</span>
      <Link href={href} className='ml-2 text-indigo-500 underline'>
        {linkText}
      </Link>
    </div>
  )
}
