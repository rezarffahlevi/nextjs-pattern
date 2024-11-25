import Link from 'next/link'
import React from 'react'
import Button, { ButtonProps } from '../Button'

interface ButtonLinkProps extends ButtonProps {
  href: string
}

const ButtonLink = ({
  href,
  value,
  onClick = () => {},
  size = 'normal',
  style = 'solid',
  color = 'primary',
  radius = 'rounded',
}: ButtonLinkProps) => {
  return (
    <Link href={href} passHref>
        <Button
          value={value}
          color={color}
          onClick={onClick}
          radius={radius}
          size={size}
          style={style}
        />
    </Link>
  )
}

export default ButtonLink
export type { ButtonLinkProps }
