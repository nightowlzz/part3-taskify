import {
  generateFixedColors,
  makeColorsBrighter,
  makeTextDarker,
} from '@/lib/utils'
import { Badge } from './ui/badge'

type Props = {
  text: string
}

export const CategoryTag = ({ text }: Props) => {
  const textColor = generateFixedColors(text)
  const bgColor = makeColorsBrighter(textColor)
  return <Badge style={{ background: bgColor, color: textColor }}>{text}</Badge>
}
