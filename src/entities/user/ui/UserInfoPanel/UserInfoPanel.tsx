'use client'

import Image from 'next/image'
import { useUser } from '@/shared/hooks/useUser'

import classes from './UserInfoPanel.module.scss'

export const UserInfoPanel = () => {
  const { user } = useUser()

  return (
    <div className={classes.userInfoPanel}>
      <div className={classes.userInfo}>
        <div className={classes.avatar}>
          <Image src='/placeholders/avatar-big.png' width={180} height={180} alt='Аватарка' />
        </div>

        <p className={classes.userName}>{user?.userName}</p>

        <div className={classes.userId}>ID: {user?.id}</div>
      </div>
    </div>
  )
}
