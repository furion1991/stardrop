import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href='/' style={{ display: 'flex' }}>
      <Image src='/icons/logo.svg' width={64} height={63} alt='StarDrop лого' />
    </Link>
  )
}
