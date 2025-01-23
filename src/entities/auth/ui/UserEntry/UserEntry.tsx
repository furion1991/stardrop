'use client'

import Image from 'next/image'
import Link from 'next/link'
import Popup from 'reactjs-popup'
import { useRef, useState } from 'react'

import { Button } from '@/shared/ui'

import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { useUser } from '@/shared/hooks/useUser'
import { useAuth } from '@/shared/hooks/useAuth'

import classes from './UserEntry.module.scss'

export const UserEntry = () => {
  const { isAuth, logout } = useAuth()
  const { user } = useUser()
  const { openModal } = useAuthModal()

  const userPopupRef = useRef(null)
  const [isUserPopupOpen, setUserPopupOpen] = useState(false)

  if (!user || !isAuth) {
    return (
      <div className={classes.userEntry}>
        <Button className={classes.authBtn} boxShadow onClick={openModal}>
          <span>
            <Image src='/icons/fingerprint.svg' width={29} height={28.99} alt='Отпечаток пальца' />
          </span>
          Войти
        </Button>
      </div>
    )
  }

  return (
    <div className={classes.userEntry}>
      <Popup
        open={isUserPopupOpen}
        ref={userPopupRef}
        arrow={false}
        closeOnDocumentClick
        position='bottom center'
        overlayStyle={{
          display: 'none'
        }}
        onClose={() => {
          setUserPopupOpen(false)
        }}
        trigger={
          <div
            className={classes.user}
            onClick={() => {
              setUserPopupOpen(true)
            }}
          >
            <Link href='/' className={classes.balanceUpLink}>
              <Image src='/icons/plus.svg' width={15} height={15} alt='Плюс' />
            </Link>

            <div className={classes.balance}>
              <span>{user.currentBalance}</span>

              <span>
                <Image src='/icons/logo-mini.svg' width={28} height={27} alt='Лого' />
              </span>
            </div>

            <div className={classes.avatar}>
              <Image src='/placeholders/avatar.png' width={55} height={55} alt='Аватарка' />
            </div>
          </div>
        }
      >
        {/* @ts-expect-error: Skip lib type */}
        {(close) => {
          return (
            <div className={classes.userPopup}>
              <ul onClick={close}>
                <li>
                  <Link
                    href='/profile'
                    onClick={() => {
                      setUserPopupOpen(false)
                    }}
                  >
                    <Image
                      src='/icons/user-rounded.svg'
                      width={20}
                      height={20}
                      alt='Пользователь'
                    />
                    <span>Профиль</span>
                  </Link>
                </li>

                <li>
                  <Link href='/deposit'>
                    <Image src='/icons/wallet.svg' width={20} height={20} alt='Кошелек' />
                    <span>Пополнить баланс</span>
                  </Link>
                </li>

                <li>
                  <Link href='/faq'>
                    <Image src='/icons/info-rounded.svg' width={20} height={20} alt='Информация' />
                    <span>F.A.Q</span>
                  </Link>
                </li>

                <li>
                  <button type='button' onClick={logout}>
                    <Image src='/icons/exit.svg' width={20} height={20} alt='Выход' />
                    <span>Выйти</span>
                  </button>
                </li>
              </ul>
            </div>
          )
        }}
      </Popup>
    </div>
  )
}
