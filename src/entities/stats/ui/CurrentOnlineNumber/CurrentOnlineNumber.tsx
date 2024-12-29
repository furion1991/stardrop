import Image from 'next/image'

import classes from './CurrentOnlineNumber.module.scss'

export const CurrentOnlineNumber = () => {
  return (
    <div className={classes.currentOnlineNumber}>
      <Image src='/icons/network.svg' width={23.92} height={18.23} alt='сеть' priority />

      <div className={classes.right}>
        <p>2500</p>
        <p>Online</p>
      </div>
    </div>
  )
}
