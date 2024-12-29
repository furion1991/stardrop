import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  withShadow?: boolean
}

export const Logo = ({ withShadow = false }: LogoProps) => {
  return (
    <Link
      href='/'
      style={{
        display: 'flex'
      }}
    >
      <Image
        src={withShadow ? '/icons/logo-with-shadow.svg' : '/icons/logo.svg'}
        width={64}
        height={63}
        alt='StarDrop лого'
      />
    </Link>
  )
}
