'use client'

import Image from 'next/image'

import { useSignalR } from '@/shared/hooks/useSignalR'

import classes from './CurrentOnlineNumber.module.scss'

export const CurrentOnlineNumber = () => {
  const { data } = useSignalR()

  return (
    <div className={classes.currentOnlineNumber}>
      <Image src='/icons/network.svg' width={23.92} height={18.23} alt='сеть' priority />

      <div className={classes.right}>
        <p>{typeof data === 'number' ? data : null}</p>
        <p>Online</p>
      </div>
    </div>
  )
}
