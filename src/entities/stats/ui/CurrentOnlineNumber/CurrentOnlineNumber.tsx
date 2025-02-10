'use client'

import Image from 'next/image'

import { useUsersOnlineNumber } from '../../model/useUsersOnlineNumber'

import classes from './CurrentOnlineNumber.module.scss'

export const CurrentOnlineNumber = () => {
  const { usersOnlineNumber } = useUsersOnlineNumber()

  return (
    <div className={classes.currentOnlineNumber}>
      <Image src='/icons/network.svg' width={23.92} height={18.23} alt='сеть' priority />

      <div className={classes.right}>
        <p>{usersOnlineNumber}</p>
        <p>Online</p>
      </div>
    </div>
  )
}
