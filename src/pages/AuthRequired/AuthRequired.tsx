'use client'

import Image from 'next/image'

import { Button } from '@/shared/ui'
import { useAuthModal } from '@/shared/hooks/useAuthModal'

import classes from './AuthRequired.module.scss'

export const AuthRequiredPage = () => {
  const { openModal } = useAuthModal()

  return (
    <div className={classes.wrapper}>
      <Image src='/img/chest.png' width={525} height={325} quality={100} alt='Сундук' />

      <h1>
        Требуется <br /> авторизация
      </h1>

      <h2>Для получения доступа к странице</h2>

      <Button boxShadow onClick={openModal}>
        Войти
      </Button>
    </div>
  )
}
