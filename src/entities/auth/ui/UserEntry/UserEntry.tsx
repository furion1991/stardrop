'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/shared/ui'

import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUser } from '@/shared/hooks/useUser'

import classes from './UserEntry.module.scss'

export const UserEntry = () => {
  const { user } = useUser()
  const { isAuth } = useAuth()
  const { openModal } = useAuthModal()

  return (
    <div className={classes.userEntry}>
      {isAuth ? (
        <div className={classes.user}>
          <Link href='/' className={classes.balanceUpLink}>
            <Image src='/icons/plus.svg' width={15} height={15} alt='Плюс' />
          </Link>

          <div className={classes.balance}>
            <span>{user?.currentBalance}</span>

            <span>
              <Image src='/icons/logo-mini.svg' width={24} height={23} alt='Лого' />
            </span>
          </div>

          <Link href='/inventory' className={classes.avatar}>
            <Image src='/placeholders/avatar.png' width={55} height={55} alt='Аватарка' />
          </Link>
        </div>
      ) : (
        <Button className={classes.authBtn} boxShadow onClick={openModal}>
          <span>
            <Image src='/icons/fingerprint.svg' width={29} height={28.99} alt='Отпечаток пальца' />
          </span>
          Войти
        </Button>
      )}
    </div>
  )
}
